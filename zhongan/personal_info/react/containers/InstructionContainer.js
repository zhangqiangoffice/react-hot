import { connect } from 'react-redux'
import { goToStep } from '../actions'
import Instruction from '../components/Instruction'

const mapDispatchToProps = (dispatch) => ({
  onGoToStep: () => {
    dispatch(goToStep(1))
  }
})

const InstructionContainer = connect(
  null,
  mapDispatchToProps
)(Instruction)

export default InstructionContainer