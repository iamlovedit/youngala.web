import { defineStore } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import { Message } from '@arco-design/web-vue';
import { useRouter, useRoute } from 'vue-router'
import { Family, FamilyCategory } from '@/models/Family'
import { FilterTag, FilterType } from '@/models/OrderOption'
import { filterFamiliePageFetch, getFamilyCategoriesFetch } from "@/services/familyService";
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


    /**
 * Updates search parameters and navigates to family search page.
 * @param keyword - Optional search keyword.
 * @param categoryId - Optional category ID to filter search.
 * @param sort - Optional sort parameter. Defaults to 'name'.
 */
    function pushToSearch(keyword?: string, categoryId?: number | string, pageIndex: number = 1, sort: string = 'name'): void {
        filterFamilyPage(keyword, categoryId, 1, sort)
        router.push({
            name: 'familySearch',
            query: {
                categoryId: categoryId,
                keyword: keyword,
                pageIndex: pageIndex,
                sort: sort
            }
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
            Message.error(`网络请求错误: ${error.message}`)
        })
    }


    function filterFamilyPage(keyword: string | undefined, categoryId: string | number | undefined, pageIndex: number, sort: string): void {
        const promise = filterFamiliePageFetch(keyword, categoryId, pageIndex, pageSize, sort);
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
            Message.error(`网络请求错误: ${error.message}`)
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
        addTag,
        removeTag,
        createTag,
        clearTreeSelected,
        findParentIds,
        filterFamilyPage,
        getFamilyCategories
    }
})