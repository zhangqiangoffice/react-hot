import React, {Component} from 'react';
import Alert from '../public/Alert'

export default class theTitleBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert : false,
    }

    this.toggleAlert = this.toggleAlert.bind(this)
    this.goBack = this.goBack.bind(this)
  };

  //切换提示框显隐
  toggleAlert() {
    this.setState(prevState => ({
      showAlert: !prevState.showAlert
    }));
  }

  // 后退一步
  goBack() {
    if (!window.minsheng) {
      this.toggleAlert()
    } else {
      window.minsheng.clickOnAndroid();
    }
  }

  render() {
    return (
      <div className="title_bar">
        <button type="button" onClick={this.goBack} id="go_back"> </button>
        <h1>{this.props.title}</h1>
        <Alert isShow={this.state.showAlert} message="请使用手机的返回键" onClose={this.toggleAlert} />
      </div>
    );
  };

}