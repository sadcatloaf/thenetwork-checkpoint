<script setup>
import { Post } from '@/models/Post';

defineProps({
    postProp: { type: Post, required: true }
})
</script>

<template>
    <div class="">
        <div>
            <img class="creator-img" :src="postProp.creator.picture" alt="">
            <h5>{{ postProp.body }}</h5>
            <img :src="postProp.imgUrl" alt="" class=" img-fluid">
        </div>
    </div>
</template>

<style scoped lang="scss">
.creator-img {
    height: 3rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
}

.cover-img {
    height: 200px;
    width: 100%;
    object-fit: cover;
}
</style>