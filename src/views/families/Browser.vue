<template>
    <div class="libraryContainer">
        <div class="categoryContainer">
            <a-tree :data="categories" :field-names="fieldNames" @select="OnCategorySelect" />
        </div>
        <div class=" familyContainer">
            <div class="searchContainer">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Message } from "@arco-design/web-vue";
import { getFamilyCategoriesFetch } from "@/services/familyService";
import { FamilyCategory, Family } from "@models/Family";

class TreeFieldNames {
    constructor(title: string, key: string) {
        this.title = title;
        this.key = key;
    }
    title: string;
    key: string;
}

const fieldNames: TreeFieldNames = new TreeFieldNames('name', 'id')

const categories = ref<FamilyCategory[]>([]);
const families = ref<Family[]>([]);

function OnCategorySelect(selectedKeys: (string | number)[]) {
    console.log(selectedKeys)
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
</style>