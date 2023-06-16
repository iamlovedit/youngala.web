import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Family, FamilyCategory } from '@/models/Family'
import { FilterTag, FilterType } from '@/models/OrderOption'


export const useFamilyStore = defineStore('family', () => {
    const family = ref<Family>()
    const searchValue = ref<string | undefined>();
    const selectedCategory = ref<FamilyCategory>()
    const categories = ref<FamilyCategory[]>()
    const router = useRouter();
    const filterTags = ref<FilterTag[]>([]);
    const categoryColor: string = "#168cff";
    const keywordColor: string = "#0fc6c2";
    const selectedKeys = ref<(string | number)[]>([]);
    const expandedKeys = ref<(string | number)[]>([]);

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

    return {
        router,
        family,
        selectedCategory,
        categories,
        filterTags,
        selectedKeys,
        expandedKeys,
        searchValue,
        clearTags,
        pushToSearch,
        pushToFamilyHome,
        addTag,
        removeTag,
        createTag,
        clearTreeSelected,
    }
})