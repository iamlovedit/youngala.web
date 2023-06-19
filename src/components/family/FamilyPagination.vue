<template>
    <a-pagination :total="familyStore.dataCount" v-model:current="familyStore.pageIndex" :page-size="pageSize" size="small"
        @change="onPageChange" />
</template>

<script setup lang="ts">
import { useFamilyStore } from '@/stores/modules/families';
const pageSize = 20;
const familyStore = useFamilyStore();

function onPageChange(pageIndex: number) {
    
}
</script>

<style scoped></style>