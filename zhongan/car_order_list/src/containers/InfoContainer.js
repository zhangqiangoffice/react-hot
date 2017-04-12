import { connect } from 'react-redux'
import { getPolicyUrl } from '../actions'
import Info from '../components/Info'

const mapStateToProps = (state) => ({
  entity: state.entity,
})

const mapDispatchToProps = (dispatch, state) => ({
  onGetPolicyUrl: () => {
    dispatch(getPolicyUrl())
  }
})
  
const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Info)

export default Container