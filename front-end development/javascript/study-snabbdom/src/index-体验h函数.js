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
const myVNode1 = h('a', { props: { href: 'www.baidu.com'}}, 'Hello World')

const myVNode2 = h('div', {
    class: {
        box: true
    }
}, '我是第二个节点')

const myVNode3 = h('ul', { key: '23dws' }, [
    h('li', '西瓜'),
    h('li', '苹果')
])
console.log(myVNode3)

// 让虚拟节点上树
const container = document.querySelector('#container')
patch(container, myVNode3)

// const patch = init([
//     // Init patch function with chosen modules
//     classModule, // makes it easy to toggle classes
//     propsModule, // for setting properties on DOM elements
//     styleModule, // handles styling on elements with support for animations
//     eventListenersModule, // attaches event listeners
// ]);

// const container = document.getElementById("container");

// const someFn = () => {
//     console.log(123)
// }

// const anotherEventHandler = () => {
//     console.log(456)
// }

// const vnode = h("div#container.two.classes", { on: { click: someFn } }, [
//     h("span", { style: { fontWeight: "bold" } }, "This is bold"),
//     " and this is just normal text",
//     h("a", { props: { href: "/foo" } }, "I'll take you places!"),
// ]);
// // Patch into empty DOM element – this modifies the DOM as a side effect
// patch(container, vnode);

// const newVnode = h(
//     "div#container.two.classes",
//     { on: { click: anotherEventHandler } },
//     [
//         h(
//             "span",
//             { style: { fontWeight: "normal", fontStyle: "italic" } },
//             "This is now italic type"
//         ),
//         " and this is still just normal text",
//         h("a", { props: { href: "/bar" } }, "I'll take you places!"),
//     ]
// );
// // Second `patch` invocation
// patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state