import { connect } from 'react-redux'
import { changeHolderType, checkAPersonData, checkACompanyData } from '../actions'
import Step1 from '../components/Step1'

const mapStateToProps = (state) => ({
  step: state.step,
  holderType: state.holderType,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeHolderType: (option) => {
    dispatch(changeHolderType(option))
  },
  onGoToStep: (holderType) => {
    
    //投保类型为个人
    if (holderType === 0) {
      dispatch(checkAPersonData())
    //投保类型为企业
    } else {
      dispatch(checkACompanyData())
    }
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step1)

export default Container