<template>
    <a-pagination :total="familyStore.dataCount" v-model:current="familyStore.pageIndex" :page-size="pageSize"
        size="small" />
</template>

<script setup lang="ts">
import { useFamilyStore } from '@/stores/modules/families';
import { watch, onMounted } from "vue";
const pageSize = 20;
const familyStore = useFamilyStore();


watch(() => { familyStore.pageIndex }, () => {

})

onMounted(() => {
    
})

</script>

<style scoped></style>