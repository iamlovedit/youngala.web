import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DynamoPackage } from '@/models/DynamoPackage'

export const usePackageStore = defineStore('package', () => {
    const packageObj = ref<DynamoPackage>()

    return {
        packageObj
    }
})