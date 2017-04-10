import { connect } from 'react-redux'
import { showCompanysSelector } from '../actions'
import TitleBar from '../components/TitleBar'

const mapStateToProps = (state) => ({
  title: '订单详情'
})

const mapDispatchToProps = (dispatch) => ({
  onShow: () => {
    dispatch(showCompanysSelector())
  },
  goBack: () => {
    window.location.href = '#/'
  }
})

const TitleBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default TitleBarContainer