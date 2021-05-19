// import { mountElement } from './renderer/index.js'
export function h(tag, props, children) {
    // mountElement(tag, props, children)
    return {
        tag, props, children
    }
}