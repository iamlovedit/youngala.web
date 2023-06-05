<template>
    <FamiliesList :keyword="keyword" :categoryId="categoryId" :order="orderOption" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import FamiliesList from "@components/FamiliesList.vue";

const route = useRoute();

const keyword = ref<string>(route.query['keyword'] as string);
const categoryId = ref<number>(parseInt(route.query['categoryId'] as string));
const orderOption = ref<string>(route.query['orderOption'] as string);

watch(() => [route.query], () => {
    keyword.value = route.query['keyword'] as string;
    categoryId.value = parseInt(route.query['categoryId'] as string);
    orderOption.value = route.query['orderOption'] as string;
}, {
    immediate: true,
    deep: true
})
</script>

<style scoped></style>