<script lang="ts" setup>
import CONST, { DEFAULT, AppConstant } from "@/const/";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { Field, ErrorMessage, useForm } from "vee-validate";
import { useUserStore } from "@/stores/employee";
import FooterCommon from "@/components/common/FooterCommon.vue";
const storeUser = useUserStore();
const { t } = useI18n();
const currentRoute = useRoute();
const emit = defineEmits(["submit", "cancel"]);
const isCreate = currentRoute.path.search("create") >= 0;
const schema = yup.object({
    employeename: yup
    .string()
    .trim()
    .required(t('message.required'))
    .max(100, t('message.maxLength100')),
  email: yup
    .string()
    .trim()
    .required(t('message.required'))
    .matches(CONST.REGEX_EMAIL,t('message.emailInvalid'))
    .max(100, t('message.maxLength100')),

  password: yup.lazy((value) => {
    if (isCreate) {
      return yup
        .string()
        .required(t('message.required'))
        .matches(CONST.REGEX_PASSWORD, t('message.passwordInvalid'));
    }
    return yup.mixed().notRequired();
  }),
});

const {resetForm, values, errors, validate } = useForm({
  validationSchema: schema,
});

const handleResetForm = () => {
  resetForm({
    values: {
        email: '',
        phone: '',
        employeename: '',
        employeeid : '',
        role: DEFAULT.USER_ROLE[0].value,
        password:'',
      },
  });
};

const handleSubmit = async () => {
  if ((await validate()).valid) {
    emit("submit");
  };
};
const handleBack = async () => {
  emit("cancel");
};

defineExpose({
  handleResetForm,
});

</script>
<template>
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
            v-model="storeUser.getFormUser.employeename"
          >
            <div class="p-inputgroup">
              <InputText
                class="w-full"
                :placeholder="t('employee.employee_name')"
                v-bind="field"
                :modelValue="value"
                disabled="true"
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
            v-model="storeUser.getFormUser.email"
          
          >
            <div class="p-inputgroup">
              <InputText
                class="w-full"
                :placeholder="t('user.emailAdress')"
                v-bind="field"
                :modelValue="value"
                disabled="true"
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
            v-model="storeUser.getFormUser.employeeid"
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
            v-model="storeUser.getFormUser.phone"
          >
            <div class="p-inputgroup">
              <InputText
                class="w-full"
                :placeholder="t('employee.phone')"
                v-bind="field"
                :modelValue="value"
                disabled="true"
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
                  v-model="storeUser.getFormUser.role"
                >
                  <label class="cursor-pointer flex align-items-center">
                    <RadioButton
                      v-bind="field"
                      :value="ele.value"
                      :modelValue="value"
                      disabled="true"
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
                  v-model="storeUser.getFormUser.status"
                >
                  <label class="cursor-pointer flex align-items-center">
                    <RadioButton
                      v-bind="field"
                      :value="ele.value"
                      :modelValue="value"
                      disabled="true"
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
  <!-- <FooterCommon
    :labelSubmit="t('common.register')"
    :labelCancel="t('common.back')"
    :submit="handleSubmit"
    :cancel="handleBack"
  /> -->
</template>
<style scoped>
  .layout-wrapper .p-error{
    padding: 0.75rem 0rem;
  }
</style>