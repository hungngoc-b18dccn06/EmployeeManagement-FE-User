import { defineStore } from "pinia";
import api from "@/api";
import { format } from "date-fns";
import CONST, { ApiConstant, DEFAULT } from "@/const";

export interface Order {
  id?: number;
  employeeid: string;
  employeename: string;
  cartItemId: number;
  orderDate: string;
  totalPrice: string;
  methodPayment: string;
  address: String;
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
  getAmount: number;
}

export const useOrderStore = defineStore({
  id: "orders",
  state: (): ProductStore => ({
    orders: [],
    formPurchase: {
      employeeId: "",
      cartItemId: "",
      totalPrice: "",
      methodPayment: "",
      address: "",
      orderDate: "",
      orderStatus: 1,
    },
    paramSearch: {},
    pagination: {
      currentPage: 1,
      total: 0,
      perPage: 0,
    },
    getAmount: 0,
  }),
  getters: {
    getOrders: (state: any) => state.orders,
    getPagination: (state) => state.pagination,
    getParamSearch: (state) => state.paramSearch,
    getFormOrder: (state) => state.formPurchase,
    getAmount: (state) => state.getAmount
  },
  actions: {
    async apiPurchaseOrder(data: FormOrder) {
      const res = await api.post(ApiConstant.PURCHASE_ORDER, data);
      console.log(res);
      return res;
    },

    async getListOrder(page?: number) {
      const listOrder = await api.get(ApiConstant.GET_ORDER_LIST);
      const current_id = localStorage.getItem("employeeId");

      const filteredOrderList = listOrder.data
        .filter((order) => order.employee.employeeid === current_id)
        .map((order) => ({
          id: order.id,
          employeeId: order.employee.employeeid,
          orderDate: new Date(order.orderDate).toISOString().split("T")[0],
          totalPrice: order.totalPrice,
          methodPayment: order.methodPayment,
          address: order.address,
          orderStatus: order.orderStatus,
        }));

      this.orders = filteredOrderList;
      
    },
  }
});
