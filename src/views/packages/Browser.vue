<template>
    <div class="BrowserRootContainer">
        <div class="inputBoxContainer">
            <a-input-search placeholder="输入节点包名称" v-model="searchInputValue" search-button @search="onSearchClick" />
        </div>
        <div class="packagesContainer">
            <PackagesList :keyword="searchInputValue" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import PackagesList from "@components/dynamopackages/PackagesList.vue";


const router = useRouter()
const searchInputValue = ref<string | undefined>();
function onSearchClick(keyword: string): void {
    if (searchInputValue.value) {
        router.push({
            name: 'search',
            query: {
                keyword: keyword
            }
        })
    }
}


</script>

<style scoped>
.BrowserRootContainer {
    flex: 1;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.inputBoxContainer {
    width: 320px;
    height: fit-content;
}

.packagesContainer {
    width: inherit;
    flex: 1;
}
</style>