<template>
    <a-input-search placeholder="搜索族" v-model:model-value="familyStore.searchValue" search-button @search="onSearchClick"
        allow-clear />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFamilyStore } from '@/stores/modules/families';
import { FilterType, FilterTag } from '@/models/OrderOption';

const familyStore = useFamilyStore();
const route = useRoute();

function onSearchClick(inputValue: string): void {
    if (inputValue) {
        familyStore.searchValue = inputValue;
        familyStore.clearTags();
        const keywordTag: FilterTag = familyStore.createTag(inputValue, FilterType.Keyword);
        if (route.name == "browser") {
            familyStore.pushToSearch(parseInt(route.query['categoryId']?.toLocaleString() as string));
        }
        else {
            familyStore.pushToFamilyHome();

        }

    }
}

onMounted(() => {
    familyStore.searchValue = route.query['keyword'] as string;
})

</script>

<style scoped></style>