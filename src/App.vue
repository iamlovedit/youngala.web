<template>
    <div class="rootContainer">
        <div class="headerContainer">
            <a-menu mode="horizontal" style="height: 100%;" v-model:selected-keys=currentRoute accordion
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
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
}

.headerContainer {
    width: 100%;
    height: 64px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom: #f7f8fa 2px solid;
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

.contentContainer {
    width: 80%;
    margin: 2em auto;
    flex: 1;
    display: flex;
}

.footContainer {
    background-color: #f7f8fa;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
}
</style>
