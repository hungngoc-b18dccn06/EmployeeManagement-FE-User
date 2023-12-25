import { defineStore } from "pinia";
import api from "@/api";
import { format } from "date-fns";
import CONST, { ApiConstant, DEFAULT } from "@/const";
import { da } from "date-fns/locale";

export interface Product {
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
}

export interface FormProduct {
  file: File;
  productName: string;
  description: string;
  price: string;
  category: string;
  quantity: string;
  average_rating: number;
  status: number;
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
  product: Product[];
  paramSearch: ParamsSearch;
  pagination: Pagination;
  formProduct: FormProduct;
}

export const useProductStore = defineStore({
  id: "product",
  state: (): ProductStore => ({
    product: [
      {
        id: 0,
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
    formProduct: {
      file: null,
      productName: '',
      description: '',
      price: '',
      category: '',
      quantity: '10',
      average_rating: 5,
      status: 2,
    },
    paramSearch: {},
    pagination: {
      currentPage: 1,
      total: 0,
      perPage: 0,
    },
  }),
  getters: {
    getProducts: (state) => state.product,
    getPagination: (state) => state.pagination,
    getParamSearch: (state) => state.paramSearch,
    getFormProduct: (state) => state.formProduct
  },
  actions: {
    async getListProduct(page?: number) {
      const listProduct = await api.get(ApiConstant.GET_PRODUCT_LIST);
      const statusMap = {
        1: 'INSTOCK',
        2: 'LOWSTOCK',
        3: 'OUTOFSTOCK',
      };
    
      const updatedProductList = listProduct.data.content.map(product => ({
        ...product,
        productImage: `http://localhost:8085/api/product/images/${product.productImage}`,
        status: statusMap[product.status] || 'Unknown',
      }));
    
      this.product = updatedProductList;
    },

      async apiCreateProduct(data: FormProduct){
        const res = await api.post(ApiConstant.CREATE_PRODUCT,data);
        await this.getListProduct();
        return res
    },

    async deleteProduct(id: number) {
      const res = await api.delete<any>(ApiConstant.DELETE_PRODUCT(id));
      await this.getListProduct();
        return res
  },
  },
});
