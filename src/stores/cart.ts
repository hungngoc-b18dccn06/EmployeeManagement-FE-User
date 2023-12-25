import { defineStore } from "pinia";
import api from "@/api";
import { format } from "date-fns";
import CONST, { ApiConstant, DEFAULT } from "@/const";
import { da } from "date-fns/locale";

export interface CartItem {
  id?: number;
  productName: string;
  productCode: string;
  description: string;
  productImage: string;
  price: string;
  category: string;
  quantity: number;
  average_rating: number;
  status: string;
  cartItemProductId: number,
  cartItemId: number
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
  cart: CartItem[];
  pagination: Pagination;
}

export const useCartItemStore = defineStore({
  id: "cart",
  state: (): ProductStore => ({
    cart: [
      {
        id: 0,
        cartItemProductId: 0,
        cartItemId: 0,
        productName: "",
        productCode: "",
        description: "",
        productImage: "",
        price: "",
        category: "",
        quantity: 1,
        average_rating: 5,
        status: DEFAULT.INVENTORY_STATUS[1].label,
      },
    ],
    pagination: {
      currentPage: 1,
      total: 0,
      perPage: 0,
    },
  }),
  getters: {
    getCart: (state) => state.cart,
    getPagination: (state) => state.pagination,
  },
  actions: {
    async getListCart() {
        const listCart = await api.get(ApiConstant.LIST_CART_ITEM);
        this.cart = listCart.data;
    },

    async addToCart(data: FormData){
       const res = api.post(ApiConstant.ADD_TO_CART, data);
       await this.getListCart()
       return res
    }
  }
});
