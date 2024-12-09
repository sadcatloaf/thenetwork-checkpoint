<script setup>
import { AppState } from '@/AppState';
import { accountService } from '@/services/AccountService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const account = computed(() => AppState.account)
const post = computed(() => AppState.activeProfile)

onMounted(() => editableAccountData.value = { ...account.value })

const editableAccountData = ref({
    name: '',
    picture: '',
    bio: '',
    coverImg: '',
    resume: '',
    graduated: false,
    github: '',
    linkedin: ''
})
async function updateAccount() {
    try {
        await accountService.updateAccount(editableAccountData.value)
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[Updating Account]', error)
    }
}
</script>
<template>
    <div class="modal" tabindex="-1" id="AccountModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="postModalLabel">
                        <img class="img-fluid cover-img" :src="post.coverImg" alt="">
                        <img class="creator-img" :src="post.picture" alt="">
                        {{ post.name }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form @submit.prevent="updateAccount()">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input v-model="editableAccountData.name" type="Text" class="form-control" id="name">
                        </div>
                        <div class="mb-3">
                            <label for="picture" class="form-label">Picture</label>
                            <input v-model="editableAccountData.picture" type="url" class="form-control" id="picture">
                        </div>
                        <div class="mb-3">
                            <label for="linkedin" class="form-label">Linkedin</label>
                            <input v-model="editableAccountData.linkedin" type="url" class="form-control" id="linkedin">
                        </div>
                        <div class="mb-3">
                            <label for="github" class="form-label">Github</label>
                            <input v-model="editableAccountData.github" type="url" class="form-control" id="github">
                        </div>
                        <div class="mb-3">
                            <label for="bio" class="form-label">Bio</label>
                            <input v-model="editableAccountData.bio" type="text" class="form-control" id="bio">
                        </div>
                        <div class="mb-3">
                            <label for="coverImg" class="form-label">Cover Img</label>
                            <input v-model="editableAccountData.coverImg" type="url" class="form-control" id="coverImg">
                        </div>
                        <div class="mb-3">
                            <label for="resume" class="form-label">Resume</label>
                            <input v-model="editableAccountData.resume" type="text" class="form-control" id="resume">
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="graduated">Graduated</label>
                            <input v-model="editableAccountData.graduated" type="checkbox" class="form-check-input"
                                id="graduated">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.creator-img {
    height: 8rem;
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