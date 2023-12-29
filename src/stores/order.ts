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
}

export const useOrderStore = defineStore({
  id: "orders",
  state: (): ProductStore => ({
    orders: [
      {
        id: 0,
        employeeid: '',
        employeename: '',
        cartItemId: 1,
        orderDate: '',
        totalPrice: '',
        methodPayment: '',
        address: '',
        orderStatus: DEFAULT.INVENTORY_STATUS[1].value,
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
        console.log(res)
       return res
    },  

    async getListOrder(page?: number) {
      const listOrder = await api.get(ApiConstant.GET_ORDER_LIST);
     
      const updatedOrderList = listOrder.data.map(orders => ({
        ...orders,
        cartItemId: orders.cartItem.id,
        employeeId: orders.employee.employeeid ,
        orderDate:  new Date(orders.orderDate).toISOString().split('T')[0],
      }));
      this.orders = updatedOrderList;
      console.log(this.orders)
    },
  },


});
