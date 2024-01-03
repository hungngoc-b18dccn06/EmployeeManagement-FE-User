<script setup>
import { FilterMatchMode } from 'primevue/api'
import { ref, onMounted, onBeforeMount, watch, computed } from 'vue'
import FileUpload from 'primevue/fileupload'
import Toolbar from 'primevue/toolbar'
import { useToast } from 'primevue/usetoast'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import CONST, { AppConstant, DEFAULT } from '@/const'
import { useProductStore } from '@/stores/product'
import { useUserStore } from '@/stores/employee'
import PAGE_ROUTE from '@/const/pageRoute'
import { useI18n } from 'vue-i18n'
import { useCartItemStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import Momo from '../../assets/img/momoQR.jpg'
import Cod from '../../assets/img/cod-delivery.avif'
import { Field, useForm } from 'vee-validate'
import InputGroup from 'primevue/inputgroup'
import { useRoute, useRouter } from "vue-router";
import InputGroupAddon from 'primevue/inputgroupaddon'
import Steps from 'primevue/steps'
import * as yup from 'yup'
const storeOrder = useOrderStore()
const visible = ref(false)
const storeCart = useCartItemStore()
const storeEmployee = useUserStore()
const toast = useToast()
const { t } = useI18n()
const products = ref(null)
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref({})
const selectedProducts = ref(null)
const dt = ref(null)
const filters = ref({})
const submitted = ref(false)
const statuses = ref([
  { label: 'INSTOCK', value: 1 },
  { label: 'LOWSTOCK', value: 2 },
  { label: 'OUTOFSTOCK', value: 3 }
])
const router = useRouter();
const storeProduct = useProductStore()
const producImage = ref()
const dateOrder = ref()
onBeforeMount(() => {
  initFilters()
})

onMounted(() => {
  products.value = storeProduct.getProducts
  storeOrder.getOrders.methodPayment = selectedMethod.value
  storeProduct.getListProduct()
  storeCart.getListCart()
  storeOrder.getListOrder()
})

const openNew = () => {
  product.value = {}
  submitted.value = false
  productDialog.value = true
}

const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
}

const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 1
    case 'LOWSTOCK':
      return 2
    case 'OUTOFSTOCK':
      return 3
    default:
      return null
  }
}

const saveProduct = async () => {
  const formData = new FormData()
  formData.append('productName', product.value.productName)
  formData.append('price', product.value.price)
  formData.append('status', product.value.status.value)
  formData.append('category', product.value.category)
  formData.append('description', product.value.description)
  formData.append('quantity', product.value.quantity)
  formData.append('average_rating', 5)
  formData.append('file', producImage.value[0])
  formData.append('code', 111)

  console.log(formData)
  const res = await storeProduct.apiCreateProduct(formData)
  toast.add({
    group: 'message',
    severity: 'success',
    summary: t('notifile.addProductSuccess'),
    life: CONST.TIME_DELAY,
    closable: false
  })
  productDialog.value = false
}
const onUpload = (event) => {
  producImage.value = event.files
}
const editProduct = (editProduct) => {
  product.value = { ...editProduct }
  productDialog.value = true
}

const confirmDeleteProduct = (editProduct) => {
  product.value = editProduct
  deleteProductDialog.value = true
}

const deleteProduct = async (id) => {
  const res = await storeProduct.deleteProduct(id)
  deleteProductDialog.value = false
  product.value = {}
  toast.add({
    group: 'message',
    severity: 'success',
    summary: res.data,
    life: CONST.TIME_DELAY,
    closable: false
  })
  closeModal()
  router.push({ path: PAGE_ROUTE.USER_LIST })
}

const loading = ref(false)

const load = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
const addressToOrder = ref()
const selectedMethod = ref('momo')
const findIndexById = (id) => {
  let index = -1
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i
      break
    }
  }
  return index
}
const generateStepsModel = (status) => {
  const items = [
    { label: 'Unpaid', value: 1 },
    { label: 'To Ship', value: 2 },
    { label: 'Shipped', value: 3 },
    { label: 'To review', value: 4 }
  ]

  const activeStepIndex = items.findIndex((step) => step.value === status)

  return items.map((step, index) => ({
    ...step,
    status: index === activeStepIndex ? 'active' : 'wait'
  }))
}

