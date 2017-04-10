import { connect } from 'react-redux'
import { changeVinNo, changeEngineNumber, showSelector, changePlateNumber, getCarData } from '../actions'
import CarInfo from '../components/CarInfo'

const mapStateToProps = (state) => ({
  carType: state.carType,
  usingType: state.usingType,
  approvedSeats: state.approvedSeats,
  vinNo: state.vinNo,
  engineNumber: state.engineNumber,
  plateNumber: state.plateNumber,
  justRead: state.step === 3,

})

const mapDispatchToProps = (dispatch) => ({
  onChangeVinNo: (val) => {
    dispatch(changeVinNo(val.toUpperCase()))
  },
  onChangeEngineNumber: (val) => {
    dispatch(changeEngineNumber(val.toUpperCase()))
  },
  onChangePlateNumber: (val) => {
    if (val.length >2) {
      val = val.toUpperCase();
    }
    dispatch(changePlateNumber(val))
    if (val.length === 7) {
      dispatch(getCarData(val))
    }
  },
  onShowSelector: (options, index, target) => {
    dispatch(showSelector(options, index, target))
  }
})

const CarInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CarInfo)

export default CarInfoContainer