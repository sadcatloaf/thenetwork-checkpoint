<script setup>
import { profilesService } from '@/services/ProfilesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
onMounted(() => {
  getProfileById()
})
async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING PROFILE BY ID]', error)
  }
}
</script>

<template>
  <div class="about">
    <h1>This is the profile page</h1>
  </div>
</template>

<style scoped lang="scss"></style>