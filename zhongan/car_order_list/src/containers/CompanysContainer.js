import { connect } from 'react-redux'
import { changeInsuranceCom, askOrders } from '../actions'
import Companys from '../components/Companys'

const mapStateToProps = (state) => ({
  insuranceCom: state.insuranceCom,
  isShow: state.showCompanysSelector,
})

const mapDispatchToProps = (dispatch, state) => ({
  onClick: (comId, comName) => {
    dispatch(changeInsuranceCom(comId, comName))
    if (comId !== 1) {
      dispatch(askOrders())
    }
  }
})
  
const CompanysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Companys)

export default CompanysContainer