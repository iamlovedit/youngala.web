<template>
    <div class="detailContainer">
        <div class="headContainer">
            <a-page-header :style="{ background: 'var(--color-bg-2)' }" title="返回" subtitle="版本列表" @back="onBack" />
        </div>
        <div class="versionContainer" scrollbar>
            <a-list :max-height="800" :data="versions" bordered>
                <template #item="{ item }">
                    <a-list-item action-layout="vertical" :key="item.id">
                        <template #meta>
                            <div class="itemContainer">
                                <a-link :href="`https://dynamopackages.com/download/${packageId}/${item.version}`">
                                    {{ item.version }}
                                </a-link>
                                发布时间：{{ item.createTime }}
                            </div>
                        </template>
                    </a-list-item>
                </template>
            </a-list>
        </div>
        <div class="paginationContainer">
            <a-pagination :total="dataCount" v-model:current="pageIndex" :page-size="pageSize" size="small" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Message } from '@arco-design/web-vue';
import { getPackageVersionsFetch } from '@/services/packageService';
import { PackageVersion } from "@models/DynamoPackage";



const router = useRouter();
const route = useRoute();
const versions = ref<PackageVersion[]>([]);
const dataCount = ref<number>(0);
const pageIndex = ref<number>(1);
const pageSize: number = 20;
const packageId = route.params["id"] as string

function onBack(): void {
    router.back()
}

function getPackageVersions(packageId: string, pageIndex: number = 1) {
    const promise = getPackageVersionsFetch(packageId, pageIndex);
    promise.then(httpResponse => {
        if (httpResponse.success) {
            const versionsPage = httpResponse.response;
            versions.value = versionsPage.data
            dataCount.value = versionsPage.dataCount
        }
        else {
            Message.error(httpResponse.message)
        }
    }).catch(error => {
        Message.error("网络请求错误:", error.message)
    })
}

watch(pageIndex, () => {
    getPackageVersions(packageId, pageIndex.value)
})

onMounted(() => {
    getPackageVersions(packageId)
})

</script>

<style scoped lang="scss">
.detailContainer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: start;
    width: 60%;
    height: 100%;
    margin: $Global-MainContent-Margin;
    padding: $Global-MainContent-Padding;
}

.versionContainer {
    height: fit-content;
    width: 100%;
}

.paginationContainer {
    height: fit-content;
    width: 320px;
    margin-top: 1em;
}

.itemContainer {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: start;
}
</style>