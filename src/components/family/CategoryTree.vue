<template>
    <a-scrollbar style="height:100%;overflow: auto;">
        <a-tree :data="familyStore.categories" :field-names="fieldNames" v-model:selected-keys="familyStore.selectedKeys"
            v-model:expanded-keys="familyStore.expandedKeys" ref="tree" @select="OnCategorySelect" showLine />
    </a-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tree } from "@arco-design/web-vue";
import { FamilyCategory } from '@/models/Family';
import { useFamilyStore } from '@/stores/modules/families';
import { FilterType, FilterTag } from '@/models/OrderOption'
class TreeFieldNames {
    constructor(title: string, key: string) {
        this.title = title;
        this.key = key;
    }
    title: string;
    key: string;
}

const familyStore = useFamilyStore();
const route = familyStore.route;
const fieldNames: TreeFieldNames = new TreeFieldNames('name', 'id')
const tree = ref<InstanceType<typeof Tree> | null>(null)

function OnCategorySelect(_keys: (string | number)[], data: any): void {
    const selectedCategory: FamilyCategory = data.selectedNodes[0];
    familyStore.selectedCategory = selectedCategory;
    const categoryTag: FilterTag = familyStore.createTag(selectedCategory.name, FilterType.Category, 0);
    familyStore.clearTags();
    familyStore.addTag(categoryTag);
    var keyword = route.query['keyword']?.toLocaleString()
    familyStore.setDefaultSort();
    if (keyword) {
        const keywordTag = familyStore.createTag(keyword, FilterType.Keyword, 1);
        familyStore.addTag(keywordTag);
        familyStore.pushToSearch(keyword, selectedCategory.id)
    }
    else {
        familyStore.pushToSearch(undefined, selectedCategory.id);
    }
}

</script>

<style scoped lang="scss"></style>