const handlePayMent = () => {
  storeOrder.getOrders.methodPayment = selectedMethod.value
}
const schema = yup.object({
  address: yup.string().required(t('message.required'))
})
const { values, errors, validate, handleSubmit } = useForm({
  validationSchema: schema
})
const tapToPay = handleSubmit(async (data) => {
  storeOrder.getOrders.methodPayment = selectedMethod.value
  visible.value = true
})
const exportCSV = () => {
  dt.value.exportCSV()
}
const visibility = ref()
const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true
}
const deleteSelectedProducts = (e) => {
  products.value = products.value.filter((val) => !selectedProducts.value.includes(val))

  deleteProductsDialog.value = false
  selectedProducts.value = null
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 })
}

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }
}
const totalAmount = computed(() => {
  return storeCart.getCart.reduce((total, product) => {
    return total + product.quantity * product.productPrice
  }, 0)
})
const getCurrentDate = () => {
  const currentDate = new Date()
  return currentDate
}
const gotoShopping = () =>{
  router.push(`/`);
}
const purchaseOrder = async () => {
  storeOrder.getFormOrder.employeeId = storeEmployee.getProfile.employeeid
  storeOrder.getFormOrder.cartItemId = storeCart.getCart[0].cartItemId
  storeOrder.getFormOrder.totalPrice = totalAmount.value
  storeOrder.getFormOrder.methodPayment = selectedMethod.value
  storeOrder.getFormOrder.orderStatus = 1
  storeOrder.getFormOrder.orderDate = getCurrentDate()
  storeOrder.getFormOrder.address = storeOrder.getOrders.address
  const response = await storeOrder.apiPurchaseOrder(storeOrder.getFormOrder)
  toast.add({
    group: 'message',
    severity: 'success',
    summary: t('notifile.addCartSucceess'),
    life: CONST.TIME_DELAY,
    closable: false
  })
  visible.value = false
  storeOrder.getListOrder()
  storeCart.getListCart()
}

