import { createRouter, createWebHistory } from 'vue-router';
import PAGE_ROUTE from "@/const/pageRoute";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterViewVue from '@/views/auth/RegisterView.vue';
import LayoutViewVue from '@/views/LayoutView.vue';
import ListEmployee from '@/views/user/ListEmployee.vue';
import DetailEmployee from '@/views/user/DetailEmployee.vue';
import ListOrderVue from '@/views/orderEmployee/ListOrder.vue';
import OrderDetailVue from '@/views/order/OrderDetail.vue';
import { useUserStore } from '@/stores/employee';
import PageNotFoundVue from '@/views/PageNotFound.vue';
import ProfileVue from '@/views/Profile.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: LayoutViewVue,
      children: [
        {
          path: "/",
          name: 'ListOrderVue',
          component: ListOrderVue,
          meta: { requiresAuth: true, roles: [3] }
        },
        {
          path: '/employees',
          name: 'employees',
          component: ListEmployee,
          meta: { requiresAuth: true, roles: [3] }
        },
        {
          path: '/employee/:id/detail',
          name: 'DetailEmployee',
          component: DetailEmployee,
          meta: { requiresAuth: true, roles: [3] }
        },
        {
          path: '/order_detail',
          name: 'OrderDetailVue',
          component: OrderDetailVue,
          meta: { requiresAuth: true, roles: [3] }
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfileVue,      
        }
      ]
    },
    {
      path: PAGE_ROUTE.LOGIN,
      name: "login",
      component: LoginView,
    },
    {
      path: PAGE_ROUTE.REGISTER,
      name: "register",
      component: RegisterViewVue,
    },
    {
      path: '/:catchAll(.*)',
      component: PageNotFoundVue,
    },
  ]
});
// router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore();

//   try {
//     if (to.name === 'login') {
//       // If navigating to the login page, allow navigation
//       next();
//       return;
//     }

//     if (!userStore.isAuthenticated) {
//       // If the route requires authentication and the user is not authenticated, redirect to login
//       if (to.meta.requiresAuth) {
//         next(PAGE_ROUTE.LOGIN);
//       } else {
//         // For non-authenticated routes, allow navigation
//         next();
//       }
//       return;
//     }

//     const response = await userStore.getProfileDetail();
//     const role = response.data.role;

//     // Map giá trị role với các roles trong meta
//     const roleMapping = {
//       1: ['/', '/employees', '/employee/:id/detail', '/ecommerce_order', '/order_detail'],
//       2: ['/', '/employees', '/employee/:id/detail', '/ecommerce_order', '/order_detail'],
//       3: ['/', '/employees', '/employee/:id/detail', '/ecommerce_manage'],
//       // Thêm mapping cho các role khác nếu cần
//     };

//     // If the user is authenticated, check role-based navigation
//     if (roleMapping[role] && roleMapping[role].includes(to.path)) {
//       // Continue to the requested route
//       next();
//     } else {
//       console.log(111);
//       // Handle the case where the role doesn't match any predefined routes
//       // You may want to redirect to a different page or display an error message
//       next('/page-not-found');
//     }
//   } catch (error) {
//     console.log(111);
//     // Handle the error (e.g., redirect to an error page or show a message)
//     window.open('https://support.wwf.org.uk/earth_hour/index.php?type=individual');
//     // Do not call next() here to prevent navigation in case of an error
//     return;
//   }
// });

export default router;

