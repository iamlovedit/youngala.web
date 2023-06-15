<template>
    <a-radio-group type="button" v-model:model-value=checkedOrder @change="onOrderChange">
        <a-grid :cols="4" :colGap="16">
            <a-grid-item>
                <a-radio value="name">综合排序</a-radio>
            </a-grid-item>
            <a-grid-item>
                <a-radio value="download">最多下载</a-radio>
            </a-grid-item>
            <a-grid-item>
                <a-radio value="latest">最新发布</a-radio>
            </a-grid-item>
            <a-grid-item>
                <a-radio value="stars">最多收藏</a-radio>
            </a-grid-item>
        </a-grid>
    </a-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useFamilyStore } from '@stores/modules/families'


const router = useRouter()
const route = useRoute()
const checkedOrder = ref<string>('name')
const familyStore = useFamilyStore();

function onOrderChange(value: string | number | boolean) {
    if (route.name === "families") {
        // pushToSearch(undefined, undefined, value as string)
        router.push({
            name: 'families',
            query: {
                sort: value as string
            }
        })
    }
    else {
        const categoryId = route.query['categoryId']?.toLocaleString();
        const Keyword = route.query['keyword']?.toLocaleString();
        familyStore.pushToSearch(categoryId, Keyword, value as string)
    }
}
</script>

<style scoped lang="scss"></style>