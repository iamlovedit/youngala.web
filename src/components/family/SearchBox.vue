<template>
    <a-input-search placeholder="搜索族" v-model:model-value="familyStore.searchValue" search-button @search="onSearchClick"
        allow-clear />
</template>

<script setup lang="ts">
import { useFamilyStore } from '@/stores/modules/families';
import { FilterType, FilterTag } from '@/models/OrderOption';

const familyStore = useFamilyStore();

function onSearchClick(inputValue: string): void {
    if (inputValue) {
        familyStore.searchValue = inputValue;
        familyStore.clearTags();
        const keywordTag: FilterTag = familyStore.createTag(inputValue, FilterType.Keyword);
        const categoryId = familyStore.route.query.categoryId?.toLocaleString();
        if (categoryId) {
            const categoryTag = familyStore.createTag(familyStore.selectedCategory?.name as string, FilterType.Category);
            familyStore.addTag(categoryTag);
        }
        familyStore.addTag(keywordTag);
        familyStore.pushToSearch(inputValue, categoryId)
    }
}
</script>

<style scoped></style>