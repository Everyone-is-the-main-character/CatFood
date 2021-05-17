import React from 'react'
import PropTypes from 'prop-types'

export class Provider extends React.Component {
    // 声明Context对象属性
    static childContextTypes = {
        store: PropTypes.object,
        children: PropTypes.object
    }
    // 返回Context对象中的属性
    getChildContext = () => {
        return {
            store: this.props.store
        }
    }

    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}