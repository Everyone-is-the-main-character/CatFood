import React from 'react'
import { connect } from './connect'

const mapStateToProps = state => {
    return {
        num: state.num
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNum: () => {
            dispatch({ type: 'add' })
        },
        lowNum: () => {
            dispatch({ type: 'low' })
        }
    }
}

class Roll extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button onClick={ ()=> this.props.lowNum() }>low</button>
                <div>{this.props.num}</div>
                <button onClick={ ()=> this.props.addNum() }>add</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roll)