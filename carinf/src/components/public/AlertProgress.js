import React, {Component} from 'react';
import { Modal } from 'antd-mobile';
import ProgressBar from './ProgressBar';
import AppActionCreators from '../../actions/AppActionCreators';

export default class DatePic extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isShow: this.props.isShow,
        message: this.props.message,
      };

      this.onClose = this.onClose.bind(this);
  };

  onClose() {
    AppActionCreators.closeAlertProgress()
  }

  render() {
    if (!this.props.isShow) {
      return null
    }

    let title = '数据正在请求中...'
    let btns = []
    if (this.props.message) {
      title = '请求失败！'
      btns = [{ text: '确定', onPress: this.onClose }]
    } else if (this.props.isFinished) {
      title = '请求完成'
    }

    return (
      <Modal
          title={title}
          transparent
          maskClosable={false}
          visible={true}
          onClose={this.onClose}
          footer={btns}
          platform="android"
        >
          <ProgressBar  isShow={this.state.isShow} message={this.props.message} isFinished={this.props.isFinished}/>
        </Modal>
    );
  }
}
