import PAGE_ROUTE from "./pageRoute";
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n();

    const menuItems = [
      {
        items: [
          {
            label: t('menu.dashboard'), 
            icon: "pi pi-home",
            to: PAGE_ROUTE.HOME,
            public: false,
          },
        ],
      },
      {
        items: [
          {
            label: t('menu.employeeList'), 
            icon: "pi pi-users",
            to: PAGE_ROUTE.EMPLOYEE_LIST,
            public: false,
          },
        ],
      },
      {
        items: [
          {
            label: t('menu.eCommerce'),
            icon: "pi pi-shopping-cart",
            to: PAGE_ROUTE.ORDER_COFFEE,
            public: false,
          },
        ],
      },
    ];

    return {
      menuItems,
    };
  },
  
};
