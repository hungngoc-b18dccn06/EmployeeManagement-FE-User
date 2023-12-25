<script setup lang="ts">
    import Detail from "@/components/employee/Detail.vue";
</script>

<template>
    <Detail>
        <template #main>
            <router-view />
        </template>
    </Detail>
</template>
<style lang="scss"></style>
