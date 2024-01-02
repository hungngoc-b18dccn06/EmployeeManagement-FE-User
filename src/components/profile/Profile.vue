<script lang="ts" setup>
import TitleCommon from '@/components/common/TitleCommon.vue'
import CONST, { DEFAULT, AppConstant } from '@/const/'
import FooterCommon from "@/components/common/FooterCommon.vue";
import Popup from '@/components/common/PopupConfirm.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { useUserStore } from '@/stores/employee'
import PAGE_ROUTE from '@/const/pageRoute'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const storeUser = useUserStore()
const modal = ref<InstanceType<typeof Popup> | null>(null)
const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const schema = yup.object({
  employeeid: yup
    .string()
    .trim()
    .required(t('message.required'))
    .max(100, t('message.maxLength100')),
  employeename: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, t('message.namePattern'))
    .required(t('message.nameRequired')),
  phone: yup
    .string()
    .trim()
    .matches(/^\S*$/, 'Phone cannot contain spaces')
    .matches(/^[0-9]+$/, t('message.phonePattern'))
    .required(t('message.phoneRequired')),

  email: yup
    .string()
    .trim()
    .required(t('message.required'))
    .email(t('message.emailInvalid'))
    .max(100, t('message.maxLength100'))
})

const { errors, validate } = useForm({
  validationSchema: schema
})
const handleSubmit = () =>{
  modal.value?.open()
}
const updateProfile = async () => {
  try {
    closeModal()
    const res = await storeUser.updateProfile(storeUser.getProfile)
    console.log(res)
    toast.add({
      group: 'message',
      severity: 'success',
      summary: res.data,
      life: CONST.TIME_DELAY,
      closable: false
    })
    storeUser.getProfileDetail()

    router.push({ path: PAGE_ROUTE.USER_LIST })
  } catch (e: any) {
    closeModal()
  }
}
onMounted(() => {
    storeUser.getProfileDetail();
})

const closeModal = () => {
  modal.value?.close()
}
</script>
<template>
  <diV>
    <TitleCommon :title="t('page.updateProfile')" />
    <div class="p-4 bg-white border-round-2xl grid mx-0">
    <div class="col-10">
      <div class="grid mt-3">
        <div class="title-card col-4">
          <label class="title-field mt-2 required">{{t('employee.employee_name')}}</label>
        </div>
        <div class="col-4">
          <label class="d-block mb-1 font-weight-bold">{{t('employee.employee_name')}}</label>
          <Field
            :class="{ 'is-invalid': errors.employeename }"
            name="employeename"
            v-slot="{ field, value }"
            v-model="storeUser.getProfile.employeename"
          >
            <div class="p-inputgroup">
              <InputText
                class="w-full"
                :placeholder="t('employee.employee_name')"
                v-bind="field"
                :modelValue="value"
              />
            </div>
            <ErrorMessage class="subtext p-error absolute pt-1" name="employeename" />
          </Field>
        </div>
      </div>
      <div class="grid mt-6">
        <div class="title-card col-4">
          <label class="title-field inline-block mt-2 required">{{ t('user.emailAdress') }}</label>
        </div>
        <div class="col-8">
          <Field
            :class="{ 'is-invalid': errors.email }"
            name="email"
            v-slot="{ field, value }"
            v-model="storeUser.getProfile.email"
          >
            <div class="p-inputgroup">
              <InputText
                class="w-full"
                :placeholder="t('user.emailAdress')"
                v-bind="field"
                :modelValue="value"
              />
            </div>
            <ErrorMessage class="subtext p-error absolute pt-1" name="email" />
          </Field>
        </div>
      </div>
      <div class="grid mt-6">
        <div class="title-card col-4">
          <label class="title-field inline-block mt-2 required">{{ t('employee.employeeid') }}</label>
        </div>
        <div class="col-8">
          <Field
            :class="{ 'is-invalid': errors.employeeid }"
            name="employeeid"
            v-slot="{ field, value }"
            v-model="storeUser.getProfile.employeeid"
          >
            <div class="p-inputgroup">
              <InputText
                class="w-full"
                :placeholder="t('employee.employeeid')"
                v-bind="field"
                :modelValue="value"
                disabled="true"
              />
            </div>
            <ErrorMessage class="subtext p-error absolute pt-1" name="employeeid" />
          </Field>
        </div>
      </div>
      <div class="grid mt-6">
        <div class="title-card col-4">
          <label class="title-field inline-block mt-2 required">{{ t('employee.phone') }}</label>
        </div>
        <div class="col-8">
          <Field
            :class="{ 'is-invalid': errors.phone }"
            name="phone"
            v-slot="{ field, value }"
            v-model="storeUser.getProfile.phone"
          >
            <div class="p-inputgroup">
              <InputText
                class="w-full"
                :placeholder="t('employee.phone')"
                v-bind="field"
                :modelValue="value"
              />
            </div>
            <ErrorMessage class="subtext p-error absolute pt-1" name="phone" />
          </Field>
        </div>
      </div>
      <div class="grid mt-6">
        <div class="title-card col-4">
          <label class="title-field">{{ t('employee.role') }}</label>
        </div>
        <div class="col-8">
          <div class="grid">
            <div
              class="col-12 pl-0"
              v-for="(ele, i) in DEFAULT.USER_ROLE"
              :key="i"
            >
              <div class="field-radiobutton mb-1">
                <Field
                  name="role"
                  v-slot="{ field, value }"
                  v-model="storeUser.getProfile.role"
                >
                  <label class="cursor-pointer flex align-items-center">
                    <RadioButton
                      v-bind="field"
                      :value="ele.value"
                      :modelValue="value"
                
                    />
                    <span class="px-2">{{ ele.label }}</span>
                  </label>
                </Field>
              </div>
            </div>
            <ErrorMessage class="subtext p-error absolute pt-1" name="is_valid" />
          </div>
        </div>
      </div>
      <div class="grid mt-6">
        <div class="title-card col-4">
          <label class="title-field">{{ t('employee.status') }}</label>
        </div>
        <div class="col-8">
          <div class="grid">
            <div
              class="col-12 pl-0"
              v-for="(ele, i) in DEFAULT.STATUS_ITEM"
              :key="i"
            >
              <div class="field-radiobutton mb-1">
                <Field
                  name="status"
                  v-slot="{ field, value }"
                  v-model="storeUser.getProfile.status"
                >
                  <label class="cursor-pointer flex align-items-center">
                    <RadioButton
                      v-bind="field"
                      :value="ele.value"
                      :modelValue="value"
                    />
                    <span class="px-2">{{ ele.label }}</span>
                  </label>
                </Field>
              </div>
            </div>
            <ErrorMessage class="subtext p-error absolute pt-1" name="is_valid" />
          </div>
        </div>
      </div>
    </div>
  </div>
    <Popup
      ref="modal"
      :labelCancel="t('common.no')"
      :labelOk="t('common.yes')"
      :header="t('common.confirm')"
      :content="t('common.popupConfirmSaveContent')"
      :ok="updateProfile"
      :cancel="closeModal"
    ></Popup>
  </diV>
  <FooterCommon
    :labelSubmit="t('common.register')"
    :labelCancel="t('common.back')"
    :submit="handleSubmit"
    :cancel="handleBack"
  />
</template>
<style scoped>
.layout-wrapper .p-error {
  padding: 0.75rem 0rem;
}
</style>