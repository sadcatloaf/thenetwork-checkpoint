<script setup>
import { AppState } from '@/AppState';
import AdCard from '@/components/AdCard.vue';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)
const commercials = computed(() => AppState.commercials)
const account = computed(() => AppState.account)
const totalPages = computed(() => AppState.totalPages)
const currentPage = computed(() => AppState.currentPage)

// const likesCount = ref(0);

onMounted(() => {
  getPosts()
  getAnnoyingCommercials()
})

async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[Getting posts 💬]', error)
  }

}

async function getAnnoyingCommercials() {
  try {
    await postsService.getAnnoyingCommercials()
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[Getting annoying commercials that nobody wants 📺📺]', error)
  }
}


async function admirePosts(id) {
  try {
    await postsService.admirePosts(id)
  }
  catch (error) {
    logger.error('Admired Post', error)
    Pop.meow(error);
  }
}
async function changePage(pageNumber) {
  try {
    await postsService.changePostPage(pageNumber)
  }
  catch (error) {
    logger.log('Changed artwork page', error)
    Pop.error(error);
  }
}

</script>

<template>
  <div class="container">
    <div v-for="post in posts" :key="post.id" class="row p-3 my-3 border border-dark rounded shadow">
      <PostCard :postProp="post" />
      <button v-if="account != null" @click="admirePosts(post.id)" class="m-2">
        <i class="mdi mdi-heart "></i>
        <span v-if="post.likeIds"></span>
        <span v-else>Like</span>
        <span>{{ post.likeIds.length }}</span>
      </button>
    </div>
    <div v-for="commercial in commercials" :key="commercial.id" class=" p-3 my-3 shadow">
      <AdCard :commercialProp="commercial" />
    </div>
    <button @click="changePage(currentPage - 1)" :disabled="currentPage == 1" type="button"
      :title="`Go to page ${currentPage - 1}`">Newer</button>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage == 0 || currentPage == totalPages" type="button"
      :title="`Got to page ${currentPage + 1}`">Older</button>
  </div>
</template>

<style scoped lang="scss"></style>
