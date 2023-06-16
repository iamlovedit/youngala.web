<template>
    <div class="filtersContainer" v-show="familyStore.filterTags.length">
        <div class="tagsContainer">
            <a-tag v-for="tag in familyStore.filterTags" :key="tag.value" :color="tag.color" closable
                @close="() => onCloseTag(tag)">
                {{ tag.value }}
            </a-tag>
        </div>
        <a-button type="outline" @click="onClearButtonClick">
            清除条件
        </a-button>
    </div>
</template>

<script setup lang="ts">
import { FilterTag } from "@models/OrderOption"
import { useFamilyStore } from '@/stores/modules/families';

const familyStore = useFamilyStore();
function onCloseTag(tag: FilterTag): void {
    familyStore.removeTag(tag);
}

function onClearButtonClick(): void {
    familyStore.clearTags();
    familyStore.clearTreeSelected();
    familyStore.pushToFamilyHome();
}
</script>

<style scoped lang="scss">
.filtersContainer {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
}
</style>