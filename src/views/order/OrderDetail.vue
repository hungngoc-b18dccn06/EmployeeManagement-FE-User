<script setup lang="ts">
    import DetailList from "@/components/order/List.vue";
</script>

<template>
    <DetailList>
        <template #main>
            <router-view />
        </template>
    </DetailList>
</template>
<style lang="scss"></style>
