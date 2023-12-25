<script setup lang="ts">
    import Profile from "@/components/profile/Profile.vue";
</script>

<template>
    <Profile>
        <template #main>
            <router-view />
        </template>
    </Profile>
</template>
<style lang="scss"></style>
