<script setup lang="ts">
    import ListEmployee from "../../components/employee/List.vue"
</script>

<template>
    <ListEmployee>
        <template #main>
            <router-view />
        </template>
    </ListEmployee>
</template>
<style lang="scss"></style>
