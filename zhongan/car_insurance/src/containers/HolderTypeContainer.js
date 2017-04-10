import { connect } from 'react-redux'
import { changeHolderType } from '../actions'
import HolderType from '../components/HolderType'

const mapStateToProps = (state) => ({
  holderType: state.holderType,
  justRead: state.step === 3,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeHolderType: (option) => {
    dispatch(changeHolderType(option))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(HolderType)

export default Container