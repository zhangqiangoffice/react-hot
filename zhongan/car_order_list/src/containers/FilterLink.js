import { connect } from 'react-redux'
import { askOrders, changeStatus } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.status === state.visibilityFilter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(changeStatus(ownProps.status))
    dispatch(askOrders())
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink