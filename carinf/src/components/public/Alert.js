import React, {Component} from 'react';
import { Modal } from 'antd-mobile';

export default class Out extends Component {

  render() {
    if (!this.props.isShow) {
      return null
    }

    return (
      <Modal
          title={'提示：'}
          transparent
          maskClosable={false}
          visible={true}
          footer={[{ text: '确定', onPress: this.props.onClose}]}
          platform="android"
        >
          {this.props.message}
        </Modal>
    );
  }
}
