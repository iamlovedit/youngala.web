<template>
    <Content>
        <div class="loginContainer">
            <div class="fromContainer">
                <a-form :model="userData">
                    <a-form-item>
                        <a-link href="register">还没账号?立即注册</a-link>
                    </a-form-item>
                    <a-form-item field="username" :required="true">
                        <a-input v-model="userData.username" placeholder="请输入账号">
                        </a-input>
                        <template #label>
                            <icon-user :size="20" />
                        </template>
                    </a-form-item>
                    <a-form-item field="password" label="密码" :required="true">
                        <template #label>
                            <icon-lock :size="20" />
                        </template>
                        <a-input v-model="userData.password" placeholder="请输入密码" />
                    </a-form-item>
                    <a-form-item>
                        <a-button html-type="submit">登录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </Content>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Content from '@components/layout/content/Index.vue';
import UserData from '@/models/UserData';

const userData = ref<UserData>({
    username: '',
    password: '',
})
</script>
<style scoped lang="scss">
.loginContainer {
    height: 100%;
    width: 100%;
    margin: $Global-MainContent-Margin;
    padding: $Global-MainContent-Padding;
    display: flex;
    flex-wrap: nowrap;

    .fromContainer {
        height: 100%;
        width: 400px;
    }
}
</style>