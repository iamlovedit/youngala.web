<template>
    <Content>
        <div class="errorContainer">
            <a-result :status="pros.status" :subtitle="pros.subtitle">
                <template #extra>
                    <a-space>
                        <a-button type="primary" @click=onBackClick>返回</a-button>
                    </a-space>
                </template>
            </a-result>
        </div>
    </Content>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Content from "@components/layout/content/Index.vue";

interface Props {
    status: any,
    subtitle: string
}

const pros = defineProps<Props>();
const router = useRouter();

function onBackClick() {
    router.back()
}
</script>

<style scoped>
.errorContainer {
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
}
</style>