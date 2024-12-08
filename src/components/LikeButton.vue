<!-- <script setup>
import { post } from 'axios';


export default {
  data() {
    return {
      likeCount: 0,
      isLiked: false,
    };
  },
}
function toggleLike() {
    post.isLiked = !post.isLiked;
    if (this.isLiked) {
        this.likeCount++;
    } else {
        this.likeCount--;
    }
}
</script>

<template>
    <button @click="toggleLike">
        <i v-if="isLiked" class="Likes"></i>
        <i v-else class="Likes"></i>
        {{ likeCount }}
    </button>

</template>

<style scoped lang="scss"></style> -->