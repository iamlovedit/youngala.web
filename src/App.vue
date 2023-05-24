<template>
    <div class="rootContainer">
        <div class="headerContainer">
            <a-menu mode="horizontal" style="height: 100%;" accordion>
                <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
                    <div :style="{
                        width: '80px',
                        height: '30px',
                        borderRadius: '2px',
                        background: 'var(--color-fill-3)',
                        cursor: 'text',
                    }" />
                </a-menu-item>
                <a-menu-item key="1">主 页</a-menu-item>
                <a-menu-item key="2">族 库</a-menu-item>
                <a-menu-item key="3">节 点 包</a-menu-item>
            </a-menu>
        </div>
        <div class=" contentContainer">
            <!-- <RouterView /> -->
        </div>
        <div class="footContainer">
            蜀ICP备2022029729号-1
        </div>
    </div>
</template>

<script setup lang="ts">
// import { RouterView } from 'vue-router';


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
