<template>
    <div class="familiesContainer">
        <div class="listContainer">
            <a-empty v-show="!dataCount" />
            <FamilyItem v-for="family in families" :key="family.id" :family="family" />
        </div>
        <div class="paginationContainer">
            <a-pagination :total="dataCount" v-model:current="pageIndex" :page-size="pageSize" size="small" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { Message } from '@arco-design/web-vue';
import { Family } from "@models/Family";
import FamilyItem from "@components/family/FamilyItem.vue";
import { getFamilyPageByCategoryFetch, getFamilyPageByKeywordFetch, getFamilyPageFetech } from "@/services/familyService";


interface props {
    categoryId: number | undefined,
    keyword: string | undefined,
    order: string | undefined
}

const props = withDefaults(defineProps<props>(), {
    categoryId: undefined,
    keyword: undefined,
    order: 'name'
});

const router = useRouter();
const route = useRoute();
const pageIndex = ref<number>(1);
const pageSize = 20;
const dataCount = ref<number>(0);
const families = ref<Family[]>()

function getAllFamilyPage(pageIndex: number, sort: string): void {
    const promise = getFamilyPageFetech(pageIndex, pageSize, sort);
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

onMounted(() => {
    getAllFamilyPage(pageIndex.value, props.order as string);
})

watch(props, () => {
    console.log('props changed');
})

</script>

<style scoped>
.familiesContainer {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: start;
    gap: 1em;
    flex-wrap: nowrap;
}

.listContainer {
    width: 100%;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    border: 1px solid lightgray;
    padding: 1em;
}

.paginationContainer {
    width: 320px;
}
</style>