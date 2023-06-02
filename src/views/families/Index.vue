<template>
    <div class="libraryContainer">
        <div class="categoryContainer">
            <a-tree :data="categories" :field-names="fieldNames" v-model:selected-keys="selectedKeys" ref="tree"
                @select="OnCategorySelect" />
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
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Message } from "@arco-design/web-vue";
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
const tags = ref<FilterTag[]>([]);
const categoryColor: string = "#168cff";
const keywordColor: string = "#0fc6c2";
const hasFilters = ref<boolean>(false);
const tree = ref()


function OnCategorySelect(keys: (string | number)[], data: any): void {
    const selectedCategory: FamilyCategory = data.selectedNodes[0];
    const categoryTag: FilterTag = new FilterTag(selectedCategory.name, FilterType.Category, categoryColor);
    tags.value = []
    tags.value.push(categoryTag);
    if (route.name === 'families') {
        pushToSearch(selectedCategory.id)
    }
    else {
        //in search route
        var keyword = route.query['keyword']
        if (keyword != undefined) {
            tags.value.push(new FilterTag(keyword.toString(), FilterType.Keyword, keywordColor));
            pushToSearch(selectedCategory.id, keyword.toString())
        }
        else {
            pushToSearch(selectedCategory.id)
        }
    }
}

function onSearchClick(inputValue: string): void {
    if (inputValue) {
        // console.log(tree.getSelectedNodes())
        tags.value = []
        const keywordTag: FilterTag = new FilterTag(inputValue, FilterType.Keyword, keywordColor);
        tags.value.push(keywordTag);
        if (route.name === 'families') {
            pushToSearch(undefined, inputValue)
        }
        else {
            //in search route

        }


        // if (selectedKeys.value.length > 0) {
        //     router.push({
        //         name: 'familySearch',
        //         query: {
        //             keyword: inputValue,
        //             categoryId: selectedKeys.value[0]
        //         }
        //     })
        // }
        // else {
        //     router.push({
        //         name: 'familySearch',
        //         query: {
        //             keyword: inputValue
        //         }
        //     })
        // }
    }
}

function onClearButtonClick() {
    tags.value = []
    router.push({
        name: 'families',
    })
}

function onCloseTag(tag: FilterTag) {
    tags.value = tags.value.filter(t => t.value !== tag.value);

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
    width: 100%;
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
</style>