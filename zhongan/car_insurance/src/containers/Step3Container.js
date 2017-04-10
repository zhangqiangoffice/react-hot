import { connect } from 'react-redux'
import { changeHolderType, goToStep, sendData, changeIsLoading } from '../actions'
import Step3 from '../components/Step3'

const mapStateToProps = (state) => ({
  step: state.step,
  holderType: state.holderType,
  
})

const mapDispatchToProps = (dispatch) => ({
  onChangeHolderType: (option) => {
    dispatch(changeHolderType(option))
  },
  onGoToStep: () => {
    dispatch(sendData())
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3)

export default Container