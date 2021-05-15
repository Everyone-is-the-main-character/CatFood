import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";

// 创建出 patch 函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

// 创建虚拟节点
const myVNode1 = h('ul', {  }, [
    h('li', { key: 'A' } , 'A'),
    h('li', { key: 'B' } , 'B'),
    h('li', { key: 'C' } , 'C'),
    h('li', { key: 'D' } , 'D'),
    h('li', { key: 'E' } , 'E'),
])

const myVNode2 = h('ul', {  }, [
    h('li', { key: 'F' } , 'F'),
    h('li', { key: 'A' } , 'A'),
    h('li', { key: 'B' } , 'B'),
    h('li', { key: 'C' } , 'C'),
    h('li', { key: 'D' } , 'D'),
    h('li', { key: 'E' } , 'E'),
])

const myVNode3 = h('ol', {  }, [
    h('li', { key: 'A' } , 'A'),
    h('li', { key: 'B' } , 'B'),
    h('li', { key: 'C' } , 'C'),
    h('li', { key: 'D' } , 'D'),
    h('li', { key: 'E' } , 'E'),
])


const container = document.querySelector('#container')
const btn = document.querySelector('#btn')

patch(container, myVNode1)

btn.onclick = function() {
    console.log('触发事件')
    // patch(myVNode1, myVNode2)
    patch(myVNode1, myVNode3)
}