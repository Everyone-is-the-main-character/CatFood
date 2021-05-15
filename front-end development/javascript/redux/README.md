Redux 核心概念及工作流程

1. Store 存储状态的容器，javascript 对象
2. View 视图，HTML 页面
3. Actions 对象，描述对状态进行什么样的操作
4. Reducers 函数，操作状态并并返回新的状态

applyMiddleware

```javascript
const applyMiddleware = function (store, middleware) {
    let next = store.dispatch
    store.dispatch = middleware(store)(next)
}
applyMiddleware(dispatchAndPrint)
```

走进 applyMiddleware 源码
我们可以看到applyMiddleware的源码中实际上通过compose函数去实现将上一个中间件的返回值传递下一个中间件作为参数，从而实现中间件串联的效果。
如果中间件顺序是a,b,c则compose函数组合后结果是c(b(a(...args))),执行顺序为a->b->c。
```javascript
function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        var store = createStore(reducer, preloadedState, enhancer)
        var dispatch = store.dispatch
        var chain = []

        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        }
        chain = middlewares.map((middleware) => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        return { ...store, dispatch }
    }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg
    }

    if (funcs.length === 1) {
        //只需要执行一个函数，把函数执行，把其结果返回即可
        return funcs[0]
    }
    // 多个函数执行时，利用reduce去递归处理这些函数
    return funcs.reduce(
        (a, b) =>
            (...args: any) =>
                a(b(...args))
    )
}
```
