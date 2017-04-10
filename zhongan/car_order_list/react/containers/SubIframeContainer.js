import { connect } from 'react-redux'
import SubIframe from '../components/SubIframe'

const mapStateToProps = (state) => ({
  workNum: state.workNum,
})

const SubIframeContainer = connect(
  mapStateToProps
)(SubIframe)

export default SubIframeContainer