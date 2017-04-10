import { connect } from 'react-redux'
import { changeHolderType, checkPayData } from '../actions'
import Step4 from '../components/Step4'
import { getTotalFee } from '../api'

const mapStateToProps = (state) => ({
  step: state.step,
  sumPremium: getTotalFee(state.carType, state.usingType, state.applyNum),
  url: state.url,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeHolderType: (option) => {
    dispatch(changeHolderType(option))
  },
  onGoToStep: () => {
    //去支付之前要先检查是否可支付
    dispatch(checkPayData());
    // dispatch(goToStep(4))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4)

export default Container