import h from './mySnabbdom/h.js'
import patch from './mySnabbdom/patch.js'

// const myVNode1 = h('div', {}, 'Hello World')
const myVNode1 = h('ol', {}, [
    h('li', {}, [
        h('p', {} , 'op'),
        h('p', {} , 'op'),
        h('p', {} , 'op'),
        h('p', {} , 'op'),
        h('p', {} , 'op'),
    ])
])

const myVNode2 = h('h1', {}, '新的节点')

const container = document.querySelector('#container')

const btn = document.querySelector('#btn')
btn.onclick = () => {
    patch(myVNode1, myVNode2)
}

patch(container, myVNode1)

