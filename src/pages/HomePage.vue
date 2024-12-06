<script setup>
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';


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
  <div class="">
  </div>
</template>

<style scoped lang="scss"></style>
