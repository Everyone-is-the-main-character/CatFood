import { reactive } from './reactivity/index.js'
import { h } from './h.js'

const App = {
    render(context) {
        // 构建试图
        return (
            h('div', { id: 'ok' }, [
                h('ul', {}, [
                    h('li', {}, '1'),
                    h('li', {}, '2'),
                    h('li', {}, '3'),
                    h('li', {}, '4'),
                ])
            ])
        )
    },
    setup() {
        const state = reactive({
            count: 0
        })

        return { state }
    }
}

export default App