<template>
    <a-tree :data="categories" :field-names="fieldNames" v-model:selected-keys=selectedKeys
        v-model:expanded-keys=expandedKeys ref="tree" @select="OnCategorySelect" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Message, Tree } from "@arco-design/web-vue";
import { useRouter, useRoute } from "vue-router";
import { FamilyCategory } from '@/models/Family';

class TreeFieldNames {
    constructor(title: string, key: string) {
        this.title = title;
        this.key = key;
    }
    title: string;
    key: string;
}

const route = useRoute();
const fieldNames: TreeFieldNames = new TreeFieldNames('name', 'id')
const router = useRouter();
const categories = ref<FamilyCategory[]>([]);
const selectedKeys = ref<(string | number)[]>([29]);
const expandedKeys = ref<(string | number)[]>([1, 6]);
const tree = ref<InstanceType<typeof Tree> | null>(null)


function OnCategorySelect(keys: (string | number)[], data: any): void {
    const selectedCategory: FamilyCategory = data.selectedNodes[0];
    if (route.name === 'families') {
        pushToSearch(selectedCategory.id)
    }
    else {
        //in search route
        var keyword = route.query['keyword']
        if (keyword != undefined) {
            pushToSearch(selectedCategory.id, keyword.toString())
        }
        else {
            pushToSearch(selectedCategory.id)
        }
    }
}

function pushToSearch(categoryId?: number | string, keyword?: string, sort: string = 'name'): void {
    router.push({
        name: 'familySearch',
        query: {
            categoryId: categoryId,
            keyword: keyword,
            sort: sort
        }
    })
}

onMounted(() => {
    
})

</script>

<style scoped lang="scss"></style>