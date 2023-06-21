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
import { onMounted } from 'vue'
import CategoryTree from '@components/family/CategoryTree.vue';
import SearchBox from '@/components/family/SearchBox.vue';
import FilterTags from '@/components/family/FilterTags.vue';
import SortOptions from '@/components/family/SortOptions.vue';
import FamiliesList from '@/components/family/FamiliesList.vue';
import FamilyPagination from '@/components/family/FamilyPagination.vue';
import { useFamilyStore } from '@/stores/modules/families';
import { FilterType } from '@/models/OrderOption';

const familyStore = useFamilyStore();

const fetchData = async () => {
    familyStore.getFamilyCategories();
}

const initView = async () => {
    await fetchData();
    familyStore.searchValue = familyStore.route.query['keyword'] as string;
    familyStore.categoryId = familyStore.route.query['categoryId'] as string;
    const categoryId = parseInt(familyStore.categoryId);
    familyStore.selectedKeys.push(categoryId);
    if (familyStore.searchValue) {
        const tag = familyStore.createTag(familyStore.searchValue, FilterType.Keyword, 1);
        familyStore.addTag(tag)
    }
    familyStore.filterFamilyPage(familyStore.searchValue, familyStore.categoryId, 1, "name")
}

onMounted(() => {
    initView();
})
</script>

<style scoped lang="scss">
.browserContainer {
    width: 60%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding: $Global-MainContent-Padding;
    gap: 1em;

    .categoriesContainer {
        width: 280px;
        height: calc(100% - 2em);
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
    }
}
</style>