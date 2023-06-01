<template>
    <div class="libraryContainer">
        <div class="categoryContainer">
            <a-tree :data="categories" :field-names="fieldNames" v-model:selected-keys="selectedKeys"
                @select="OnCategorySelect" />
        </div>
        <div class=" familyContainer">
            <div class="searchContainer">
                <a-input-search placeholder="Search" v-model:model-value="searchValue" search-button @search="onSearchClick"
                    allow-clear />
            </div>
            <div class="filtersContainer">
                <a-input-tag allow-clear v-model:model-value="tags" />
            </div>
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { getFamilyCategoriesFetch } from "@/services/familyService";
import { FamilyCategory } from "@models/Family";

class TreeFieldNames {
    constructor(title: string, key: string) {
        this.title = title;
        this.key = key;
    }
    title: string;
    key: string;
}

const fieldNames: TreeFieldNames = new TreeFieldNames('name', 'id')
const router = useRouter();
const categories = ref<FamilyCategory[]>([]);
const searchValue = ref<string | undefined>();
const selectedKeys = ref<(string | number)[]>([]);
const tags = ref<string[]>([]);


function OnCategorySelect(keys: (string | number)[]): void {
    if (searchValue) {
        tags.value.push(searchValue.value as string);
        router.push({
            name: 'familySearch',
            query: {
                keyword: searchValue.value,
                categoryId: keys[0]
            }
        })
    }
    else {
        router.push({
            name: 'familySearch',
            query: {
                categoryId: keys[0]
            }
        })
    }
}
function onSearchClick(inputValue: string): void {
    if (inputValue) {
        tags.value.push(inputValue);
        if (selectedKeys.value.length > 0) {
            router.push({
                name: 'familySearch',
                query: {
                    keyword: inputValue,
                    categoryId: selectedKeys.value[0]
                }
            })
        }
        else {
            router.push({
                name: 'familySearch',
                query: {
                    keyword: inputValue
                }
            })
        }
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
}
</style>