import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Family, FamilyCategory } from '@/models/Family'

export const useFamilyStore = defineStore('family', () => {
    const family = ref<Family>()
    const category = ref<FamilyCategory>()
    const categories = ref<FamilyCategory[]>()
    const router = useRouter();
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
    return {
        family,
        category,
        categories,
        pushToSearch
    }
})