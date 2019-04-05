import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import compose from 'recompose/compose'
import pure from 'recompose/pure'

const styleSheet = theme => ({
})

const style = injectSheet(styleSheet)

class AddressPage extends PureComponent {
    render() {
        const { searchAddress } = this.props

        return(
            <div>
                <button onClick={() => searchAddress()}>Click me</button>
            </div>
        )
    }
}

AddressPage.propTypes = {
}

AddressPage.defaultProps = {
}

export default compose(
    style,
    pure
)(AddressPage)