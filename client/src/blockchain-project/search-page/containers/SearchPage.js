import SearchPage from '../components/SearchPage'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import withProps from 'recompose/withProps'
import { fetchAddress } from '../searchActions.js'

const mapStateToProps = state => ({
    search: state.search
})

const mapDispatchToProps = dispatch => ({
    searchAddress: (address) => {
        dispatch(fetchAddress(address))
    },
})

const props = withProps(_ => ({
}))

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    searchAddress: (address) => {
        dispatchProps.searchAddress(address)
    }
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    ),
    props
)(SearchPage)