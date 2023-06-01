<template>
    <div class="mainContianer" v-tooltip="{ content: props.title }">
        <icon-font :type="props.type" :size=props.size />
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
    title: string | number | undefined,
    size: number | undefined,
    type: string | undefined
}

const props = withDefaults(defineProps<Props>(), {
    title: undefined,
    size: 16,
    type: undefined
})
const IconFont = Icon.addFromIconFontCn({ src: src });
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