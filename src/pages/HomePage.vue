<script setup>
import { AppState } from '@/AppState';
import AdCard from '@/components/AdCard.vue';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import PageNavigation from '@/components/PageNavigation.vue';
import PostForm from '@/components/PostForm.vue'

const posts = computed(() => AppState.posts)
const commercials = computed(() => AppState.commercials)
const account = computed(() => AppState.account)

// const likesCount = ref(0);

onMounted(() => {
  getPosts()
  getAnnoyingCommercials()
  postsService.clearPosts()
})

async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[Getting posts 💬]', error)
  }

}

async function getAnnoyingCommercials() {
  try {
    await postsService.getAnnoyingCommercials()
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[Getting annoying commercials that nobody wants 📺📺]', error)
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
  <PostForm />
  <div class="container">
    <div v-for="post in posts" :key="post.id" class="row p-3 my-3 border border-dark rounded shadow">
      <PostCard :postProp="post" />
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
    <div class="col-12">
      <PageNavigation />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
