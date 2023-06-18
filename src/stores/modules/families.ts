import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Family, FamilyCategory } from '@/models/Family'
import { FilterTag, FilterType } from '@/models/OrderOption'


export const useFamilyStore = defineStore('family', () => {
    const family = ref<Family>()
    const categoryId = ref<number | string | undefined>();
    const searchValue = ref<string | undefined>();
    const selectedCategory = ref<FamilyCategory>()
    const categories = ref<FamilyCategory[]>()
    const router = useRouter();
    const route = useRoute();
    const filterTags = ref<FilterTag[]>([]);
    const categoryColor: string = "#168cff";
    const keywordColor: string = "#0fc6c2";
    const selectedKeys = ref<(string | number)[]>([]);
    const expandedKeys = ref<(string | number)[]>([]);
    const checkedOrder = ref<string>('name')
    const pageIndex = ref<number>(1);
    const dataCount = ref<number>(0);
    const families = ref<Family[]>();
    function pushToSearch(categoryId?: number | string, keyword?: string, sort: string = 'name'): void {
        router.push({
            name: 'familySearch',
            query: {
                categoryId: categoryId,
                keyword: keyword,
                sort: sort
            }
        })
    }

    function pushToFamilyHome(): void {
        router.push({
            path: '/family',
        })
    }

    function clearTags(): void {
        filterTags.value = []
    }

    function addTag(tag: FilterTag): void {
        filterTags.value.push(tag)
    }

    function removeTag(tag: FilterTag): void {
        filterTags.value = filterTags.value.filter(item => item !== tag)
    }
    function createTag(title: string, filterType: FilterType): FilterTag {
        const color = filterType == FilterType.Keyword ? keywordColor : categoryColor;
        return new FilterTag(title, filterType, color);
    }

    function clearTreeSelected(): void {
        selectedKeys.value = [];
        expandedKeys.value = [];
    }
    function findParentIds(category: FamilyCategory): number[] {
        const parentIds: number[] = [];
        let parent = category.parent
        while (parent) {
            parentIds.push(parent.id)
            parent = parent.parent
        }
        return parentIds;
    }

    watch(route, () => {
        categoryId.value = route.query.categoryId?.toLocaleString();
        searchValue.value = route.query.keyword?.toLocaleString();
        if (!categoryId.value && !searchValue.value) {
            clearTags();
            clearTreeSelected();
            expandedKeys.value = [];
        }

    })

    return {
        router,
        route,
        family,
        selectedCategory,
        categories,
        filterTags,
        selectedKeys,
        expandedKeys,
        searchValue,
        checkedOrder,
        pageIndex,
        dataCount,
        families,
        categoryId,
        clearTags,
        pushToSearch,
        pushToFamilyHome,
        addTag,
        removeTag,
        createTag,
        clearTreeSelected,
        findParentIds
    }
})