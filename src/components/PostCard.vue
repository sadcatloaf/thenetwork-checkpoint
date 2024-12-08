<script setup>
import { Post } from '@/models/Post';

defineProps({
    postProp: { type: Post, required: true }
})
</script>

<template>

    <div class="col-5 ">
        <div class="d-flex">
            <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
                <img class="creator-img m-3" :src="postProp.creator.picture" alt="">
            </router-link>
            <h5>{{ postProp.creator.name }}</h5>
        </div>
        <div>
            <div>
                {{ postProp.body }}
            </div>
        </div>
        <img class="img-fluid" :src="postProp.imgUrl" alt="">
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