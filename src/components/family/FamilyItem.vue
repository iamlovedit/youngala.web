<template>
    <div class="familyItemContianer">
        <a-image :src="props.family.imageUrl" height="200" width="220" fit="cover" :preview="false" />
        <div class="nameContianer">
            <a-link icon @click.prevent="onFamilyClick">
                {{ props.family.name }}
            </a-link>
        </div>
        <div class="statusContainer">
            <icon-star :size="20" />
            <icon-qq-circle-fill :size="20" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Family } from '@/models/Family';
interface props {
    family: Family
}

const props = defineProps<props>()
const router = useRouter();


function onFamilyClick() {
    const url = router.resolve({ name: 'familyDetail', params: { id: props.family.id } }).href;
    window.open(url, '_blank');
}

</script>

<style scoped>
.familyItemContianer {
    width: 220px;
    height: 280px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    gap: 6px;
    border: 1px solid lightgray;
    align-items: center;
    justify-content: flex-start;
}

.familyItemContianer:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.nameContianer {
    height: fit-content;
    width: 90%;
    margin: 0 auto;
}

.statusContainer {
    height: fit-content;
    width: 90%;
    margin: 1em auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
}
</style>