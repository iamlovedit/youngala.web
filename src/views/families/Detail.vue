<template>
    <div class="rootContainer">
        <a-page-header :style="{ background: 'var(--color-bg-2)' }" title="族详情" subtitle="ArcoDesign Vue 2.0"
            @back="$router.back()" />
        <div class="canvas">

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { getFamilyDetailFetch } from '@/services/familyService'
import { Family } from '@models/Family'
const family = ref<Family>()

function getfamilyDetails(id: number) {
    getFamilyDetailFetch(id).
        then((response) => {
            if (response.success) {
                family.value = response.response
            }
            else {
                Message.error(response.message)
            }
        }).
        catch((error) => {
            Message.error(`网络请求错误: ${error.message}`)
        })
}
onMounted(() => {
    getfamilyDetails(1)
})
</script>

<style scoped lang="scss">
.rootContainer {
    width: 60%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: start;
    padding: 2em 0;

    .canvas {
        width: 100%;
        flex: 1;
        background-color: aqua;
    }
}
</style>