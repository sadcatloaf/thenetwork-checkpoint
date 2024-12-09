<script setup>
import { AppState } from '@/AppState';
import PageNavigation from '@/components/PageNavigation.vue';
import PostCard from '@/components/PostCard.vue';
import SearchCard from '@/components/SearchCard.vue';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const editableSearchQuery = ref('')
const posts = computed(() => AppState.posts)

onMounted(() => {
    postsService.clearPosts()
})

async function searchPosts() {
    try {
        await postsService.searchPosts(editableSearchQuery.value)
    } catch (error) {
        Pop.meow(error)
        logger.error('[SEARCHING MOVIES]', error)
    }
}
</script>
<template>
    <div class="container">
        <section class="row">
            <div class="col-12">
                <h1>Search Movies</h1>
            </div>
            <div class="col-12">
                <div>
                    <form @submit.prevent="searchPosts()">
                        <div class="mb-3">
                            <label for="searchQuery" class="form-label"></label>
                            <div class="d-flex">
                                <input v-model="editableSearchQuery" type="text" class="form-control" id="searchQuery"
                                    placeholder="Search...">
                                <button class="btn btn-outline-dark" type="submit" title="Search for posts.">
                                    <i class="mdi mdi-magnify"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <div class="col-12">
            <PageNavigation :searchQueryProp="editableSearchQuery" />
        </div>
        <section class="row">
            <div v-for="post in posts" :key="post.id" class="col-md-3">
                <PostCard :post-prop="post" />
            </div>
        </section>
        <section>
            <div v-for="post in posts" :key="post.id" class="col-md-3">
                <SearchCard :post-prop="post" />
            </div>
        </section>
    </div>
</template>
<style lang="scss" scoped></style>