<template>
    <PackagesList :keyword="keyword" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import PackagesList from "@components/dynamopackages/PackagesList.vue"

const route = useRoute();
const keyword = route.query['keyword']?.toLocaleString();

</script>