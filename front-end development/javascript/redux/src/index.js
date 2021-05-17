import { reducer } from './reducer.js'

export const createStore = () => {
    let currentState = {}
    let collect = []

    // 为了初始化 redux
    // 如果不触发 reducer 里面的初始化的话，对相关值进行操作就会得到 NaN
    dispatch([])

    function getState() {
        return currentState
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        collect.forEach(tempFunc => tempFunc())
    }

    function subscribe(tempFunc) {
        if (fn instanceof Function) {
            collect.push(tempFunc)
        }
        return
    }

    return { getState, dispatch, subscribe }
}