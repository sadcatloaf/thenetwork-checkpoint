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
  <section class="container">
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-12 p-2 m-3 border border-dark rounded shadow">
        <PostCard :post-prop="post" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
