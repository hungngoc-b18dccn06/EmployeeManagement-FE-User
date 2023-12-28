import {defineStore} from "pinia";
import api from "@/api";
import {format} from "date-fns";
import CONST, {ApiConstant, DEFAULT} from "@/const";
import axios, { type AxiosRequestConfig } from "axios";
import { da } from "date-fns/locale";
export interface Employee {
    id?: number,
    employeeid: string;
    email: string;
    role:number;
    phone:string;
    employeename?: string; 
}
export interface ParamsSearch {
    search_text?: string;
}
export interface Pagination {
    currentPage: number,
    total: number,
    perPage: number
}
export interface filterValue{
    search_text : any;
    status: any;
    role: any;
    startDate: any;
    endDate: any;
}
export interface ParamsSearch {
    search_text?: string;
    status?: string;
    start_date?: any;
    end_date?: any;
    recruit_ids?: string;
    order_by?: string;
    start_number?:any;
    role_type?:any;
    end_number?:any;
    numberic_type?:string;
    date_type?:string;
    flag_type?:any;
    flag_value?:any;
    type?: string;
    page?:number;
}
interface FormEmployee {
    employeename: string;
    employeeid: string;
    phone: string;
    email: string;
    status: number;
    role: number;
    password?: string;
}
interface UserStore {
    profile: Employee,
    users: Employee[],
    paramSearch: ParamsSearch,
    pagination: Pagination,
    formUser: FormEmployee,
    current_name: String;
    filterValue: filterValue
    
}
export const useUserStore = defineStore({
    id: "employee",
    state: (): UserStore =>{
        return {
            profile: {
                id: 0,
                employeeid: "",
                email: "",
                phone: "",
                employeename: "",
                role: DEFAULT.USER_ROLE[0].value,
            },
            users: [{
                id: 0,
                employeeid: "",
                email: "",
                employeename: "",
                phone: "",
                role: DEFAULT.USER_ROLE[0].value,
            }],
            paramSearch: {},
            pagination: {
                currentPage: 1,
                total: 0,
                perPage: 0,
            },
            formUser:{
                employeename:'',
                employeeid: '',
                email: '',
                phone: '',
                status: DEFAULT.STATUS_ITEM[0].value,
                role: DEFAULT.USER_ROLE[0].value,
            },
            filterValue: {
                search_text : null,
                status: null,
                role: null ,
                startDate: null,
                endDate: null,
            },
            current_name: ''
        }
    },
    getters:{
        getProfile: (state => state.profile),
        getPagination: (state => state.pagination),
        getParamSearch: (state => state.paramSearch),
        getUsers: (state => state.users.map(e => ({
            ...e,
            role: (DEFAULT.USER_ROLE.find(el => el.value == e.role) ?? DEFAULT.USER_ROLE[0]).label,
        }))),
        getFormUser: (state => state.formUser),
        getFilterValue: (state => state.filterValue),
        getRole: (state => state.profile.role),
        getName: (state => state.current_name),
    },
    actions:{
        async getListUser(page) {
            const currentPage = page == null ? 0 : page - 1 ;

            const requestData = {
                filterValue: this.filterValue,
                sort: "",
                pageSize: 10 ?? this.pagination.total,
                pageIndex: currentPage,
                ... this.paramSearch
              };

            const listUser = await api.post(ApiConstant.GET_EMPLOYEE_LIST, requestData);
            this.users = listUser.data.content;
            
            this.users = listUser.data.content.map(e => ({
                ...e,
                status: e.status === 1 ? "active" : e.status === 0 ? "inactive" : e.status,
                createdAt: new Date(e.createdAt).toISOString().split('T')[0],
            }));
            
            this.pagination = {
                currentPage: currentPage,
                total: listUser.data.totalElements,
                perPage: listUser.data.totalPages,
            };
            console.log(this.pagination)
        },

        async getProfileDetail() {
            try {
                const access_token = localStorage.getItem('access_token');
                if (!access_token) {
                  return false;
                }
                const headers = {
                  'Authorization' : `Bearer ${access_token}`,
                };
                    const response = await api.get(ApiConstant.GET_PROFILE, {headers});
                    this.profile = response.data;
                    this.current_name = response.data.employeename;
                    localStorage.setItem("employeeId", response.data.id);
                    return response
              } catch (err) {
                console.log(err);
              }
        },

        async getUserDetail(id: number) {
            const response = await api.get<any>(ApiConstant.GET_EMPLOYEE_DETAIL(id));
            this.formUser = response.data;
            console.log(response);
        },

        async dowloadEmployee(type : any, name: any, ext: any) {
            try {
                const requestData = {
                    filterValue: this.filterValue,
                    sort: "",
                    pageSize: "10",
                    pageIndex: "0",
                    ...this.paramSearch
                };
        
                let response;
        
                if (type === 1) {
                    response = await api.post(ApiConstant.EXPORT_CSV, requestData, {
                        responseType: 'blob',
                    });
                } else if (type === 3) {
                    response = await api.post(ApiConstant.EXPORT_EXCEL, requestData, {
                        responseType: 'blob',
                    });
                }
                const blob = new Blob([response.data], { type: 'application/octet-stream' });
        
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${name}.${ext}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error downloading file:', error);       
            }
        },

        async updateProfile(data: Employee) {
            try {
            const res = await api.put(ApiConstant.UPDATE_PROFILE, data);
            return res
            } catch (err) {
                console.log(err);
            }
        },
    }
})