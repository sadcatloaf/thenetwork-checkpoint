<script setup>
import { AppState } from '@/AppState';
import { Post } from '@/models/Post';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';

const props = defineProps({
    postProp: { type: Post, required: true }
})

const account = computed(() => AppState.account)

async function deletePost() {
    try {
        const message = `Are you sure you want to delete your ${props.postProp.creator} ${props.postProp.body}?`
        const confirmed = await Pop.confirm(message)
        if (!confirmed) { return }
        const postId = props.postProp.id
        await postsService.deletePost(postId)
    } catch (error) {
        Pop.meow(error)
        logger.error('[Deleting Post]', error)
    }
}

</script>

<template>

    <div class="col-5 ">
        <div class="d-flex">
            <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
                <img class="creator-img m-3" :src="postProp.creator.picture" alt="">
            </router-link>
            <h5>{{ postProp.creator.name }}</h5>
            <p>{{ postProp.createdAt }}</p>
        </div>
        <div>
            <div>
                {{ postProp.body }}
            </div>
        </div>
        <img class="img-fluid" :src="postProp.imgUrl" alt="">
        <div>
            <button v-if="account?.id == postProp.creatorId" @click="deletePost()" class="btn btn-outline-danger"
                type="button" title="Delete Post">
                <i class="mdi mdi-delete-forever"></i>
            </button>
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