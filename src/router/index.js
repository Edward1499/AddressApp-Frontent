import Vue from 'vue'
import Router from 'vue-router'
import MainAuth from '@/views/Auth/Main'
import Login from '@/views/Auth/Login'
import Register from '@/views/Auth/Register'
import Page from '@/views/Pages/Page'
import UserAddressList from '@/views/Pages/users/AddressList'
import UserList from '@/views/Pages/admin/UserList'
import { roles } from '@/data/enum'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Page',
      component: Page,
      children: [
        {
          path: 'user-address-list',
          name: 'UserAddressList',
          component: UserAddressList,
          meta: { authorize: roles.NORMAL_USER } 
        },
        {
          path: 'admin-user-list',
          name: 'AdminUserList',
          component: UserList,
          meta: { authorize: roles.ADMIN } 
        }
      ]
    },
    {
      path: '/auth',
      name: 'MainAuth',
      component: MainAuth,
      redirect: Login,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;

  if (authorize && !localStorage.getItem('userInfo')) {
    return next({ name: 'Login' });
  }

  if (authorize && localStorage.getItem('userInfo')) {
    const userRole = JSON.parse(localStorage.getItem('userInfo'))['userRoleId'];
    let goNext = false;
    if (authorize === userRole) {
      goNext = true;
    }

    if (!goNext) {
      if (userRole === roles.NORMAL_USER) {
        return next({ name: 'UserAddressList' });
      } else {
        return next({ name: 'AdminUserList' });
      }
    }
  } 
  next();
});

export default router;
