import { connect } from 'react-redux'
import { showCompanysSelector, postDeleteList } from '../actions'
import TitleBar from '../components/TitleBar'

const mapStateToProps = (state) => ({
  title: '我的订单'
})

const mapDispatchToProps = (dispatch) => ({
  onShow: () => {
    dispatch(showCompanysSelector())
  },
  goBack: () => {
    dispatch(postDeleteList())
    if (!window.minsheng) {
      alert('请使用手机的返回键');
    } else {
      window.minsheng.clickOnAndroid();
    }
  }
})

const TitleBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default TitleBarContainer