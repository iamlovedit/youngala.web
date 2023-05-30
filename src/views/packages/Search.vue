<template>
    <PackagesList :keyword="keyword" />
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import PackagesList from "@components/dynamopackages/PackagesList.vue"

const route = useRoute();

const keyword = ref<string>();
watch(() => [route.query], () => {
    keyword.value = route.query['keyword']?.toLocaleString()
}, {
    immediate: true, deep: true
});

</script>
