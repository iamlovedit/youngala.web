<template>
    <a-radio-group type="button" v-model:model-value="familyStore.checkedOrder" @change="onOrderChange">
        <a-grid :cols="4" :colGap="16">
            <a-grid-item>
                <a-radio value="name">综合排序</a-radio>
            </a-grid-item>
            <a-grid-item>
                <a-radio value="downloads">最多下载</a-radio>
            </a-grid-item>
            <a-grid-item>
                <a-radio value="createTime">最新发布</a-radio>
            </a-grid-item>
            <a-grid-item>
                <a-radio value="stars">最多收藏</a-radio>
            </a-grid-item>
        </a-grid>
    </a-radio-group>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useFamilyStore } from '@stores/modules/families'
const route = useRoute()
const familyStore = useFamilyStore();

function onOrderChange(value: string | number | boolean) {
    const categoryId = route.query['categoryId']?.toLocaleString();
    const keyword = route.query['keyword']?.toLocaleString();
    familyStore.pushToSearch(keyword, categoryId, 1, value as string)
}

</script>

<style scoped lang="scss"></style>