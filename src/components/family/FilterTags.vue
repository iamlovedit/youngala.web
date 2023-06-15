<template>
    <div class="filtersContainer">
        <div class="tagsContainer">
            <a-tag v-for="tag in tags" :key="tag.value" :color="tag.color" closable @close="() => onCloseTag(tag)">
                {{ tag.value }}
            </a-tag>
        </div>
        <a-button type="outline" @click="onClearButtonClick">
            清除条件
        </a-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FilterTag, FilterType } from "@models/OrderOption"
const tags = ref<FilterTag[]>([]);


function onCloseTag(tag: FilterTag): void {

}

function onClearButtonClick(): void {

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