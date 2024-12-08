<script setup>
import { Commercial } from '@/models/Commercial';

defineProps({
    commercialProp: { type: Commercial, required: true }
})

</script>

<template>
    <div class="col-3">
        <img class="img-fluid" :src="commercialProp.banner" alt="">
    </div>
</template>

<style scoped lang="scss"></style>