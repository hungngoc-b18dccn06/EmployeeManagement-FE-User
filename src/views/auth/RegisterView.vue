<template>
  <div>
    <Sidebar />
    <div class="login-screen">
      <div class="flex flex-column align-items-center">
        <form @submit.prevent="handleSubmitForm" autocomplete="off">
          <div class="login-form">
            <div class="mt-2 group-regist">
              <div class="flex w-full my-2 justify-content-center font-bold text-2xl">
                {{ t('page.register_page') }}
              </div>
              <div class="field field-input my-5">
                <Field name="employeeid" v-slot="{ meta: metaField, field, errorMessage }">
                  <div class="p-inputgroup common-group">
                    <div class="title-card col-4">
                      <label class="title-field mt-2 required">{{
                        t('employee.employeeid')
                      }}</label>
                    </div>
                    <InputText
                      v-bind="field"
                      :placeholder="t('employee.employeeid')"
                      type="text"
                      :class="{
                        'p-invalid': errorMessage && !metaField.valid && metaField.touched
                      }"
                      autocomplete="off"
                    />
                  </div>
                  <div class="absolute line-height-1 pt-2">
                    <small
                      v-if="errorMessage && !metaField.valid && metaField.touched"
                      class="p-error"
                      >{{ errorMessage }}</small
                    >
                  </div>
                </Field>
              </div>
              <div class="field field-input my-5">
                <Field name="email" v-slot="{ meta: metaField, field, errorMessage }">
                  <div class="p-inputgroup common-group">
                    <div class="title-card col-4">
                      <label class="title-field mt-2 required">{{ t('user.emailAdress') }}</label>
                    </div>
                    <InputText
                      v-bind="field"
                      type="text"
                      :class="{
                        'p-invalid': errorMessage && !metaField.valid && metaField.touched
                      }"
                      :placeholder="t('user.emailAdress')"
                      autocomplete="off"
                    />
                  </div>
                  <div class="absolute line-height-1 pt-2">
                    <small
                      v-if="errorMessage && !metaField.valid && metaField.touched"
                      class="p-error"
                      >{{ errorMessage }}</small
                    >
                  </div>
                </Field>
              </div>
              <div class="field-input custom-password my-5 pb-1">
                <Field name="password" v-slot="{ meta: metaField, field, errorMessage }">
                  <div class="p-inputgroup common-group">
                    <div class="title-card col-4">
                      <label class="title-field mt-2 required">{{ t('employee.password') }}</label>
                    </div>
                    <span class="p-input-icon-right w-full">
                      <InputText
                        v-bind="field"
                        :class="{'w-full p-invalid': errorMessage && !metaField.valid && metaField.touched}"
                        :placeholder="t('employee.password')"
                        aria-describedby="password-help"
                        autocomplete="current-password"
                        :type="showPass ? 'text' : 'password'"
                      />
                      <i
                        class="pi"
                        :class="{ 'pi-eye': showPass, 'pi-eye-slash': !showPass }"
                        @click="showPass = !showPass"
                      ></i>
                    </span>
                  </div>
                  <div class="absolute line-height-1 pt-2">
                    <small
                      v-if="errorMessage && !metaField.valid && metaField.touched"
                      class="p-error"
                      >{{ errorMessage }}</small
                    >
                  </div>
                </Field>
              </div>
              <div class="field-input custom-password my-5 pb-1">
                <Field name="password_confirm" v-slot="{ meta: metaField, field, errorMessage }">
                  <div class="p-inputgroup common-group">
                    <div class="title-card col-4">
                      <label class="title-field mt-2 required">{{ t('employee.password') }}</label>
                    </div>
                    <span class="p-input-icon-right w-full">
                      <InputText
                        v-bind="field"
                        :class="{'w-full p-invalid': errorMessage && !metaField.valid && metaField.touched}"
                        :placeholder="t('employee.password_confirm')"
                        aria-describedby="password-help"
                        autocomplete="current-password"
                        :type="showConfirmPass ? 'text' : 'password'"
                      />
                      <i
                        class="pi"
                        :class="{ 'pi-eye': showConfirmPass, 'pi-eye-slash': !showConfirmPass }"
                        @click="showConfirmPass = !showConfirmPass"
                      ></i>
                    </span>
                  </div>
                  <div class="absolute line-height-1 pt-2">
                    <small
                      v-if="errorMessage && !metaField.valid && metaField.touched"
                      class="p-error"
                      >{{ errorMessage }}</small
                    >
                  </div>
                </Field>
              </div>

              <div class="field field-input my-5">
                <Field name="employeename" v-slot="{ meta: metaField, field, errorMessage }">
                  <div class="p-inputgroup common-group">
                    <div class="title-card col-4">
                      <label class="title-field mt-2 required">{{
                        t('employee.employee_name')
                      }}</label>
                    </div>
                    <InputText
                      v-bind="field"
                      type="text"
                      :class="{
                        'p-invalid': errorMessage && !metaField.valid && metaField.touched
                      }"
                      :placeholder="t('employee.employee_name')"
                      autocomplete="off"
                    />
                  </div>
                  <div class="absolute line-height-1 pt-2">
                    <small
                      v-if="errorMessage && !metaField.valid && metaField.touched"
                      class="p-error"
                      >{{ errorMessage }}</small
                    >
                  </div>
                </Field>
              </div>

              <div class="field field-input my-5">
                <Field name="phone" v-slot="{ meta: metaField, field, errorMessage }">
                  <div class="p-inputgroup common-group">
                    <div class="title-card col-4">
                      <label class="title-field mt-2 required">{{ t('user.phone') }}</label>
                    </div>
                    <InputText
                      v-bind="field"
                      type="text"
                      :class="{
                        'p-invalid': errorMessage && !metaField.valid && metaField.touched
                      }"
                      :placeholder="t('user.phone')"
                      autocomplete="off"
                    />
                  </div>
                  <div class="absolute line-height-1 pt-2">
                    <small
                      v-if="errorMessage && !metaField.valid && metaField.touched"
                      class="p-error"
                      >{{ errorMessage }}</small
                    >
                  </div>
                </Field>
              </div>
            </div>
            <div class="flex flex-column align-items-center gap-2 footer mt-2 pb-1">
              <Button
                :disabled="state.loading"
                :label="t('label.regist_new_mem')"
                class="btn-submit w-full mb-2 p-0"
                type="submit"
              />
              <Toast></Toast>
              <router-link :to="PAGE_ROUTE.LOGIN" class="text-color underline font-semibold mt-4">{{
                t('label.back_login')
              }}</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api'
