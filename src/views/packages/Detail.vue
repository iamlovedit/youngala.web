<template>
    <div class="detailContainer">
        <div class="headContainer">
            <a-page-header :style="{ background: 'var(--color-bg-2)' }" title="返回" subtitle="ArcoDesign Vue 2.0" />
        </div>
        <div class="descriptionContainer">

        </div>

        <div class="versionContainer">

        </div>
    </div>
</template>

<script setup lang="ts">

const props=defineProps<{
    name:string,
    descrption:string
}>()

import { onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();



onMounted(() => {

})

</script>

<style scoped>
.detailContainer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: start;
    margin-top: 1em;
}

.headContainer {
    height: fit-content;
}

.descriptionContainer {
    height: fit-content;
}

.versionContainer {
    height: fit-content;
}
</style>