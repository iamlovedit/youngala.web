<template>
    <div class="headerContianer">
        <div class="headerLeftContianer">
            <Menu />
        </div>
        <div class="headerRightContainer">
            <a-button type="text" @click="onLoginClick">登 录</a-button>
            <a-button type="text" @click="onRegisterClick">注 册</a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from "@components/layout/menu/Index.vue";
import { useRouter } from 'vue-router';

const router = useRouter();

function onLoginClick() {
    router.push({
        name: 'login'
    })
}

function onRegisterClick() {
    router.push({
        name: 'register'
    })
}
</script>

<style scoped lang="scss">
.headerContianer {
    width: 100%;
    height: 64px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

    .headerLeftContianer {
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 1em;
        flex: 1;
    }

    .headerRightContainer {
        height: inherit;
        width: 200px;
        margin-right: 1em;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>