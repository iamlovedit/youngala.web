<template>
    <div class="registerContainer">
        <a-tree :data="treeData" :default-expanded-keys="['0-0-0']" :default-selected-keys="['0-0-0', '0-0-1']" />
    </div>
</template>
<script setup lang="ts">
const treeData = [
    {
        title: 'Trunk 0-0',
        key: '0-0',
        children: [
            {
                title: 'Branch 0-0-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'Leaf',
                        key: '0-0-0-0',
                    },
                    {
                        title: 'Leaf',
                        key: '0-0-0-1',
                    }
                ]
            },
            {
                title: 'Branch 0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'Leaf',
                        key: '0-0-1-0',
                    },
                ]
            },
        ],
    },
];

</script>

<style scoped>
.registerContainer {
    width: 100%;
    margin: 0 auto;
    height: 100;
}
</style>