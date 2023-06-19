<template>
    <a-scrollbar style="height:800px;overflow: auto;">
        <a-tree :data="familyStore.categories" :field-names="fieldNames" v-model:selected-keys="familyStore.selectedKeys"
            v-model:expanded-keys="familyStore.expandedKeys" ref="tree" @select="OnCategorySelect" />
    </a-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { Message, Tree } from "@arco-design/web-vue";
import { useRoute } from "vue-router";
import { Family, FamilyCategory } from '@/models/Family';
import { useFamilyStore } from '@/stores/modules/families';
import { FilterType, FilterTag } from '@/models/OrderOption'
import { getFamilyCategoriesFetch } from "@/services/familyService";
import { debug } from 'console';

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
const categories = ref<FamilyCategory[]>([]);
const tree = ref<InstanceType<typeof Tree> | null>(null)

function OnCategorySelect(_keys: (string | number)[], data: any): void {
    const selectedCategory: FamilyCategory = data.selectedNodes[0];
    familyStore.selectedCategory = selectedCategory;
    const categoryTag: FilterTag = familyStore.createTag(selectedCategory.name, FilterType.Category);
    familyStore.clearTags();
    familyStore.addTag(categoryTag);
    //in search route
    var keyword = route.query['keyword']
    if (keyword != undefined) {
        const keywordTag = familyStore.createTag(keyword.toString(), FilterType.Keyword);
        familyStore.addTag(keywordTag);
        familyStore.pushToSearch(selectedCategory.id, keyword.toString(), familyStore.checkedOrder)
    }
    else {
        familyStore.pushToSearch(selectedCategory.id, undefined, familyStore.checkedOrder);
    }
}


function getFamilyCategories(): void {
    const promise = getFamilyCategoriesFetch();
    promise.then(response => {
        if (response.success) {
            familyStore.categories = response.response;
        }
        else {
            Message.error(response.message)
        }
    }).catch(error => {
        Message.error(error.message)
    })
}

function findCategory(categories: FamilyCategory[] | undefined, id: number): FamilyCategory | undefined {
    if (categories) {
        for (const category of categories) {
            if (category.id === id) {
                return category;
            }
            if (category.children) {
                const found = findCategory(category.children, id);
                if (found) {
                    return found;
                }
            }
        }
    }
    return undefined;
}

onBeforeMount(() => {
    getFamilyCategories()
})

onMounted(() => {
    const categoryId: number | undefined = parseInt(route.query['categoryId']?.toLocaleString() as string);
    if (categoryId) {
        familyStore.categoryId = categoryId
        familyStore.selectedKeys.push(categoryId)
        //     = familyStore.categories?.find(category => category.id === categoryId);
        // if (category) {
        //     const parentIds = familyStore.findParentIds(category);
        //     familyStore.expandedKeys = parentIds
        // }
    }
})

watch(() => familyStore.categories, () => {
    const categoryId: number | undefined = parseInt(route.query['categoryId']?.toLocaleString() as string);
    const category = findCategory(familyStore.categories, categoryId);
    if (category) {
        const parentIds = familyStore.findParentIds(category);

        familyStore.expandedKeys = parentIds
    }
})


</script>

<style scoped lang="scss"></style>