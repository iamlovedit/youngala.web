<template>
    <div class="browserContainer">
        <div class="categoriesContainer">
            <CategoryTree />
        </div>
        <div class="mainContainer">
            <div class="searchContainer">
                <SearchBox />
            </div>
            <div class="filtersContainer">
                <FilterTags />
            </div>
            <div class="sortContainer">
                <SortOptions />
            </div>
            <div class="listContainer">
                <FamiliesList />
            </div>
            <div class="paginationContainer">
                <FamilyPagination />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import CategoryTree from '@components/family/CategoryTree.vue';
import SearchBox from '@/components/family/SearchBox.vue';
import FilterTags from '@/components/family/FilterTags.vue';
import SortOptions from '@/components/family/SortOptions.vue';
import FamiliesList from '@/components/family/FamiliesList.vue';
import FamilyPagination from '@/components/family/FamilyPagination.vue';

import { useFamilyStore } from '@/stores/modules/families';

const familyStore = useFamilyStore();

// watch(familyStore.route, () => {
//     const categoryId = familyStore.route.query.categoryId;
//     const keyword = familyStore.route.query.keyword;
//     if (!categoryId && !keyword) {
//         familyStore.clearTags();
//         familyStore.clearTreeSelected();
//         familyStore.searchValue = undefined;
//         familyStore.expandedKeys = [];
//     }
// })

</script>

<style scoped lang="scss">
.browserContainer {
    width: 60%;
    margin: $Global-MainContent-Margin;
    height: calc(100% - 2em);
    display: flex;
    flex-wrap: nowrap;
    gap: 1em;

    .categoriesContainer {
        width: 280px;
        border: 1px solid lightgrey;
        padding: 1em;
        height: 100%;
    }

    .mainContainer {
        flex: 1;
        display: flex;
        height: calc(100% - 2em);
        flex-direction: column;
        flex-wrap: nowrap;
        gap: 1em;
    }

    .filtersContainer .searchContainer .sortContainer .paginationContainer {
        height: fit-content;
        width: 100%;
    }

    .listContainer {
        flex: 1;
        width: 100%;
        border: 1px solid lightgrey;
    }
}
</style>