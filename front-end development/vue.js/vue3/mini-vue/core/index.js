import { effectWatch } from './reactivity/index.js'
import { mountElement }  from './renderer/index.js'

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const context = rootComponent.setup()
            const isMounted = false
            let prevSubTree

            effectWatch(() => {
                if (!isMounted) {
                    // init
                    rootComponent.innerHTML = ''
                    const subTree = rootComponent.render(context)
                    prevSubTree = subTree
                    mountElement(subTree, rootContainer)
                } else {
                    const subTree = rootComponent.render(context)
                    diff(prevSubTree, subTree)
                    prevSubTree = subTree
                }
            })
        },
    }
}