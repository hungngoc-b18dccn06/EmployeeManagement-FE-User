<template>
    <div>
        <TitleCommon :title="t('page.userUpdate')" />
        <FormInfo @submit="handleSubmit" @cancel="handleBack"/>
        <Popup
            ref="modal"
            :labelCancel="t('common.no')"
            :labelOk="t('common.yes')"
            :header="t('common.confirm')"
            :content="t('common.popupConfirmSaveContent')"
            :ok="updateUser"
            :cancel="closeModal"
        ></Popup>
    </div>
</template>
<script setup lang="ts">
    import TitleCommon from "@/components/common/TitleCommon.vue";
    import FormInfo from '@/components/employee/FormInfo.vue'
    import {useUserStore} from "@/stores/employee";
    import CONST, {DEFAULT} from "@/const";
    import PAGE_ROUTE from "@/const/pageRoute";
    import {useToast} from "primevue/usetoast";
    import {onMounted, ref} from "vue";
    import Popup from "@/components/PopupConfirm.vue";
    import {useRoute, useRouter} from 'vue-router';
    import { useI18n } from "vue-i18n";

    const { t } = useI18n();
    const storeUser = useUserStore();
    const toast = useToast();
    const modal = ref<InstanceType<typeof Popup> | null>(null);
    const currentRoute = useRoute();
    const router = useRouter();

    const idUser = Number(currentRoute.params.id);

    onMounted(async () => {
        await storeUser.getUserDetail(idUser);
    });
    const handleSubmit = () => {
        modal.value?.open();
    };
    const handleBack = () => {
        router.push({path: PAGE_ROUTE.EMPLOYEE_LIST})
    };
    const closeModal = () => {
        modal.value?.close();
    };
    
</script>

<style>
i.pi.pi-eye-slash, i.pi.pi-eye{
    position: absolute;
    top: 15px;
}
</style>