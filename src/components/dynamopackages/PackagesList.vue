<template>
    <div class="rootContainer">
        <div class="orderOptionContainer">
            <a-select :options=orderOptions v-model:model-value="currentOrderOption" />
        </div>
        <div class="listContainer">
            <a-list :data="pakages">
                <!-- <template #item="{ packageObj }">
                    <a-list-item>
                        <a-list-item-meta :title="packageObj.name">

                        </a-list-item-meta>
                    </a-list-item>
                </template> -->
            </a-list>
        </div>
        <div class="paginationContainer">
            <a-pagination :total="dataCount" v-model:current="pageIndex" :page-size="pageSize" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { Message } from '@arco-design/web-vue';
import { DynamoPackage } from "@models/DynamoPackage";
import { getPackagesPageFetch } from '@/services/packageService';

const props = defineProps<{
    keyword?: string
}>()

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
const pakages = ref<DynamoPackage[]>([]);

function getPackages(keyword?: string, pageIndex: number = 1, pageSize: number = 20, orderField: string = 'downloads'): void {
    const promise = getPackagesPageFetch(keyword, pageIndex, pageSize, orderField)
    promise.then(httpResponse => {
        if (httpResponse.success) {
            const packagesPage = httpResponse.response
            dataCount.value = packagesPage.dataCount
            pakages.value = packagesPage.data
            console.log(pakages.value)
        }
        else {
            Message.error(httpResponse.message)
        }
    }).catch(error => {
        Message.error("网络请求错误!", error.message)
    });
}


watch(pageIndex, (newPageIndex) => {
    getPackages(props.keyword, newPageIndex, pageSize, currentOrderOption.value?.value);
})

onMounted(() => {
    getPackages(props.keyword);
})


</script>

<style scoped>
.rootContainer {
    margin-top: 1em;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: nowrap;
}

.orderOptionContainer {
    height: fit-content;
    width: 320px;
}

.listContainer {
    margin-top: 1em;
    flex: 1;
    min-height: 320px;
}

.paginationContainer {
    margin-top: 1em;
    height: 28px;
    width: 320px;
}
</style>