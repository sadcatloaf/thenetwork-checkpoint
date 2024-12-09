<script setup>
import { AppState } from '@/AppState';
import AccountModal from '@/components/AccountModal.vue';
import AdCard from '@/components/AdCard.vue';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService';
import { profilesService } from '@/services/ProfilesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.posts)
const commercials = computed(() => AppState.commercials)
const totalPages = computed(() => AppState.totalPages)
const currentPage = computed(() => AppState.currentPage)
const account = computed(() => AppState.account)


const route = useRoute()

watch(route, () => {
  getProfileById()
  getPostsByCreatorId()
}, { immediate: true })

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING PROFILE BY ID]', error)
  }
}

async function getPostsByCreatorId() {
  try {
    const profileId = route.params.profileId
    await postsService.getPostsByCreatorId(profileId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[GEtting Posts by creator Id]', error)
  }
}
async function changePage(pageNumber) {
  try {
    await postsService.changePostPage(pageNumber)
  }
  catch (error) {
    logger.log('Changed artwork page', error)
    Pop.error(error);
  }
}
async function admirePosts(id) {
  try {
    await postsService.admirePosts(id)
  }
  catch (error) {
    logger.error('Admired Post', error)
    Pop.meow(error);
  }
}
</script>

<template>
  <div v-if="profile" class="container">
    <div class="row mt-5">
      <img class="cover-img" :src="profile.coverImg" alt="">
      <div class="col-4">
        <img class="creator-img" :src="profile.picture" alt="">
      </div>
      <div class="col-7">
        <span>{{ profile.class }}</span>
        <h2>
          <span :class="{ 'lobster-regular': profile.graduated }">
            {{ profile.name }}
          </span>
          <a v-if="profile.resume" :href="profile.resume" target="_blank"
            :title="`Check out my resume at ${profile.resume}!`">
            <i class="mdi mdi-file-certificate-outline"></i>
          </a>
          <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"
            :title="`Check out my linkedin at ${profile.linkedin}!`">
            <i class="mdi mdi-linkedin"></i>
          </a>
          <a v-if="profile.github" :href="profile.github" target="_blank"
            :title="`Check out my github at ${profile.github}!`">
            <i class="mdi mdi-github"></i>
          </a>
        </h2>
        <h2>{{ profile.bio }}</h2>
        <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#AccountModal">Edit
          Profile</button>
      </div>
    </div>
    <div v-for="post in posts" :key="post.id" class="row  p-3 my-3 border border-dark rounded shadow">
      <PostCard :post-prop="post" />
      <button v-if="account != null" @click="admirePosts(post.id)" class="m-2">
        <i class="mdi mdi-heart "></i>
        <span v-if="post.likeIds"></span>
        <span v-else>Like</span>
        <span>{{ post.likeIds.length }}</span>
      </button>
    </div>
    <div v-for="commercial in commercials" :key="commercial.id" class=" p-3 my-3 shadow">
      <AdCard :commercialProp="commercial" />
    </div>
    <button @click="changePage(currentPage - 1)" :disabled="currentPage == 1" type="button"
      :title="`Go to page ${currentPage - 1}`">Newer</button>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage == 44 || currentPage == totalPages"
      type="button" :title="`Got to page ${currentPage + 1}`">Older</button>

  </div>
  <AccountModal v-if="account" />
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

.creator-img {
  height: 12rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}

.cover-img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.lobster-regular {
  font-family: "Lobster", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>