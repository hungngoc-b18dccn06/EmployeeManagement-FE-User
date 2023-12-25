<script setup lang="ts">
    import ListOrder from "../../components/orderEmployee/List.vue"
</script>

<template>
    <ListOrder>
        <template #main>
            <router-view />
        </template>
    </ListOrder>
</template>
<style lang="scss"></style>
