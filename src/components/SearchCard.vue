<script setup>
import { Post } from '@/models/Post';
defineProps({
    postProp: { type: Post, required: true },
})
</script>
<template>
    <img :src="postProp.imgUrl" :alt="postProp.creatorId" class="img-fluid rounded shadow">
    <div class="fw-bold text-center">
        {{ postProp.body }}
    </div>
</template>
<style lang="scss" scoped></style>