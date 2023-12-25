<script setup>
import { ref, onMounted, watch } from 'vue'
import { useProductStore } from '@/stores/product'
import { useCartItemStore } from '@/stores/cart'
import { useUserStore } from '@/stores/employee'
import { useToast } from 'primevue/usetoast'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import { useI18n } from 'vue-i18n'
import CONST, { AppConstant, DEFAULT } from '@/const'
import Badge from 'primevue/badge'
import OverlayPanel from 'primevue/overlaypanel'
import { useRoute, useRouter } from "vue-router";
const toast = useToast()
const { t } = useI18n()

const storeProduct = useProductStore()
const storeEmployee = useUserStore()
const storeCart = useCartItemStore()
const getSeverity = (product) => {
  switch (product.status) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warning'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}
const op = ref()
const dataviewValue = ref(null)
const layout = ref('grid')
const sortKey = ref(null)
const sortOrder = ref(null)
const sortField = ref(null)
const totalQuantity = ref();
const sortOptions = ref([
  { label: 'Price High to Low', value: '!price' },
  { label: 'Price Low to High', value: 'price' }
])
const router = useRouter();
onMounted(() => {
  dataviewValue.value = storeProduct.getProducts
  storeProduct.getListProduct()
  storeCart.getListCart()
})
const listItem = storeCart.getCart
const toggle = (event) => {
  op.value.toggle(event)
}
const addToCart = async (e) => {
  const formData = new FormData()
  formData.append('employeeId', storeEmployee.getProfile.id)
  formData.append('productId', e.id)
  formData.append('quantity', 1)

  const res = await storeCart.addToCart(formData)
  storeCart.getListCart()
  toast.add({
    group: 'message',
    severity: 'success',
    summary: t('notifile.addCartSucceess'),
    life: CONST.TIME_DELAY,
    closable: false
  })
}
const onSortChange = (event) => {
  const value = event.value.value
  const sortValue = event.value

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1
    sortField.value = value.substring(1, value.length)
    sortKey.value = sortValue
  } else {
    sortOrder.value = 1
    sortField.value = value
    sortKey.value = sortValue
  }
}

watch(() => storeCart.getCart, () => {
  calculateTotalQuantity();
}, { deep: true });

function calculateTotalQuantity() {
  totalQuantity.value = storeCart.getCart.reduce((total, item) => total + item.quantity, 0);
}
const toggleAlt = (event) => {
  op.value.toggle(event)
  console.log(listItem)
}
const goToOrder = () =>{
  router.push(`/order_detail`);
}
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h2>{{ t('product.lgEcommerce') }}</h2>
        
        <DataView
          :value="storeProduct.getProducts"
          :layout="layout"
          :paginator="true"
          :rows="9"
          :sortOrder="sortOrder"
          :sortField="sortField"
        >
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6 text-left">
                <Dropdown
                  v-model="sortKey"
                  :options="sortOptions"
                  optionLabel="label"
                  placeholder="Sort By Price"
                  @change="onSortChange($event)"
                />
              </div>
              <div class="col-6 text-right">
                <DataViewLayoutOptions v-model="layout" />
              </div>
            </div>
          </template>

          <template #list="slotProps">
            <div class="col-12">
              <div
                class="flex flex-column md:flex-row align-items-center p-3 w-full"
                v-for="(item, index) in slotProps.items"
                :key="index"
              >
                <img
                  :src="item.productImage"
                  :alt="item.productName"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                />
                <div class="flex-1 text-center md:text-left">
                  <div class="font-bold text-2xl">{{ item.productName }}</div>
                  <div class="mb-3">{{ item.description }}</div>
                  <Rating
                    :modelValue="item.average_rating"
                    :readonly="true"
                    :cancel="false"
                    class="mb-2"
                  ></Rating>
                  <div class="flex align-items-center">
                    <i class="pi pi-tag mr-2"></i>
                    <span class="font-semibold">{{ item.category }}</span>
                  </div>
                </div>
                <div
                  class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0"
                >
                  <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end"
                    >${{ item.price }}</span
                  >
                  <Button
                    icon="pi pi-shopping-cart"
                    label="Add to Cart"
                    @click="addToCart(item)"
                    :disabled="item.status === 'OUTOFSTOCK'"
                    class="mb-2"
                  ></Button>
                  <Tag
                    :class="'product-badge status-' + item.status.toLowerCase()"
                    :value="item.status"
                    :severity="getSeverity(item)"
                  ></Tag>
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
   
            <div class="grid-list-product">
              <div class="col-12 md:col-4" v-for="(item, index) in slotProps.items" :key="index">
                <div class="card m-3 border-1 surface-border">
                  <div class="flex align-items-center justify-content-between">
                    <div class="flex align-items-center">
                      <i class="pi pi-tag mr-2"></i>
                      <span class="font-semibold">{{ item.category }}</span>
                    </div>
                    <Tag
                      :class="'product-badge status-' + item.status.toLowerCase()"
                      :value="item.status"
                      :severity="getSeverity(item)"
                    ></Tag>
                  </div>
                  <div class="text-center">
                    <img
                      :src="item.productImage"
                      :alt="item.productName"
                      class="w-9 shadow-2 my-3 mx-0"
                    />
                    <div class="text-2xl font-bold">{{ item.productName }}</div>
                    <div class="mb-3">{{ item.description }}</div>
                    <Rating
                      :modelValue="item.average_rating"
                      :readonly="true"
                      :cancel="false"
                    ></Rating>
                  </div>
                  <div class="flex align-items-center justify-content-between">
                    <span class="text-2xl font-semibold">${{ item.price }}</span>
                    <Button
                      icon="pi pi-shopping-cart"
                      @click="addToCart(item)"
                      :disabled="item.status === 'OUTOFSTOCK'"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card[data-v-868f36f1] {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--card-shadow);
  border-radius: 12px;
}

.p-rating.p-readonly {
  margin: auto;
  display: block;
  text-align: center;
}

img.w-9.shadow-2.my-3.mx-0 {
  height: 200px;
}
span.p-badge.p-component.p-badge-no-gutter.p-badge-danger.mr-2 {
  top: -8px;
  left: -11px;
}
.badges.cart-order {
  position: relative;
  margin-bottom: 10px;
  display: flex;
  justify-content: end;
}

</style>
