<template>
    <div class="rootContainer">
        <div class="inputBoxContainer">
            <a-input-search placeholder="输入节点包名称" v-model="searchInputValue" search-button @search="onSearchClick" />
        </div>
        <div class="orderOptionContainer">
            <a-select :options=orderOptions v-model:model-value="currentOrderOption" />
        </div>
        <div class="paginationContainer">
            <a-pagination :total="dataCount" v-model:current="pageIndex" :page-size="pageSize" />
        </div>
    </div>
    <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { RouterView } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { getPackagesPageFetch } from '@/services/packageService';
import { DynamoPackage } from "@/models/DynamoPackage";


interface OrderOption {
    value: string,
    label: string
}

const orderOptions: OrderOption[] = [
    {
        value: 'downloads',
        label: '下载量'
    },
    {
        value: 'name',
        label: '名称'
    },
    {
        value: 'votes',
        label: '点赞量'
    },
    {
        value: 'updateTime',
        label: '更新时间'
    },
    {
        value: 'createTime',
        label: '创建时间'
    },
]

const currentOrderOption = ref<OrderOption>()
const pageIndex = ref<number>(1);
const pageSize: number = 20;
const dataCount = ref<number>(0);
const searchInputValue = ref<string | undefined>();
const packages = ref<DynamoPackage[]>([]);
const router = useRouter()


function getPackages(keyword?: string, pageIndex: number = 1, pageSize: number = 20, orderField: string = 'downloads'): void {
    const promise = getPackagesPageFetch(keyword, pageIndex, pageSize, orderField)
    promise.then(httpResponse => {
        if (httpResponse.success) {
            const packagesPage = httpResponse.response
            dataCount.value = packagesPage.dataCount
            packages.value = packagesPage.data
        }
        else {
            Message.error(httpResponse.message)
        }
    }).catch(error => {
        Message.error("网络请求错误!", error.message)
    });
}


function onSearchClick(keyword: string): void {
    if (searchInputValue.value) {
        router.push({
            name: 'search',
            query: {
                keyword: keyword
            }
        })
    }
}

onMounted(() => {

})

</script>

<style scoped>
.rootContainer {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
}

.inputBoxContainer {
    width: 320px;
    height: fit-content;
}

.orderOptionContainer {
    height: fit-content;
    width: 320px;
}

.paginationContainer {
    margin-top: 1em;
    height: 28px;
    width: 320px;
}
</style>