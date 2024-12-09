<script>
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { ref } from 'vue';

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
                <div class="form-floating mb-3">
                    <textarea v-model="editablePostData.body" class="form-control" placeholder="Post Body" id="body"
                        maxlength="500"></textarea>
                    <label for="body">Post Description</label>
                </div>
                <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="imgUrl"
                    placeholder="Post ImgUrl..." required maxlength="500">
                <label for="imgUrl">Post ImgUrl</label>
                <div class="text-end">
                    <button class="" type="submit"> <i class="mdi mdi-send"></i></button>
                </div>
            </div>
        </form>
    </div>
</template>
<style lang="scss" scoped></style>