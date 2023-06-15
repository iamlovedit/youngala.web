<template>
    <a-input-search placeholder="搜索族" v-model:model-value="searchValue" search-button @search="onSearchClick" allow-clear />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchValue = ref<string | undefined>();


function onSearchClick(inputValue: string): void {
    if (inputValue) {

    }
}

onMounted(() => {
    searchValue.value = route.query['keyword'] as string;
})

</script>

<style scoped></style>