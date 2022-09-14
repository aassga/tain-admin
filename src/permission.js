import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 進度條
import 'nprogress/nprogress.css'// Progress 進度條樣式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验權

const whiteList = ['/login'] // 不重定向白名單
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用戶訊息
          let menus=res.data.menus;
          let username=res.data.username;
          store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可訪問的路由表
            router.addRoutes(store.getters.addRouters); // 動態添加可訪問路由表
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 結束Progress
})
