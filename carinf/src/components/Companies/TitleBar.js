import React, {Component} from 'react';
import TitleBar from '../public/TitleBar';
import { Toast } from 'antd-mobile';

export default class Out extends TitleBar {

  // 后退一步
  goBack() {
    if (!window.minsheng) {
      Toast.info('请使用手机的返回键', 2)
    } else {
      window.minsheng.clickOnAndroid();
    }
  }

}