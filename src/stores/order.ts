import { defineStore } from "pinia";
import api from "@/api";
import { format } from "date-fns";
import CONST, { ApiConstant, DEFAULT } from "@/const";


export interface Order {
  id?: number;
  employeeId: string;
  cartItemId: string;
  totalPrice: string;
  methodPayment: string;
  address: string;
  orderStatus: number;
}

export interface FormOrder {
  id?: number;
  employeeId: string;
  cartItemId: string;
  totalPrice: string;
  methodPayment: string;
  address: string;
  orderDate: Date;
  orderStatus: number;
}

export interface ParamsSearch {
  search_text?: string;
}

export interface Pagination {
  currentPage: number;
  total: number;
  perPage: number;
}

interface ProductStore {
    orders: Order[];
  paramSearch: ParamsSearch;
  pagination: Pagination;
  formPurchase: FormOrder;
}

export const useOrderStore = defineStore({
  id: "orders",
  state: (): ProductStore => ({
    orders: [
      {
        id: 0,
        employeeId: '',
        cartItemId: '',
        totalPrice: '',
        methodPayment: '',
        address: '',
        orderStatus: 1
      },
    ],
    formPurchase: {
        employeeId: '',
        cartItemId: '',
        totalPrice: '',
        methodPayment: '',
        address: '',
        orderDate: '',
        orderStatus: 1
    },
    paramSearch: {},
    pagination: {
      currentPage: 1,
      total: 0,
      perPage: 0,
    },
  }),
  getters: {
    getOrders: (state: any) => state.orders,
    getPagination: (state) => state.pagination,
    getParamSearch: (state) => state.paramSearch,
    getFormOrder: (state) => state.formPurchase
  },
  actions: {
    async apiPurchaseOrder(data: FormOrder){
        const res = api.post(ApiConstant.PURCHASE_ORDER, data);
       return res
    },  
  },
});
