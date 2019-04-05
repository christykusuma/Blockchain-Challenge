import AddressPage from '../components/AddressPage'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import withProps from 'recompose/withProps'
import { fetchAddress } from '../addressActions.js'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    searchAddress: () => {
        dispatch(fetchAddress())
    },
})

const props = withProps(_ => ({
}))

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    searchAddress: () => {
        console.log('searching for address...')
        dispatchProps.searchAddress()
    }
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    ),
    props
)(AddressPage)