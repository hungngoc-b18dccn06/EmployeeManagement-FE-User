<template>
    <div>
        <div class="dowload-file-admin">
            <Button class="p-button-sm white-space-nowrap download mr-2" icon="pi pi-download mr-2"
                @click="downloadCSV(DEFAULT.EXPORT_TYPE.CSV, 'CSV出力', 'csv')" :label="t('employee.csvLabel')"></Button>
            <Button class="p-button-sm white-space-nowrap download mr-2" icon="pi pi-download mr-2"
                @click="downloadCSV(DEFAULT.EXPORT_TYPE.EXCEL_TOTAL, t('employee.excelName') , 'xlsx')" :label="t('employee.excelLabel')"></Button>
        </div>
        <TitleCommon :title="t('page.userCreate')" />
        
        <div class="lighten-4 rounded">
            <div class="p-4 border-search pb-3">
                <div class="key_search">
                    <span class="text-field-search">{{ t('employee.keywordSearch') }}</span>
                    <div class="p-inputgroup flex-1">
                        <InputText class="w-full" v-model="storeUser.getFilterValue.search_text" :placeholder="t('employee.keywordSearch')" />
                        <ButtonClearCommon v-if="storeUser.getFilterValue.search_text" :clearInput="() => clearInput('storeUser.getFilterValue.search_text') " />
                    </div>
                </div>
            
                <div class="mt-2">
                    <span class="text-field-search">{{ t('employee.dateItemSelection') }}</span>
                    <div class="grid align-items-center">
                        <div class="col-3">
                            <div class="p-inputgroup">
                                <div class="p-inputgroup flex-1">
                                    <Dropdown v-model="selectedDate" :options="DATE_ITEM" :placeholder="t('employee.dateItemSelection')"
                                        optionLabel="label" class="w-full md:w-14rem" @change="handelSearchType" />
                                    <ButtonClearCommon v-if="selectedDate" :clearInput="() => clearInput('selectedDate')" />
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="p-inputgroup">
                                <Calendar v-model="startMonth" view="date" dateFormat="yy/mm/dd" class="calendar_search"
                                    showIcon :manualInput="false" :max-date="endMonth" @date-select="handleChangeToStart"
                                    :disabled="!selectedDate" @update:model-value="startMonth = $event" />
                            </div>
                        </div>
                        <span class="mx-1">~</span>
                        <div class="col-3">
                            <div class="p-inputgroup">
                                <Calendar v-model="endMonth" view="date" dateFormat="yy/mm/dd" class="calendar_search"
                                    showIcon :manualInput="false" :min-date="startMonth" @date-select="handleChangeToEnd"
                                    :disabled="!selectedDate" @update:model-value="endMonth = $event" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <span class="text-field-search">{{ t('employee.selectDateItem') }}</span>
                    <div class="grid align-items-center">                  
                        <div class="col-3 flex align-items-center">
                            <div class="">
                                <RadioButton v-model="flagValue" inputId="ingredient1" :name="t('employee.active')" 
                                    value = "1" @change="handelChangeFlag" />
                                <label for="ingredient1" class="ml-2 white-space-nowrap">{{ t('employee.active') }}</label>
                            </div>
                            <div class="px-4">
                                <RadioButton v-model="flagValue" inputId="ingredient2" :name="t('employee.inactive')" 
                                    value = "0" @change="handelChangeFlag" />
                                <label for="ingredient2" class="ml-2 white-space-nowrap">{{ t('employee.inactive') }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <span class="text-field-search">{{ t('employee.distribution')  }}</span>
                    <div class="grid align-items-center">
                        <div class="col-3">
                            <div class="p-inputgroup">
                                <Dropdown v-model="selectedFlag" :options="DEFAULT.USER_ROLE" :placeholder="t('employee.distribution')"
                                    optionLabel="label" class="w-full md:w-14rem" @change="handelSearchType" />
                                <ButtonClearCommon v-if="selectedFlag" :clearInput="() => clearInput('selectedFlag')" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reset_search flex justify-content-center align-items-center mt-2">
                    <Button class="p-button-sm white-space-nowrap refresh" icon="pi pi-refresh mr-2" @click="reloadSearch()"
                        :label=" t('employee.reload') ">
                    </Button>   
                </div>
            </div>
            <Toast />
            </div>
            <DataTable :value="storeUser.getUsers" class="p-datatable-sm" ref="dt" tableStyle="min-width: 75rem"
                @row-click="gotToDetail($event)" :rowHover="true" responsive-layout="scroll">
                <Column style="padding-left:2rem; margin:auto" v-for="col in translatedColumns" :key="col.field" :field="col.field"
                    :header="col.header" :sortable="true"></Column>
                <template #empty>
                    <div class="text-center">{{ $t('user.userNotFound') }}</div>
                </template>
                <template #loading>
                    {{ $t('user.userLoading') }}
                </template>
                
                <template #footer>
                    <Paginator v-if="storeUser.getPagination.total > 0"
                        :first="(storeUser.getPagination.currentPage) * storeUser.getPagination.perPage"
                        :rows="storeUser.getPagination.perPage" :totalRecords="storeUser.getPagination.total"
                        template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :currentPageReportTemplate="AppConstant.CURRENT_PAGE_REPORT_TEMPLATE" @page="changePage">
                    </Paginator>
                </template>
            </DataTable>
        
        <Popup ref="modal" :labelCancel="t('common.no')" :labelOk="t('common.yes')" :header="t('common.confirm')"
            :content="t('common.popupDeleteContent')" :ok="confirm" :cancel="cancel"></Popup>
    </div>
</template>
<script setup lang="ts">
import { PrimeIcons, FilterMatchMode, FilterOperator } from 'primevue/api';
import Paginator from 'primevue/paginator';
import TitleCommon from "@/components/common/TitleCommon.vue"
import Popup from "@/components/PopupConfirm.vue";
import ButtonClearCommon from "@/components/common/ButtonClearCommon.vue";
import { useUserStore } from "@/stores/employee";
import FooterCommon from "@/components/common/FooterCommon.vue";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import CONST, { AppConstant, DEFAULT } from "@/const";
import { Field, ErrorMessage, useForm } from "vee-validate";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { format } from "date-fns";
import axios from 'axios';
const router = useRouter();
const storeUser = useUserStore();
const idUser = ref(0);
const toast = useToast();
const { t } = useI18n();
const selectedNumbericType = ref();
const selectedDate = ref();
const startMonth = ref();
const endMonth = ref();
const selectedFlag = ref();
const flagRadio = ref();
const flagValue = ref();

const columns = ref([
  'employeeid',
  'employeename',
  'email',
  'role',
  'phone',
  'status',
  'createdAt'
]);

const DATE_ITEM = computed(() => {
  return [
    {
      label: t('employee.created_at'),
      value: t('employee.created_at'),
    },
    {
      label:  t('employee.date_of_birth'),
      value: t('employee.date_of_birth'),
    },
];
});

const translatedColumns = computed(() => {
  return columns.value.map((field) => ({
    field,
    header: t(`employee.${field}`), 
  }));
});
const schema = yup.object({
    start_number: yup
        .number()
        .transform((value, origin) => (value === "" || origin === "" ? 0 : value))
        .typeError(t("message.requiredNumber"))
        .nullable()
        .test("name", t("message.validateStartNumber"), (value, ctx) => {
            return value && ctx.parent.end_number
                ? value < ctx.parent.end_number
                : true;
        }),
    end_number: yup
        .number()
        .transform((value, origin) => (value === "" || origin === "" ? 0 : value))
        .typeError(t("message.requiredNumber"))
        .nullable(),
});
const { values, errors, validate } = useForm({
    validationSchema: schema,
});

function gotToDetail(event: any) {
    router.push(`/employee/${event.data.id}/detail`);
}
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const modal = ref<InstanceType<typeof Popup> | null>(null);
const openModal = () => {
    modal.value?.open();
};
const closeModal = () => {
    modal.value?.close();
};
const deleteUser = (event: any) => {
    idUser.value = event;
    modal.value?.open();
};
const changePage = async (event: any) => {

    storeUser.getListUser(event.page + 1);
};
const confirm = async () => {
    try {
        closeModal();
        const res = await storeUser.deleteUser(idUser.value);
        toast.add({ group: "message", severity: "success", summary: res.data.message, life: CONST.TIME_DELAY, closable: false });
    } catch (e) {
        console.log(e);
        closeModal();
    }
}
const cancel = () => {
    closeModal();
}
const downloadCSV = async (type: number, name: string, ext: string) => {
    storeUser.dowloadEmployee(type, name, ext);
};


const handelSearchType = async () => {
  if(selectedFlag.value) {
    storeUser.getFilterValue.role = selectedFlag.value.value;
    storeUser.getListUser();
  }else if(flagValue.value){
    console.log(flagValue.value)
    storeUser.getFilterValue.status = flagValue.value;
    storeUser.getListUser();
  }
};
const handelChangeFlag = async () => {
  storeUser.getFilterValue.status = Number(flagValue.value);
  storeUser.getListUser();
};

watch(
  () => storeUser.getFilterValue.search_text,
  (value) => {
    setTimeout(function () {
      if (value === storeUser.getFilterValue.search_text) {
        storeUser.getListUser();
      }
    }, 1000);
  }
);

const handleChangeToStart = async () => {
    storeUser.getFilterValue.startDate = format(
      new Date(startMonth.value),
      CONST.DATE_FORMAT
    );
    storeUser.getListUser();
  
};
const handleChangeToEnd = async () => {
    storeUser.getFilterValue.endDate = format(
      new Date(endMonth.value),
      CONST.DATE_FORMAT
    );
    storeUser.getListUser();
};
const reloadSearch = () => {
  const { getFilterValue }: any = storeUser;
  Object.keys(getFilterValue).forEach(
    (key) => (getFilterValue[key] = undefined)
  );
  [
    startMonth,
    endMonth,
    selectedDate,
    selectedNumbericType,
    selectedFlag,
    flagValue,
  ].forEach((input) => (input.value = null));
  storeUser.getListUser();
};
const clearInput = (inputName: any) => {
    console.log(inputName);
  if (inputName === "start_date") {
    startMonth.value = "";
    storeUser.getFilterValue.startDate = null;
    storeUser.getListUser();
  } else if (inputName === "end_date") {
    storeUser.getFilterValue.endDate = null;
    endMonth.value = "";
    storeUser.getListUser();
  } else if (inputName === "flagRadio") {
    storeUser.getFilterValue.status = null;
    console.log(flagRadio, flagValue)
    flagRadio.value = null;
    flagValue.value = null;
    flagRadio.value = "";
    storeUser.getListUser();
  } else if (inputName === "selectedDate") {
    selectedDate.value = "";
    storeUser.getParamSearch.date_type = undefined;
    storeUser.getFilterValue.startDate = undefined;
    storeUser.getFilterValue.endDate = undefined;
    startMonth.value = "";
    endMonth.value = "";
    storeUser.getListUser();
  } else if (inputName === "storeUser.getFilterValue.search_text") {
    storeUser.getFilterValue.search_text = "";
  } else if (inputName === "selectedFlag") {
    storeUser.getFilterValue.role = null;
    flagValue.value = null;
    selectedFlag.value = null;
    storeUser.getListUser();
  }
};
onMounted(
    () => {
        storeUser.getListUser();
        storeUser.getProfileDetail();
        console.log(storeUser)
    }
)
</script>
<style scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

span.text-field-search {
    font-weight: bold;
}

h5.m-0 {
    font-size: 26px;
    font-weight: 600;
}

.dowload-file-admin {
    display: flex;
    justify-content: end;
}
.p-button-danger, .p-button-danger:hover {
    background-color: red;
    --button-bg-hover: red;
}
.lighten-4.rounded{
    border: grey;
    border-radius: 0.5rem;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
    margin-bottom: 30px;
}
span.p-input-icon-left.w-5{
    visibility: hidden
}
</style>
