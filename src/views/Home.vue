<template>
    <Content>
        <div ref="webgl" class="homeContainer">

        </div>
    </Content>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Content from '@components/layout/content/Index.vue'
import { renderer } from "@components/threejs/family";
const webgl = ref<HTMLDivElement | null>(null)


onMounted(() => {
    webgl.value?.appendChild(renderer.domElement);
    
})
</script>

<style scoped lang="scss">
.homeContainer {
    height: 100%;
    width: 100%;
}
</style>