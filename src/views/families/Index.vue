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
                <a-radio-group type="button" :default-value="checkedOrder">
                    <a-grid :cols="4" :colGap="16">
                        <a-grid-item>
                            <a-radio value="name">综合排序</a-radio>
                        </a-grid-item>
                        <a-grid-item>
                            <a-radio value="download">最多下载</a-radio>
                        </a-grid-item>
                        <a-grid-item>
                            <a-radio value="3">最多浏览</a-radio>
                        </a-grid-item>
                        <a-grid-item>
                            <a-radio value="star">最多收藏</a-radio>
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

function onSearchClick(inputValue: string): void {
    if (inputValue) {
        tags.value = []
        const keywordTag: FilterTag = createTag(inputValue, FilterType.Keyword);
        if (route.name === 'families') {
            tags.value.push(keywordTag);
            pushToSearch(undefined, inputValue)
        }
        else {
            //in search route
            const selectedCategory = tree.value?.getSelectedNodes()[0] as FamilyCategory
            const categoryTag: FilterTag = createTag(selectedCategory.name, FilterType.Category);
            tags.value.push(categoryTag, keywordTag);
            pushToSearch(selectedCategory.id, inputValue)
        }
    }
}

function onClearButtonClick() {
    tags.value = []
    pushToFamilyHome();
}

function createTag(title: string, filterType: FilterType): FilterTag {
    const color = filterType == FilterType.Keyword ? keywordColor : categoryColor;
    return new FilterTag(title, filterType, color);
}

function onCloseTag(tag: FilterTag) {
    tags.value = tags.value.filter(t => t.value !== tag.value);
    if (tags.value.length > 0) {
        const filterTag = tags.value[0]
        if (tag.Type === FilterType.Keyword) {
            const selectedCategory = tree.value?.getSelectedNodes()[0] as FamilyCategory
            pushToSearch(selectedCategory.id, undefined)
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

function getFamilyCategories() {
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

function clearTreeSelected() {
    selectedKeys.value = []
}


function pushToFamilyHome(): void {
    router.push({
        name: 'families',
    })
}

function pushToSearch(categoryId?: number, keyword?: string): void {
    if (categoryId != undefined && keyword == undefined) {
        router.push({
            name: 'familySearch',
            query: {
                categoryId: categoryId,
            }
        })
    }
    else if (keyword != undefined && categoryId == undefined) {
        router.push({
            name: 'familySearch',
            query: {
                keyword: keyword
            }
        })
    }
    else {
        router.push({
            name: 'familySearch',
            query: {
                categoryId: categoryId,
                keyword: keyword
            }
        })
    }
}

watch(tags, () => {
    hasFilters.value = tags.value.length > 0;
})

onMounted(() => {

    getFamilyCategories();
})

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