import Popup from '@/components/PopupConfirm.vue'
import Sidebar from '@/layout/AuthSidebar.vue'
import CONST, { ACCESS_TOKEN, ApiConstant } from '@/const'
import type { RequestRegist } from '@/const/api.const'
import PAGE_ROUTE from '@/const/pageRoute'
import type { AxiosResponse } from 'axios'
import { useToast } from 'primevue/usetoast'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Field, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import Toast from 'primevue/toast'
const router = useRouter()
const state = reactive({
  loading: false
})
const modal = ref<InstanceType<typeof Popup> | null>(null)
const submitted = ref(false)
const showPass = ref(false)
const toast = useToast()
const showConfirmPass = ref(false)

const { t } = useI18n()
onMounted(() => {
  localStorage.removeItem(ACCESS_TOKEN)
})
const openModal = () => {
  modal.value?.open()
}
const schema = yup.object({
  employeeid: yup
    .string()
    .trim()
    .matches(/^\S*$/, t('message.spacevalidate'))
    .min(4, t('message.idLength'))
    .required(t('message.idRequired')),
  password: yup
    .string()
    .matches(/^[A-Za-z0-9!@#$%^&*]*$/, t('message.passwordPattern'))
    .matches(/[A-Z]/, t('message.passwordUppercase'))
    .matches(/[a-z]/, t('message.passwordLowercase'))
    .matches(/[0-9]/, t('message.passwordNumber'))
    .matches(/[!@#\$%\^&\*]/, t('message.passwordSpecialChar'))
    .test('notConsecutive', t('message.passwordConsecutive'), function (value) {
      return !/(.)\1\1\1/.test(value)
    })
    .min(10, t('message.passwordLengthMin'))
    .max(20, t('message.passwordLengthMax'))
    .required(t('message.passwordRequired')),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], t('message.passwordMatch'))
    .required(t('message.passwordRequired')),
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
    .matches(/@(naver\.com|daum\.net|gmail\.com|nate\.com|hotmail\.com)$/, t('message.emailDomain'))
    .max(100, t('message.maxLength100'))
})

const { resetForm, values, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
    phone: '',
    employeeid: '',
    employeename: '',
    password_confirm: ''
  }
})
const cleanData = (data) => {
  return Object.keys(data).reduce((acc, key) => {
    if (typeof data[key] === 'string') {
      acc[key] = data[key].trim().replace(/\s+/g, '')
    } else {
      acc[key] = data[key]
    }
    return acc
  }, {})
}

