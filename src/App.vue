<template>
    <div class="rootContainer">
        <div class="headerContainer">
            <a-menu mode="horizontal" style="height: 100%;" :selected-keys=currentRoute accordion
                @menu-item-click="onMenuItemClick">
                <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
                    <div :style="{
                        width: '80px',
                        height: '30px',
                        borderRadius: '2px',
                        background: 'var(--color-fill-3)',
                        cursor: 'text',
                    }" />
                </a-menu-item>
                <a-menu-item key="home">主 页</a-menu-item>
                <a-menu-item key="families">族 库</a-menu-item>
                <a-menu-item key="packages">节 点 包</a-menu-item>
            </a-menu>
            <div class="headerRightContainer">
                <a-button type="text" @click="onLoginClick">登 录</a-button>
                <a-button type="text" @click="onRegisterClick">注 册</a-button>
            </div>
        </div>
        <div class=" contentContainer">
            <RouterView />
        </div>
        <div class="footContainer">
            蜀ICP备2022029729号-1
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const currentRoute = computed<Array<string>>(() => {
    return new Array<string>(route.name as string);
})

function onMenuItemClick(key: string) {
    router.push({
        name: key
    })
}

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


<style scoped>
.rootContainer {
    margin: 0;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
}

.headerContainer {
    height: 60px;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.headerRightContainer {
    height: inherit;
    width: 200px;
    margin-right: 20px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.contentContainer {
    width: 100%;
    flex: 1;
    display: flex;
    background-color: lightblue;
}

.footContainer {
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
}
</style>
