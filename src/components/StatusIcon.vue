<template>
    <div class="mainContianer" v-tooltip="{ content: props.title }">
        <icon-font :type="props.type" :size=size />
        <div class="statusContainer">
            <p>
                {{ props.title }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@arco-design/web-vue';
import { src } from "@assets/iconfont"


interface Props {
    title: string | number,
    size?: number,
    type: string
}

const props = defineProps<Props>()
const IconFont = Icon.addFromIconFontCn({ src: src });
const size = props.size || 16
</script>

<style scoped>
.mainContianer {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 5px;
}

.statusContainer {
    flex: 1;
}

.statusContainer p {
    margin: 0;
    color: #a7a4a4;
}
</style>