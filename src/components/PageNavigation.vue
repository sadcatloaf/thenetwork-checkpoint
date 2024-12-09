<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
const route = useRoute()
const props = defineProps({
    searchQueryProp: { type: String }
})
async function changePage(pageNumber) {
    try {
        // if I am on the home page
        if (route.name == 'Home') {
            await postsService.changePostPage(pageNumber)
        }
        else {
            await postsService.changeSearchPage(pageNumber, props.searchQueryProp)
        }
    } catch (error) {
        logger.error('[CHANGE MOVIES PAGE]', error)
        Pop.error(error)
    }
}
</script>
<template>
    <div class="d-flex gap-2 align-items-center mb-3">
        <button @click="changePage(currentPage - 1)" class="btn btn-outline-dark" :disabled="currentPage < 2"
            type="button" :title="`Go to page ${currentPage - 1}`">
            Previous
        </button>
        <span class="fw-bold">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" class="btn btn-outline-dark"
            :disabled="currentPage == 500 || currentPage == totalPages" type="button"
            :title="`Go to page ${currentPage + 1}`">
            Next
        </button>
    </div>
</template>
<style lang="scss" scoped></style>