const handleSubmitForm = handleSubmit(async (data) => {
  const cleanedData = cleanData(data)
  submitted.value = true
  const user = {
    ...cleanedData
  }
  state.loading = true
  try {
    const response: AxiosResponse<RequestRegist> = await api.post(ApiConstant.REGISTER, user)
    if (response.status == 500) {
      toast.add({
        group: 'message',
        severity: 'error',
        summary: response.data,
        life: CONST.TIME_DELAY,
        closable: false
      })
    } else if (response.status === 200) {
      toast.add({
        group: 'message',
        severity: 'success',
        summary: response.data,
        life: CONST.TIME_DELAY,
        closable: false
      })
      await registSuccess()
    }
  } catch (e) {
    toast.add({
      group: 'message',
      severity: 'error',
      summary: e.response.data,
      life: CONST.TIME_DELAY,
      closable: false
    })
  } finally {
    state.loading = false
  }
})

async function registSuccess() {
  router.push('/auth/signin')
}
</script>

<style lang="scss" scoped>
.w-span {
  width: 110px;
}
.field-input {
  margin: auto;
}
.group-regist {
  width: 1000px;
}
.common-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 140%;
}
.p-inputtext {
  width: 100% !important;
}
input.p-inputtext.p-component {
  border-radius: 5px;
}
.pi-eye-slash,
i.pi.pi-eye {
  position: absolute !important;
  top: 13px !important;
}
.login-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 700px;
}

.login-form {
  min-width: 1000px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 100px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.102);
  border-radius: 10px;
}

.register {
  font-size: 16px;

  a {
    color: var(--vt-c-dark-red);
    text-decoration: none;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 10px;
  }
}

.field-input {
  min-width: 240px;
  width: 375px;
}
:deep(.p-inputtext) {
  width: var(--width-input);
  height: var(--height-input);
}
.footer {
  width: 375px;
  font-size: 16px;
  font-weight: 700;
  margin-left: 20%;
}
:deep(.p-button .p-button-label) {
  font-size: 16px;
  font-weight: 700;
}
.footer a {
  text-decoration: none;
  color: var(--vt-c-dark-red);
}
:deep(.p-divider .p-divider-content) {
  font-size: 14px;
  color: #a3bac8;
  font-weight: 400;
  line-height: 22px;
}
:deep(.p-inputgroup #password:focus) {
  z-index: 0;
}

.custom-password :deep(.p-inputgroup > .p-inputwrapper > .p-inputtext:focus) {
  z-index: unset;
}
.btn-submit,
.btn-submit:focus {
  width: 200px;
  border: none;
  border-radius: 10px;
  box-shadow: none;
  font-size: 18px;
  font-weight: 700;
  background-color: #2b9dca !important;
}

:deep(.btn-submit) {
  background-color: #2b9dca;
  p {
    font-size: 16px;
    font-weight: 700;
  }
}
.text-color {
  color: #2b9dca !important;
}
.p-invalid-icon {
  color: red;
}
:deep(.login-screen) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 700px;
}
.flex.w-full.my-2.justify-content-center.font-bold.text-2xl {
    padding-left: 15%;
    font-size: 30px !important;
}
.absolute.line-height-1.pt-2 {
    padding-left: 49%;
    width: 125%;
}
</style>
