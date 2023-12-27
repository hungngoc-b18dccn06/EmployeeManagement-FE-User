import { createApp } from "vue";
import { createPinia } from "pinia";
import Card from "primevue/card";
import Carousel from "primevue/carousel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Checkbox from "primevue/checkbox";
import Password from "primevue/password";
import ProgressSpinner from "primevue/progressspinner";
import Textarea from "primevue/textarea";
import Divider from "primevue/divider";
import Calendar from "primevue/calendar";
import SelectButton from 'primevue/selectbutton';
import DataTable from "primevue/datatable";
import Chart from 'primevue/chart';
import Paginator from "primevue/paginator";
import Column from "primevue/column";
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Badge from 'primevue/badge';
import Dialog from "primevue/dialog";
import InputSwitch from "primevue/inputswitch";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";
import Sidebar from "primevue/sidebar";
import InputMask from "primevue/inputmask";
import Avatar from "primevue/avatar";
import InputNumber from "primevue/inputnumber";
import Image from "primevue/image";
import Menu from "primevue/menu";
import App from "./App.vue";
import router from "@/router";
import { configure } from 'vee-validate';
import "primeflex/primeflex.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "@/assets/main.css";
import i18n from "@/i18n";
import Steps from 'primevue/steps';
const app = createApp(App);

configure({
  validateOnBlur: true,
  validateOnModelUpdate: false,
  validateOnChange: false,
  validateOnInput: true,
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.use(PrimeVue, {
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    dayNames: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    today: "오늘",
    weekHeader: "주",
    
    firstDayOfWeek: 0,
    dateFormat: "yy-mm-dd",
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found", // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: 'True',
      falseLabel: 'False',
      nullLabel: 'Not Selected',
      star: '1 star',
      stars: '{star} stars',
      selectAll: 'All items selected',
      unselectAll: 'All items unselected',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      navigation: 'Navigation',
      scrollTop: 'Scroll Top',
      moveTop: 'Move Top',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      moveBottom: 'Move Bottom',
      moveToTarget: 'Move to Target',
      moveToSource: 'Move to Source',
      moveAllToTarget: 'Move All to Target',
      moveAllToSource: 'Move All to Source',
      pageLabel: '{page}',
      firstPageLabel: 'First Page',
      lastPageLabel: 'Last Page',
      nextPageLabel: 'Next Page',
      prevPageLabel: 'Previous Page',
      rowsPerPageLabel: 'Rows per page',
      jumpToPageDropdownLabel: 'Jump to Page Dropdown',
      jumpToPageInputLabel: 'Jump to Page Input',
      selectRow: 'Row Selected',
      unselectRow: 'Row Unselected',
      expandRow: 'Row Expanded',
      collapseRow: 'Row Collapsed',
      showFilterMenu: 'Show Filter Menu',
      hideFilterMenu: 'Hide Filter Menu',
      filterOperator: 'Filter Operator',
      filterConstraint: 'Filter Constraint',
      editRow: 'Row Edit',
      saveEdit: 'Save Edit',
      cancelEdit: 'Cancel Edit',
      listView: 'List View',
      gridView: 'Grid View',
      slide: 'Slide',
      slideNumber: '{slideNumber}',
      zoomImage: 'Zoom Image',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      rotateRight: 'Rotate Right',
      rotateLeft: 'Rotate Left'
    }
  },
});
app.use(ToastService);

app.component("Card", Card);
app.component("Carousel", Carousel);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("Checkbox", Checkbox);
app.component("Password", Password);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Textarea", Textarea);
app.component("Divider", Divider);
app.component("Calendar", Calendar);
app.component("SelectButton", SelectButton);
app.component("DataTable", DataTable);
app.component("Paginator", Paginator);
app.component("Column", Column);
app.component("Row", Row);
app.component("ColumnGroup", ColumnGroup);
app.component("InputSwitch", InputSwitch);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("RadioButton", RadioButton);
app.component("Dropdown", Dropdown);
app.component("Sidebar", Sidebar);
app.component("InputMask", InputMask);
app.component("InputNumber", InputNumber);
app.component("Dialog", Dialog);
app.component("Avatar", Avatar);
app.component("Steps",Steps);
app.component("Image", Image);
app.component("Badge", Badge);
app.component("Menu", Menu);
app.component("Chart", Chart);
app.mount("#app");
