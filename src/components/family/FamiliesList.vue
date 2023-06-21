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
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 1em;
    border: 1px solid lightgrey;
    gap: 1em;
}
</style>