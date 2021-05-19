// 把 虚拟dom 转化成 真实dom

export function mountElement(vnode, container) {
    const { tag, props, children } = vnode
    const el = document.createElement(tag)
    if (props) {
        for(const key in props) {
            const val = props[key]
            el.setAttribute(key, val)
        }
    }

    if (typeof children === 'string') {
        const testNode = document.createTextNode(children)
        el.append(testNode)
    } else if (Array.isArray(children)) {
        children.forEach(v => {
            mountElement(v, el)
        })
    }

    container.append(el)
}