<template>
    <div class="familiesContainer">
        <div class="listContainer">
            <a-list :data="families">
                <template #Item>

                </template>
            </a-list>
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



const router = useRouter();
const route = useRoute();
const pageIndex = ref<number>(1);
const pageSize = 20;
const dataCount = ref<number>(0);
const families = ref<Family[]>()

onMounted(() => {

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
    flex: 1;
    width: 100%;
}

.paginationContainer {
    width: 320px;
}
</style>