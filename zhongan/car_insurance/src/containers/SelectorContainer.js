import { connect } from 'react-redux'
import { closeSelector, changeHolderCertiType, changeContactCertiType, changeCompanyCertiType, changeCarType, changeUsingType, changeApprovedSeats, changeApplyNum } from '../actions'
import Selector from '../components/Selector'

const mapStateToProps = (state) => ({
  selectorOptions: state.selectorOptions,
  selectorSelected: state.selectorSelected,
  showSelector: state.showSelector,
  selectorTarget: state.selectorTarget,
})

const mapDispatchToProps = (dispatch) => ({
  onSelect: (target, index) => {
    switch(target) {
      case 'HolderCertiType':
        dispatch(changeHolderCertiType(index))
        break;
      case 'ContactCertiType':
        dispatch(changeContactCertiType(index))
        break;
      case 'CompanyCertiType':
        dispatch(changeCompanyCertiType(index))
        break;
      case 'CarType':
        dispatch(changeCarType(index))
        break;
      case 'UsingType':
        dispatch(changeUsingType(index))
        break;
      case 'ApprovedSeats':
        dispatch(changeApprovedSeats(index))
        break;
      case 'ApplyNum':
        dispatch(changeApplyNum(index))
        break;
      default:
        break;
    }
  },
  onClose: () => {
    dispatch(closeSelector())
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Selector)

export default Container