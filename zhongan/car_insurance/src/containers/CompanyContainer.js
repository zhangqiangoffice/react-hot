import { connect } from 'react-redux'
import { changeCompanyName, changeCompanyCertiNo, changeCompanyAddress, showSelector, showLiSelector } from '../actions'
import Company from '../components/Company'

const mapStateToProps = (state) => ({
  companyName: state.companyName,
  companyCertiType: state.companyCertiType,
  companyCertiNo: state.companyCertiNo,
  companyProvinceName: state.companyProvinceName,
  companyCityName: state.companyCityName,
  companyCountryName: state.companyCountryName,
  companyAddress: state.companyAddress,
  justRead: state.step === 3,

})

const mapDispatchToProps = (dispatch) => ({
  onChangeCompanyName: (val) => {
    dispatch(changeCompanyName(val))
  },
  onChangeCompanyCertiNo: (val) => {
    dispatch(changeCompanyCertiNo(val))
  },
  onChangeCompanyAddress: (val) => {
    dispatch(changeCompanyAddress(val))
  },
  onShowCompanyCertiTypeBox: (options, index, target) => {
    dispatch(showSelector(options, index, target))
  },
  onShowLiSelectBox: (target) => {
    dispatch(showLiSelector(target))
  }
})

const HolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Company)

export default HolderContainer