<script setup>
import { AppState } from '@/AppState';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)


onMounted(() => {
  getPosts()
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

</script>

<template>
  <div class="container">
    <div v-for="post in posts" :key="post.id" class="row p-3 my-3 border border-dark rounded shadow">
      <PostCard :postProp="post" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
