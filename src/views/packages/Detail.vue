<template>
    <div class="detailContainer">
        <div class="headContainer">
            <a-page-header :style="{ background: 'var(--color-bg-2)' }" title="返回" subtitle="111" @back="onBack" />
        </div>
        <div class="descriptionContainer">

        </div>

        <div class="versionContainer">

        </div>
    </div>
</template>

<script setup lang="ts">


import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

function onBack(): void {
    router.back()
}

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