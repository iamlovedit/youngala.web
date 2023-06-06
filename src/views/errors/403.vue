<template>
    <div class="errorContainer">
        <a-result status="403" subtitle="对不起，您无权访问该页面">
            <template #extra>
                <a-space>
                    <a-button type="primary" @click="onBackClick">返回</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function onBackClick(): void {
    router.back();
}
</script>

<style scoped>
.errorContainer {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
}
</style>