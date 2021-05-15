import vnode from "./vnode";
import createElement from './createElement.js'

export default function(oldVNode, newVNode) {
    // 判断传入的第一个参数是 DOM 节点还是虚拟节点
    if(oldVNode.sel === '' || oldVNode.sel === undefined) {
        // 如果是 DOM 节点，此时要包装为虚拟节点
        oldVNode = vnode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode)
    }
    console.log(oldVNode)
    console.log(newVNode)
    if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
        console.log('同一节点')
    } else {
        console.log('不是同一个节点，暴力删除旧节点，插入新节点')
        let newVNodeElm = createElement(newVNode)
        if (oldVNode.elm.parentNode && newVNodeElm) {
            oldVNode.elm.parentNode.insertBefore(newVNodeElm, oldVNode.elm)
        }

        oldVNode.elm.parentNode.removeChild(oldVNode.elm)
    }
}