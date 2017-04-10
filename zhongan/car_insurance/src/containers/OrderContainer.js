import { connect } from 'react-redux'
import Order from '../components/Order'
import data from '../reducers/data.json'
import { getTotalFee } from '../api'

const mapStateToProps = (state) => ({
  insuredId: state.insuredId,
  fee: (getTotalFee(state.carType, state.usingType, state.applyNum) / data.ApplyNum[state.applyNum]).toFixed(2),
  applyNum: data.ApplyNum[state.applyNum],
})

const HolderContainer = connect(
  mapStateToProps
)(Order)

export default HolderContainer