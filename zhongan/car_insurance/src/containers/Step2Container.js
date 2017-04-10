import { connect } from 'react-redux'
import { changeHolderType, checkCarData } from '../actions'
import Step2 from '../components/Step2'

const mapStateToProps = (state) => ({
  step: state.step,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeHolderType: (option) => {
    dispatch(changeHolderType(option))
  },
  onGoToStep: () => {
    dispatch(checkCarData())
    // dispatch(goToStep(3))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2)

export default Container