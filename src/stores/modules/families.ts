import { defineStore } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import { Message } from '@arco-design/web-vue';
import { useRouter, useRoute } from 'vue-router'
import { Family, FamilyCategory } from '@/models/Family'
import { FilterTag, FilterType } from '@/models/OrderOption'
import { getFamilyPageByCategoryFetch, getFamilyPageByKeywordFetch, getFamilyPageFetech, filterFamiliePageFetch, getFamilyCategoriesFetch } from "@/services/familyService";
import { HttpResponse } from '@/models/HttpResponse';
import { PageData } from '@/models/PageData';

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
    const pageSize = 20;
    function pushToSearch(categoryId?: number | string, keyword?: string, sort: string = 'name'): void {
        router.push({
            name: 'familySearch',
            query: {
                categoryId: categoryId,
                keyword: keyword,
                pageIndex: 1,
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
        console.log(category)
        const parentIds: number[] = [];
        let parent: FamilyCategory = category.parent
        while (parent) {
            parentIds.push(parent.id)
            parent = parent.parent
        }
        return parentIds;
    }

    watch(route, () => {
        categoryId.value = route.query.categoryId?.toLocaleString();
        searchValue.value = route.query.keyword?.toLocaleString()
        if (!categoryId.value && !searchValue.value) {
            clearTags();
            clearTreeSelected();
            expandedKeys.value = [];
        }
        else {

        }
    })
    function getFamilyCategories(): void {
        const promise = getFamilyCategoriesFetch();
        promise.then(response => {
            if (response.success) {
                categories.value = response.response;
            }
            else {
                Message.error(response.message)
            }
        }).catch(error => {
            Message.error(error.message)
        })
    }

    function getAllFamilyPage(pageIndex: number, sort: string): void {
        const promise = getFamilyPageFetech(pageIndex, pageSize, sort);
        fetchFamilyPage(promise);
    }
    function getFamilyPageByKeyword(keyword: string, pageIndex: number, sort: string): void {
        const promise = getFamilyPageByKeywordFetch(keyword, pageIndex, pageSize, sort);
        fetchFamilyPage(promise);
    }

    function getFamilyPageByCategory(categroyId: number | string, pageIndex: number, sort: string): void {
        const promise = getFamilyPageByCategoryFetch(categroyId, pageIndex, pageSize, sort);
        fetchFamilyPage(promise);
    }

    function filterFamilyPage(categoryId: string | number, keyword: string, pageIndex: number, sort: string) {
        const promise = filterFamiliePageFetch(categoryId, keyword, pageIndex, pageSize, sort);
        fetchFamilyPage(promise);
    }

    function fetchFamilyPage(promise: Promise<HttpResponse<PageData<Family>>>): void {
        promise.then(response => {
            if (response.success) {
                const familiesPage = response.response;
                families.value = familiesPage.data
                dataCount.value = familiesPage.dataCount
            }
            else {
                Message.error(response.message)
            }
        }).catch(error => {
            Message.error("网络请求错误:", error.message)
        })
    }


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
        findParentIds,
        getAllFamilyPage,
        getFamilyPageByKeyword,
        getFamilyPageByCategory,
        filterFamilyPage,
        getFamilyCategories
    }
})