// connect函数实际上接收了一个组件作为参数，
// 最后返回一个新的组件，也就是我们常说的HOC（高阶组件）
import React from 'react'
import PropTypes from 'prop-types'

export function connect(mapStateToProps, mapDispatchToProps) {
    // 1. 传入 state 和 dispatch 对象
    return function(WrappedComponent) {
        // 2. 接收传入的组件
        class Connect extends React.Component {
            constructor() {
                super()
                this.state = {
                    // 3. 将所有的 props 整合在一个对象上，方便书写
                    mapStateAndDispatchProps: {}
                }
            }

            static contextTypes = {
                // 4. 获取 context 里的 store
                store: PropTypes.object
            }

            componentDidMount() {
                const { store } = this.context
                this.mergeAndUpdateProps()
                store.subscribe(() => {
                    this.mergeAndUpdateProps()
                })
            }

            mergeAndUpdateProps() {
                const { store } = this.context
                let tempState =
                    mapStateToProps
                    ? mapStateToProps(store.getState(), this.props)
                        : {}
                let tempDispatch =
                    mapDispatchToProps
                    ? mapDispatchToProps(store.dispatch, this.props)
                        : {}
                this.setState({
                    mapStateAndDispatchProps: {
                        ...tempState,
                        ...tempDispatch,
                        ...this.props
                    }
                })
            }

            render() {
                return <WrappedComponent { ...this.state,mapStateAndDispatchProps } ></WrappedComponent>
            }
        }

        // 返回新组件
        return Connect
    }
}