function mappingCartOrder() {
  const orders = storeOrder.getOrders
}
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card order-card" v-if="storeCart.getCart.length > 0">
        <Toast />
        <DataTable
          ref="dt"
          :value="storeCart.getCart"
          dataKey="id"
          :rows="10"
          :filters="filters"
          :style="{ width: '1000px' }"
          responsiveLayout="scroll"
          size="small"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h2 class="m-0">{{ t('product.order') }}</h2>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" :placeholder="t('product.search')" />
              </span>
            </div>
          </template>
          <Column
            field="productName"
            :header="t('product.productName')"
            :sortable="true"
            headerStyle="width: 100px;  text-align: center"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.productName') }}</span>
              {{ slotProps.data.productName }}
            </template>
          </Column>
          <Column :header="t('product.image')" headerStyle="width: 80px">
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.image') }}</span>
              <img
                :src="'http://localhost:8085/api/product/images/' + slotProps.data.productImage"
                :alt="slotProps.data.productImage"
                class="shadow-2"
                width="100"
              />
            </template>
          </Column>
          <Column
            field="productPrice"
            :header="t('product.price')"
            :sortable="true"
            headerStyle="width: 100px"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.price') }}</span>
              {{ slotProps.data.productPrice }}
            </template>
          </Column>
          <Column
            field="quantity"
            :header="t('product.quantity')"
            :sortable="true"
            headerStyle="width: 100px"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.quantity') }}</span>
              {{ slotProps.data.quantity }}
            </template>
          </Column>
          <Column
            field="totalPrice"
            :header="t('product.totalPrice')"
            :sortable="true"
            headerStyle="width: 100px;"
          >
            <template #body="slotProps">
              <span class="p-column-title">{{ t('product.totalPrice') }}</span>
              {{ slotProps.data.quantity * slotProps.data.productPrice }}
            </template>
          </Column>

          <Column headerStyle="width:10px;">
            <template #body="slotProps">
              <Button
                icon="pi pi-trash"
                class="p-button-rounded mt-2"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="deleteProductDialog"
          :style="{ width: '450px' }"
          :header="t('product.confirm')"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">{{
              t('product.confirmDelete', { productName: product.name })
            }}</span>
          </div>
          <template #footer>
            <Button
              :label="t('product.no')"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductDialog = false"
            />
            <Button
              :label="t('product.yes')"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteProduct(product.id)"
            />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductsDialog"
          :style="{ width: '450px' }"
          :header="t('product.confirm')"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">{{ t('product.confirmDeleteSelected') }}</span>
          </div>
          <template #footer>
            <Button
              :label="t('product.no')"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductsDialog = false"
            />
            <Button
              :label="t('product.yes')"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteSelectedProducts(product.id)"
            />
          </template>
        </Dialog>
      </div>
      <div v-if="storeCart.getCart.length == 0"> 
        <Card>
          <template #content>
            <span style="margin: auto; display:flex; justify-content: center;">
              {{ t('product.noAmount') }}
            </span>
            <Button
              type="button"
              :label="t('product.continueS')"
              icon="pi pi-shopping-cart mr-2"
              :loading="loading"
              @click="gotoShopping()"
              class="payment"
            />
          </template>
        </Card>
      </div>
      <div>
        <Card v-if="storeCart.getCart[0]?.status == 0">
          <template #title> {{ t('employee.invoice') }} </template>
          <template #content>
            <InputGroup>
              <InputNumber :placeholder="t('employee.giftCode')" />
              <InputGroupAddon>Code</InputGroupAddon>
            </InputGroup>
            <div class="total-price">
              <div>
                <p>{{ t('employee.discount') }} :</p>
                <p>{{ t('employee.toTalPrice') }}:</p>
                <p>{{ t('employee.Address') }} :</p>
                <p class="mt-7">{{ t('employee.paymentMethod') }}</p>
              </div>
              <div>
                <p>10%</p>
                <p>{{ totalAmount * 0.9 }} $</p>
                <p>
                  <span class="p-input-icon-right">
                    <Field name="address" v-slot="{ meta: metaField, field, errorMessage }">
                      <InputText
                        v-bind="field"
                        type="text"
                        v-model="storeOrder.getOrders.address"
                        :class="{
                          'p-invalid': errorMessage && !metaField.valid && metaField.touched
                        }"
                        :placeholder="t('employee.Address')"
                        autocomplete="off"
                      />
                      <div class="absolute line-height-1 pt-2">
                        <small
                          v-if="errorMessage && !metaField.valid && metaField.touched"
                          class="p-error"
                          >{{ errorMessage }}</small
                        >
                      </div>
                    </Field>
                  </span>
                </p>
                <div class="card flex justify-content-center mt-5">
                  <div class="card flex justify-content-center">
                    <div class="flex flex-column gap-3">
                      <div class="flex align-items-center">
                        <RadioButton
                          v-model="selectedMethod"
                          inputId="momo"
                          value="momo"
                          @change="handlePayMent"
                        />
                        <img src="../../assets/img/momo.webp" class="momo-wallet" />
                        <label for="momo">{{ t('employee.momo') }}</label>
                      </div>
                      <div class="flex align-items-center">
                        <RadioButton
                          v-model="selectedMethod"
                          inputId="cod"
                          value="cod"
                          @change="handlePayMent"
                        />
                        <img src="../../assets/img/code.png" class="cod-wallet" />
                        <label for="cod" class="ml-2">{{ t('employee.cod') }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              type="button"
              :label="t('product.tapPay')"
              icon="pi pi-credit-card mr-2"
              :loading="loading"
              @click="tapToPay()"
              class="payment"
            />
            <Dialog
              v-model:visible="visible"
              modal
              :header="t('product.noteConfirmOrder')"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <img
                v-if="storeOrder.getOrders.methodPayment == 'momo'"
                :src="Momo"
                class="pay_momo pb-5"
              />
              <img
                v-if="storeOrder.getOrders.methodPayment == 'cod'"
                :src="Cod"
                class="pay_momo pb-5"
              />
              <span class="invoice">{{ t('employee.invoice') }} :</span>
              <div class="flex info-payment">
                <div class="info-title">
                  <p>{{ t('employee.discount') }} :</p>
                  <p>{{ t('employee.toTalPrice') }}:</p>
                  <p>{{ t('employee.Address') }} :</p>
                </div>
                <div class="info-title">
                  <p>10%</p>
                  <p>{{ totalAmount * 0.9 }} $</p>
                  <p>{{ storeOrder.getOrders.address }}</p>
                </div>
              </div>
              <template #footer>
                <Button
                  :label="t('product.no')"
                  icon="pi pi-times"
                  class="p-button-text"
                  @click="visible = false"
                />
                <Button
                  :label="t('product.yes')"
                  icon="pi pi-check"
                  class="p-button-text"
                  @click="purchaseOrder()"
                />
              </template>
            </Dialog>
          </template>
        </Card>
        <div class="title-order">
            <h3 style="padding-top: 20px;max-width: 1000px; margin: auto; text-decoration: underline;">History Order</h3>
        </div>
        <div
          class="card-steps mt-3"
          v-for="(item, idx) in storeOrder.getOrders.reverse()"
          :key="idx"
        >
          <span class="delivery-info">DELIVER INFOMATION : {{ item.orderDate }}</span>
          <div class="info-deliver">
            <div class="line-deco"></div>
            <div class="item-delivery">
              <span :class="item.orderStatus === 1 ? 'active-delivery' : 'amount-round'" style="margin-left:4px;">1</span>
              <span class="status-name">Unpaid</span>
           </div>
            <div class="line-deco"></div>
            <div class="item-delivery">
              <span :class="item.orderStatus === 2 ? 'active-delivery' : 'amount-round'" style="margin-left: 6px;">2</span>
              <span class="status-name">To Ship</span>
            </div>
            <div class="line-deco"></div>
            <div class="item-delivery">
              <span :class="item.orderStatus === 3 ? 'active-delivery' : 'amount-round'" style="margin-left:6px ;">3</span>
              <span class="status-name">Shipped</span>
            </div>
            <div class="line-deco"></div>
            <div class="item-delivery">
              <span :class="item.orderStatus === 4 ? 'active-delivery' : 'amount-round'" style="margin-left:6px;">4</span>
              <span class="status-name">Review</span>
            </div>
            <div class="line-deco"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-delivery {
    margin: auto;
}
.active-delivery{
  background: #3b82f6;
  color: #fff;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding-top: 7px;
}
div.line-deco {
    width: 150px;
    height: 2px;
    color: black;
    background: black;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
}
.info-deliver {
  display: flex;
}
span.amount-round {
  height: 40px;
  width: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding-top: 7px;
  border: 1px solid black;
  color: #4b5563;
}
.delivery-info {
  color: red;
  text-decoration: underline;
  font-size: 20px;
  font-weight: bold;
}
.card-steps {
  max-width: 1000px;
  margin: auto;
  border: 1px solid #e5e7eb;
  border-width: 0 0 1px 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.102);
  border-radius: 10px;
  background-color: #fff;
}
nav.p-steps.p-component.p-readonly {
  padding-right: 100px;
}

