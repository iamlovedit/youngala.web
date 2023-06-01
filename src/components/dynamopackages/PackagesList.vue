<template>
    <div class="rootContainer">
        <div class="orderOptionContainer">
            <a-select :options=orderOptions v-model:model-value="currentOrderOption" />
        </div>
        <div class=" listContainer">
            <a-list :max-height="800" scrollbar>
                <a-list-item v-for="pcakageObj in packages" :key="pcakageObj.id" action-layout="vertical">
                    <template #meta>
                        <div class="packageItemContainer">
                            <div class="packageItemTitle">
                                <a-link @click="(event) => onPackageClick(event, pcakageObj)">{{ pcakageObj.name }}</a-link>
                            </div>
                            <div class="packageItemDescription">
                                {{ pcakageObj.description }}
                            </div>
                            <div class="statusContainer">
                                <StatusIcon :title="pcakageObj.createTime" :type=releaseIcon />
                                <StatusIcon :title="pcakageObj.updateTime" :type=updateIcon />
                                <StatusIcon :title="pcakageObj.votes" :type=likeIcon />
                                <StatusIcon :title="pcakageObj.downloads" :type=downloadIcon />
                            </div>
                        </div>
                    </template>
                </a-list-item>
            </a-list>
        </div>
        <div class="paginationContainer">
            <a-pagination :total="dataCount" v-model:current="pageIndex" :page-size="pageSize" size="small" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRouter } from "vue-router";
import { Message } from '@arco-design/web-vue';
import { DynamoPackage } from "@models/DynamoPackage";
import { getPackagesPageFetch, orderOptions } from '@/services/packageService';
import { releaseIcon, downloadIcon, likeIcon, updateIcon } from "@assets/iconfont";
import StatusIcon from "@components/StatusIcon.vue";


const props = defineProps<{
    keyword?: string
}>()

const currentOrderOption = ref<string>(orderOptions[0].value);
const pageIndex = ref<number>(1);
const pageSize: number = 20;
const dataCount = ref<number>(0);
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
        Message.error("网络请求错误:", error.message)
    });
}

function onPackageClick(event: MouseEvent, pcakageObj: DynamoPackage) {
    router.push({
        name: 'packageDetail',
        params: {
            id: pcakageObj.id
        }
    })
    event.preventDefault();
}

watch(currentOrderOption, () => {
    getPackages(props.keyword, pageIndex.value, pageSize, currentOrderOption.value);
})

watch(pageIndex, (newPageIndex) => {
    getPackages(props.keyword, newPageIndex, pageSize, currentOrderOption.value);
})

watch(props, (newValue) => {
    getPackages(newValue.keyword, 1, pageSize);
})

onMounted(() => {
    getPackages(props.keyword);
})


</script>

<style scoped>
.rootContainer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
}

.orderOptionContainer {
    margin-top: 1em;
    height: fit-content;
    width: 320px;
}

.listContainer {
    margin-top: 1em;
    height: 800px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    min-height: 320px;
    width: 100%;
}

.paginationContainer {
    margin-top: 1em;
    height: 28px;
    width: 100%;
}

.packageItemContainer {
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: start;
}

.packageItemTitle {
    height: fit-content;
}

.statusContainer {
    margin-top: 1em;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 1em;
}

.packageItemDescription {
    flex: 1;
    margin-top: 12px;
}
</style>