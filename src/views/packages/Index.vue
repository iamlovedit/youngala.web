<template>
    <div class="packageContainer">
        <Header />
        <div class="contentContainer">
            <RouterView />
        </div>
        <Footer />
        <!-- <div class="inputBoxContainer">
            <a-input-search placeholder="输入节点包名称" v-model="searchInputValue" search-button @search="onSearchClick"
                allow-clear @clear="onClear" />
        </div>
        <div class="routerViewContainer">
            <RouterView />
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import Header from "@components/layout/header/Index.vue";
import Footer from "@components/layout/footer/Index.vue";

const router = useRouter();
const route = useRoute();
const searchInputValue = ref<string | undefined>(route.query['keyword'] as string);



function onSearchClick(keyword: string): void {
    if (searchInputValue.value) {
        router.push({
            name: 'search',
            query: {
                keyword: keyword,
            }
        })
    }
}

function onClear(): void {
    searchInputValue.value = undefined
    if (route.name === 'search') {
        router.push({
            name: 'packages',
        })
    }
}

</script>
<style scoped lang="scss">
.packageContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;

    .contentContainer {
        flex: 1;
    }

    .inputBoxContainer {
        width: 320px;
        height: fit-content;
    }

    .routerViewContainer {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        width: 100%;
    }
}
</style>