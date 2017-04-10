import { connect } from 'react-redux'
import * as act from '../actions'
import TitleBar from '../components/TitleBar'

const mapStateToProps = (state) => ({
  title: '卡单详情',
  isEdit: state.isEdit,
  staffId: state.staffId,
})

const mapDispatchToProps = (dispatch, state) => ({
  onGoBack: (toStep, isEdit, staffId) => {
    if (isEdit) {
      window.location.href = `../app_order_list?staffId=${staffId}`
    } else if (!window.minsheng) {
      alert('请使用手机的返回键');
    } else {
      window.minsheng.clickOnAndroid();
    }
  }
})
  
const TitleBarIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default TitleBarIndexContainer
