import { connect } from 'react-redux'
import { changeHolderName, changeHolderNo, showSelector, changeHolderGender, changeHolderBirthday, changeHolderPhone, changeHolderEmail } from '../actions'
import Holder from '../components/Holder'
import data from '../reducers/data.json'

const mapStateToProps = (state) => ({
  holderType: state.holderType,
  holderCertiType: state.holderCertiType,
  holderName: state.holderName,
  holderCertiNo: state.holderCertiNo,
  holderGender: state.holderGender,
  holderBirthday: state.holderBirthday,
  holderPhone: state.holderPhone,
  holderEmail: state.holderEmail,
  justRead: state.step === 3,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeHolderName: (val) => {
    dispatch(changeHolderName(val))
  },
  showHolderCertiTypeBox: (index) => {
    dispatch(showSelector(data.HolderCertiType, index, 'HolderCertiType'))
  },
  onChangeHolderNo: (val) => {
    dispatch(changeHolderNo(val))
    if (val.length === 18) {
      let year = val.substr(6, 4)
      let month = val.substr(10, 2)
      let day = val.substr(12, 2)
      let sex = val.substr(16, 1) - 0;
      dispatch(changeHolderBirthday(year + '-' + month + '-' + day))
      dispatch(changeHolderGender((sex + 1) % 2))
    }
  },
  onChangeHolderBirthday: (val) => {
    dispatch(changeHolderBirthday(val))
  },
  onChangeHolderPhone: (val) => {
    dispatch(changeHolderPhone(val))
  },
  onChangeHolderEmail: (val) => {
    dispatch(changeHolderEmail(val))
  },
  onChangeHolderGender: (option) => {
    dispatch(changeHolderGender(option))
  }

})

const HolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Holder)

export default HolderContainer