<script setup>
import { AppState } from '@/AppState';
import AdCard from '@/components/AdCard.vue';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService';
import { profilesService } from '@/services/ProfilesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.posts)
const commercials = computed(() => AppState.commercials)


const route = useRoute()

onMounted(() => {
  getProfileById()
  getPostsByCreatorId()
})

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
</script>

<template>
  <div v-if="profile" class="container">
    <div class="row mt-5">
      <div class="col-4">
        <img class="creator-img" :src="profile.picture" alt="">
      </div>
      <div class="col-7">
        <h2>{{ profile.name }}</h2>
        <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#AccountModal">Edit
          Profile</button>
      </div>
    </div>
    <div v-for="post in posts" :key="post.id" class="row  p-3 my-3 border border-dark rounded shadow">
      <PostCard :post-prop="post" />
    </div>
    <div v-for="commercial in commercials" :key="commercial.id" class=" p-3 my-3 shadow">
      <AdCard :commercialProp="commercial" />
    </div>
  </div>

</template>

<style scoped lang="scss">
.creator-img {
  height: 12rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}
</style>