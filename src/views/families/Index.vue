<template>
    <Content>
        <RouterView />
    </Content>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Message, Tree } from "@arco-design/web-vue";
import { getFamilyCategoriesFetch } from "@/services/familyService";
import { FamilyCategory } from "@models/Family";
import { FilterTag, FilterType } from "@models/OrderOption"
import { useFamilyStore } from "@/stores/modules/families";
import Content from '@components/layout/content/Index.vue';

const route = useRoute();
const router = useRouter();
const searchValue = ref<string | undefined>();
const selectedKeys = ref<(string | number)[]>([29]);
const expandedKeys = ref<(string | number)[]>([1, 6]);
const tags = ref<FilterTag[]>([]);
const categoryColor: string = "#168cff";
const keywordColor: string = "#0fc6c2";
const familyStore = useFamilyStore();

const tree = ref<InstanceType<typeof Tree> | null>(null)
const checkedOrder = ref<string>('name')

if (route.name !== 'families') {
    const categoryId = route.query['categoryId']?.toLocaleString();
    if (categoryId) {
        selectedKeys.value = [categoryId]
        expandedKeys.value = [categoryId]
        tags.value.push(createTag(categoryId, FilterType.Category));
    }
    const keyword = route.query['keyword']?.toLocaleString();
    if (keyword) {
        searchValue.value = keyword
        tags.value.push(createTag(keyword, FilterType.Keyword));
    }
}

/**
 * Handles the click event of the search button. If the input value is not empty, it creates a
 * keyword filter tag and either pushes it to the tags array and performs a search on the families
 * route or creates a category filter tag and pushes both tags to the tags array and performs a
 * search on the search route.
 * @param {string} inputValue - The value of the search input.
 * @return {void} This function does not return anything.
 */
function onSearchClick(inputValue: string): void {
    if (inputValue) {
        tags.value = []
        const keywordTag: FilterTag = createTag(inputValue, FilterType.Keyword);
        if (route.name === 'families') {
            tags.value.push(keywordTag);
            pushToSearch(undefined, inputValue, checkedOrder.value)
        }
        else {
            //in search route
            const selectedCategory = tree.value?.getSelectedNodes()[0] as FamilyCategory  //TODO: 刷新后设置tree的选择点
            const categoryTag: FilterTag = createTag(selectedCategory.name, FilterType.Category);
            tags.value.push(categoryTag, keywordTag);
            pushToSearch(selectedCategory.id, inputValue, checkedOrder.value)
        }
    }
}

/**
 * Clears the tags, pushes the current view to the family home, and clears the selected tree node.
 * @return {void} This function does not return anything.
 */
function onClearButtonClick(): void {
    clearFilterTags();
    pushToFamilyHome();
    clearTreeSelected();
}

function clearFilterTags(): void {
    tags.value = []
}

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
        pushToSearch(categoryId, Keyword, value as string)
    }
}


function createTag(title: string, filterType: FilterType): FilterTag {
    const color = filterType == FilterType.Keyword ? keywordColor : categoryColor;
    return new FilterTag(title, filterType, color);
}

/**
 * Removes the given tag from the list of tags and updates the search query.
 * @param {FilterTag} tag - The tag to be removed.
 * @return {void} This function does not return anything.
 */
function onCloseTag(tag: FilterTag): void {
    tags.value = tags.value.filter(t => t.value !== tag.value);
    if (tags.value.length > 0) {
        const filterTag = tags.value[0]
        if (tag.Type === FilterType.Keyword) {
            const selectedCategory = tree.value?.getSelectedNodes()[0] as FamilyCategory
            pushToSearch(selectedCategory.id, undefined,)
        }
        else {
            clearTreeSelected();
            pushToSearch(undefined, filterTag.value)
        }
    } else {
        clearTreeSelected();
        pushToFamilyHome();
    }
}

/**
 * Retrieves the family categories using a promise and updates the categories value in the response.
 *
 * @return {Promise} A promise that resolves with the categories or rejects with an error message.
 */
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

function clearTreeSelected(): void {
    selectedKeys.value = []
}


function pushToFamilyHome(): void {
    router.push({
        name: 'families',
    })
}


function pushToSearch(categoryId?: number | string, keyword?: string, sort: string = 'name'): void {
    router.push({
        name: 'familySearch',
        query: {
            categoryId: categoryId,
            keyword: keyword,
            sort: sort
        }
    })
}

watch(route, () => {
    if (route.name === 'family') {
        clearTreeSelected();
        clearFilterTags();
        searchValue.value = undefined
    }
})

</script>

<style scoped lang="scss"></style>