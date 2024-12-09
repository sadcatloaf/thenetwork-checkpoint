<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';

const account = computed(() => AppState.account)

const editablePostData = ref({
    body: '',
    imgUrl: '',
    creator: '',
})

async function createPost() {
    try {
        await postsService.createPost(editablePostData.value)
        editablePostData.value = {
            body: '',
            imgUrl: '',
            creator: '',
        }
        Pop.success('Post successfully sent')
    } catch (error) {
        logger.error('[Creating Post 💬💬]', error)
        Pop.meow(error)
    }
}
</script>
<template>
    <div v-if="account != null">
        <form @submit.prevent="createPost()">
            <div class="form-floating mb-3">
                <div class="mb-3">
                    <label for="body" class="form-label">Description</label>
                    <input v-model="editablePostData.body" type="text" class="form-control" id="body">
                </div>
                <div class="mb-3">
                    <label for="imgUrl" class="form-label">imgUrl</label>
                    <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="imgUrl">
                </div>
                <div class="text-end">
                    <button class="" type="submit"> <i class="mdi mdi-send"></i></button>
                </div>
            </div>
        </form>
    </div>
</template>
<style lang="scss" scoped></style>