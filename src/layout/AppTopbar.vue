<template>
  <div class="layout-topbar">
    <div class="layout-content">
      <div class="flex justify-content-start align-items-center flex-1">
        <div>
          <Button
            @click="toggleSidebar"
            class="p-button-text p-button-rounded shadow-none ml-3"
            icon="pi pi-bars"
          />
        </div>
      </div>
      <div class="flex justify-content-end align-items-center flex-1 pr-4">
        <div class="relative">
          <div class="card flex justify-content-center header-profile">
            <div class="header-cart">
              <div @click="showDropdown = !showDropdown" class="img-language-container">
                <img
                  :src="selectedLanguage.imgSrc"
                  alt=""
                  class="img-language"
                  style="height: 30px; width: 35px;margin-top: 5px;"
                />
              </div>
              <div class="drop-multil-language">
                <Dropdown
                v-if="showDropdown"
                
                v-model="selectedLanguage"
                :options="OPTION_LANGUAGE"
                option-label="label"
                @change="changeLanguage(selectedLanguage.value)"
              >
                <template #option="{ option }">
                  <img
                    :src="option.imgSrc"
                    alt=""
                    class="img-language"
                    style="height: 25px; width: 40px"
                  />
                  {{ option.label }}
                </template>
              </Dropdown>
              </div>
              
              <div class="badges cart-order">
                <i
                  badge="2"
                  class="pi pi-shopping-cart p-overlay-badge"
                  @click="toggleAlt"
                  style="font-size: 2rem"
                />

                <Badge :value="totalQuantity" class="mr-2" severity="danger"></Badge>
                <OverlayPanel ref="op">
                  <div
                    id="list-box"
                    ref="cartList"
                    class="h-full max-w-bd-sm mx-auto relative overflow-auto"
                  >
                    <ul class="px-2 pt-20" v-if="totalQuantity > 0">
                      <li
                        v-for="item of storeCart.getCart"
                        :key="item.cartItemId"
                        class="text-secondary mb-4"
                      >
                        <div
                          class="flex text-sm text-secondary dark:text-white font-mont font-bold"
                        >
                          <img
                            :src="'http://localhost:8085/api/product/images/' + item.productImage"
                            :alt="item.productImage"
                            class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                          />
                          <div class="mb-2">
                            <span class="font-bold"
                              >{{ t('product.productName') }} : {{ item.productName }}</span
                            ><br />
                            <span class="font-bold"
                              >{{ t('product.quantity') }}: {{ item.quantity }}</span
                            ><br />
                            <span class="font-bold"
                              >{{ t('product.totalprice') }}::
                              {{ item.productPrice * item.quantity }} $</span
                            >
                          </div>
                        </div>
                      </li>
                    </ul>
                    <span v-else>{{ t('product.noAmount') }}</span>
                  </div>
                  <Button class="go_order" @click="goToOrder()"
                    >{{ t('label.goToOrder') }}<i class="pi pi-fast-forward ml-2"></i
                  ></Button>
                </OverlayPanel>
              </div>
              
            </div>
            <Button
              type="button"
              icon="pi pi-user mr-2"
              :label="userStore.getName ?? ''"
              @click="toggle"
              class="p-button-text shadow-none"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
          </div>
          <Menu
            id="overlay_menu"
            class="topbar-user-menu"
            ref="menu"
            :model="items"
            :popup="true"
            appendTo="self"
          />
        </div>
      </div>
    </div>
    <Popup
      ref="modal"
      :labelCancel="t('common.no')"
      :labelOk="t('common.yes')"
      :content="t('user.confirmLogout')"
      :ok="logout"
      :cancel="closeModal"
      :header="t('user.headerConfirmLogout')"
    >
    </Popup>
  </div>
</template>

<script setup lang="ts">
import Badge from 'primevue/badge'
import OverlayPanel from 'primevue/overlaypanel'
import kor from '@/assets/img/kornew.png'
import en from '@/assets/img/en8.png'
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Popup from '@/components/PopupConfirm.vue'
import api from '@/api'
import { useToast } from 'primevue/usetoast'
import { ApiConstant } from '@/const'
import { useCartItemStore } from '@/stores/cart'
import PAGE_ROUTE from '@/const/pageRoute'
import router from '@/router'
import { useUserStore } from '@/stores/employee'
import CONST, { AppConstant, DEFAULT } from '@/const'
import i18n from '@/i18n/index'
const emit = defineEmits(['toggleSidebar'])
const toast = useToast()
const menu = ref()
const selectedLanguage = ref({ label: '한국어', imgSrc: kor, value: 'kor' })
const { t } = useI18n()
const userStore = useUserStore()
const toggleSidebar = () => {
  emit('toggleSidebar')
}
const op = ref()
const totalQuantity = ref()
const OPTION_LANGUAGE = [
  { label: '한국어', value: 'kor', imgSrc: kor },
  { label: 'English', value: 'en', imgSrc: en }
]

