router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
        // debugger
    if (getToken()) { //判断是否有token
        /* has token */
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done() // 
        } else {
            if (store.getters.addRouters.length === 0) {
                store.dispatch('GetUserInfo').then(() => {
                    store.dispatch('GenerateRoutes', {}).then(() => {
                        next({...to, replace: true })
                    })
                })
            } else {
                next()
                NProgress.done()
            }
        }
    } else {
        if (to.path == '/login') { // 如果是登录页面路径，就直接next()
            next()
            NProgress.done()
        } else { // 不然就跳转到登录；
            next('/login')
        }
    }
})