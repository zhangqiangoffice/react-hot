import { connect } from 'react-redux'
import { changeContactPeople, changeContactPhone, changeContactCertiNo, changeContactAddress, changeContactEmail, showSelector } from '../actions'
import Contact from '../components/Contact'

const mapStateToProps = (state) => ({
  contactPeople: state.contactPeople,
  contactPhone: state.contactPhone,
  contactCertiType: state.contactCertiType,
  contactCertiNo: state.contactCertiNo,
  contactEmail: state.contactEmail,
  justRead: state.step === 3,

})

const mapDispatchToProps = (dispatch) => ({
  onChangeContactPeople: (val) => {
    dispatch(changeContactPeople(val))
  },
  onChangeContactPhone: (val) => {
    dispatch(changeContactPhone(val))
  },
  onChangeContactCertiNo: (val) => {
    dispatch(changeContactCertiNo(val))
  },
  onChangeContactEmail: (val) => {
    dispatch(changeContactEmail(val))
  },
  onShowContactCertiTypeBox: (options, index, target) => {
    dispatch(showSelector(options, index, target))
  },
})

const HolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact)

export default HolderContainer