const showDropdown = ref(false)
const toggle = (event: any) => {
  menu.value.toggle(event)
}
const toggleAlt = (event : any) => {
  op.value.toggle(event)
}
const changeLanguage = (e: any) => {
  i18n.global.locale.value = e
  console.log(e)
}
const modal = ref<InstanceType<typeof Popup> | null>(null)
const openModal = () => {
  modal.value?.open()
}
const editProfile = () => {
  console.log(userStore.getProfile)
  router.push(`/profile`)
}
const goToOrder = () =>{
  router.push(`/order_detail`);
  op.value.hide();
  
}
const storeCart = useCartItemStore()
const cart = storeCart.getCart;
const items = ref([
  {
    items: [
      {
        label: t('menu.editProfile'),
        icon: 'pi pi-user-edit mr-2',
        command: editProfile
      },
      {
        label: t('menu.logout'),
        icon: 'pi pi-sign-out mr-2',
        command: openModal
      }
    ]
  }
])
const logout = async () => {
  try {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: 'Message Content',
      life: 10000
    })
    await api.post(ApiConstant.LOGOUT)
    localStorage.clear()
    sessionStorage.clear()
    userStore.$reset()
    modal.value?.close()
    router.replace(PAGE_ROUTE.LOGIN)
  } catch (e) {
    console.log(e)
  }
}
const back = () => {
  router.back()
}
watch(
  () => storeCart.getCart,
  () => {
    calculateTotalQuantity()
  },
  { deep: true }
)

function calculateTotalQuantity() {
  totalQuantity.value = storeCart.getCart.reduce((total, item) => total + item.quantity, 0)
}
onMounted(() => {
  const token = localStorage.getItem('access_token')
  if (token != '') {
    userStore.getProfileDetail()
    storeCart.getListCart()
  }
})
</script>
<style lang="scss" scoped>
.header-profile {
  gap: 10px;
}
.img-language {
  vertical-align: middle;
  margin-right: 5px;
  cursor: pointer;
}

.img-language-container {
  display: inline-block;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 10px;
}
img.img-language {
  width: 30px;
  height: 30px;
}
.p-selectbutton.p-buttonset.p-component {
  border: 1px solid #2b9dca;
  border-radius: 7px;
}
.layout-topbar {
  position: fixed;
  height: var(--topbar-height);
  z-index: 997;
  top: 0;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  padding: 0;
  background-color: var(--surface-card);
  transition: left 0.2s;
  display: flex;
  align-items: center;
  box-shadow:
    0px 3px 5px rgba(0, 0, 0, 0.02),
    0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);

  :deep(.layout-content) {
    width: 100%;
    height: 5rem;
    display: flex;

    .p-button-label {
      font-weight: 400;
    }
    .p-button.p-component.p-highlight {
      background: #fff;
      color: black;
    }
  }
}

.flex.justify-content-start.flex-1 {
  flex: 1 1 0% !important;
}

.flex.justify-content-end.align-items-center.flex-1.pr-4 {
  flex: 1 1 0% !important;
  padding-right: 1.5rem !important;
  align-items: center !important;
  justify-content: flex-end !important;
  display: flex;
}
button.p-button.p-component.p-button-icon-only.p-button-text.shadow-none {
  background: #fff;
}

.p-selectbutton.p-buttonset.p-component .p-button {
  background: #fff !important;
  color: #fff;
}
button.p-button.p-component.p-button-icon-only.p-button-text.p-button-rounded.shadow-none.ml-3 {
  color: black;
}
button.p-button.p-component.p-button-text.shadow-none {
  color: #fff;
}
.header-cart {
    display: flex;
    gap: 10px;
}
div#list-box {
    max-height: 520px;
}
span.p-dropdown-label.p-inputtext {
    padding: 8px !important;
}
</style>
