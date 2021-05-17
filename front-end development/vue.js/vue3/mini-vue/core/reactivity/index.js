// 响应式库

// 依赖
let currentEffect
class Dep {
    // 1. 收集依赖

    constructor(val) {
        this.effects = new Set()
        this._val = val
    }

    get value () {
        dep.depend()
        return this._val
    }

    set value (newValue) {
        this._val = newValue
        this.notice()
    }

    depend () {
        if (currentEffect) {
            this.effects.add(currentEffect)
        }
    }

    // 2. 触发依赖
    notice () {
        this.effects.forEach(effect => effect())
    }
}

const dep = new Dep(10)
export function effectWatch(effect) {
    // 收集依赖
    currentEffect = effect
    effect()
    currentEffect = null
}

const targetMap = new Map()

function getDep (target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }
    return dep
}

export function reactive (raw) {
    return new Proxy(raw, {
        get (target, key) {
            console.log(key)

            const dep = getDep(target, key)
            // 收集依赖
            dep.depend()

            return Reflect.get(target, key)
        },
        set (target, key, value) {
            const dep = getDep(target, key)
            const result = Reflect.set(target, key, value)
            dep.notice()
            return result
        }
    })
}



const App = {
    render(context) {
        // 构建试图
    },
    setup() {
        const state = reactive({
            count: 0
        })
        return { state }
    }
}
