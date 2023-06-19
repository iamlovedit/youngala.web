<template>
    <div class="listContainer">
        <a-empty v-show="!familyStore.dataCount" />
        <FamilyItem v-for="family in familyStore.families" :key="family.id" :family="family" />
    </div>
</template>

<script setup lang="ts">
import FamilyItem from "@components/family/FamilyItem.vue";
import { useFamilyStore } from '@/stores/modules/families';
const familyStore = useFamilyStore();
</script>

<style scoped>
.listContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>