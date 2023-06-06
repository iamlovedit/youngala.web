<template>
    <div class="libraryContainer">
        <div class="categoryContainer">
            <a-tree :data="categories" :field-names="fieldNames" v-model:selected-keys=selectedKeys
                v-model:expanded-keys=expandedKeys ref="tree" @select="OnCategorySelect" />
        </div>
        <div class=" familyContainer">
            <div class="searchContainer">
                <a-input-search placeholder="Search" v-model:model-value="searchValue" search-button @search="onSearchClick"
                    allow-clear />
            </div>
            <div class="filtersContainer" v-if="hasFilters">
                <div class="tagsContainer">
                    <a-tag v-for="tag in tags" :key="tag.value" :color="tag.color" closable @close="() => onCloseTag(tag)">
                        {{ tag.value }}
                    </a-tag>
                </div>
                <a-button type="outline" @click="onClearButtonClick">
                    清除条件
                </a-button>
            </div>
            <div class="orderContainer">
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
            </div>
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Message, Tree } from "@arco-design/web-vue";
import { getFamilyCategoriesFetch } from "@/services/familyService";
import { FamilyCategory } from "@models/Family";
import { FilterTag, FilterType } from "@models/OrderOption"

class TreeFieldNames {
    constructor(title: string, key: string) {
        this.title = title;
        this.key = key;
    }
    title: string;
    key: string;
}

const route = useRoute();
const fieldNames: TreeFieldNames = new TreeFieldNames('name', 'id')
const router = useRouter();
const categories = ref<FamilyCategory[]>([]);
const searchValue = ref<string | undefined>();
const selectedKeys = ref<(string | number)[]>([]);
const expandedKeys = ref<(string | number)[]>([]);
const tags = ref<FilterTag[]>([]);
const categoryColor: string = "#168cff";
const keywordColor: string = "#0fc6c2";
const hasFilters = ref<boolean>();
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
    hasFilters.value = tags.value.length > 0
}

/**
 * Handles the event of selecting a category.
 * @param {(string | number)[]} keys - An array of keys.
 * @param {any} data - Data associated with the event.
 * @return {void} Does not return anything.
 */
function OnCategorySelect(keys: (string | number)[], data: any): void {
    const selectedCategory: FamilyCategory = data.selectedNodes[0];
    const categoryTag: FilterTag = createTag(selectedCategory.name, FilterType.Category);
    tags.value = []
    tags.value.push(categoryTag);
    if (route.name === 'families') {
        pushToSearch(selectedCategory.id)
    }
    else {
        //in search route
        var keyword = route.query['keyword']
        if (keyword != undefined) {
            tags.value.push(createTag(keyword.toString(), FilterType.Keyword));
            pushToSearch(selectedCategory.id, keyword.toString())
        }
        else {
            pushToSearch(selectedCategory.id)
        }
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
    tags.value = []
    pushToFamilyHome();
    clearTreeSelected();
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
    let promise = getFamilyCategoriesFetch();
    promise.then(response => {
        if (response.success) {
            categories.value = response.response;
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


watch(tags, () => {
    hasFilters.value = tags.value.length > 0;
})

onMounted(() => {
    getFamilyCategories();
})

watch(() => route.query, () => {
}, { deep: true, immediate: true })

</script>

<style scoped>
.libraryContainer {
    width: 70%;
    margin: 2em auto;
    display: flex;
    flex-wrap: nowrap;
    gap: 1em;
}

.categoryContainer {
    width: 280px;
}

.familyContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1em;
    flex-wrap: nowrap;
}

.searchContainer {
    width: 320px;
}

.filtersContainer {
    width: 320px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
}

.tagsContainer {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    gap: 1em;
    align-items: center;
    justify-content: flex-start;
}

.orderContainer {
    width: 100%;
}
</style>