span.invoice {
  font-size: 25px;
  color: red;
  font-weight: bold;
  margin-left: 11%;
  text-decoration: underline;
}
.pay_momo {
  width: 50%;
  margin: auto;
  display: block;
}
textarea#description {
  height: 120px !important;
}
.info-title p {
  font-size: 20px;
}
.flex.info-payment {
  display: flex;
  justify-content: center;
  gap: 50px;
  font-weight: bolder;
  margin-top: 20px;
}
button.p-button.p-component.p-button-icon-only.p-button-danger.p-button-rounded.p-button-text.p-fileupload-file-remove {
  background: #fff;
  border-radius: 50%;
  border: 1px solid;
  width: 25px;
  height: 25px;
}
i.pi.pi-search {
  position: absolute;
  top: 14px;
}
button.p-button.p-component.p-button-icon-only.p-button-rounded.p-button-success.mr-2 {
  background: forestgreen;
}
button.p-button.p-component.p-button-icon-only.p-button-rounded.p-button-warning.mt-2 {
  background: red;
}

.p-dialog-footer {
  display: flex !important;
  justify-content: center;
  gap: 10px;
  color: #fff;
}
button.p-button.p-component.p-button-text {
  color: #fff;
  margin-right: 15px;
}
.p-fileupload-file-thumbnail {
  width: 50% !important;
}
span.block.mt-2.md\:mt-0.p-input-icon-left {
  visibility: hidden;
}
.card.order-card {
  display: flex;
  justify-content: center;
}
.p-card.p-component {
  width: 1000px;
  margin: auto;
  border: 1px solid #e5e7eb;
  border-width: 0 0 1px 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}
.p-inputgroup {
  width: 80%;
  margin: auto;
}
.total-price[data-v-db72331a] {
  display: flex;
  gap: 100px;
  width: 1000px;
  justify-content: center;
  margin-top: 30px;
  font-weight: bold;
}
button.p-button.p-component.p-button-icon-only.p-button-rounded.mt-2 {
  background: #fff;
  color: black;
  border: 0.5px solid #c8b4b4;
}
.payment {
  display: flex;
  text-align: center;
  justify-content: center;
  margin: auto;
  margin-top: 40px;
}
img.momo-wallet {
  width: 50px;
  margin-left: 2px;
  margin-right: 16px;
}
img.cod-wallet {
  width: 50px;
  margin-left: 9px;
}
</style>
