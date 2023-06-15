<template>
    <a-pagination :total="dataCount" v-model:current="pageIndex" :page-size="pageSize" size="small" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const pageIndex = ref<number>(1);
const pageSize = 20;
const dataCount = ref<number>(0);

</script>

<style scoped></style>