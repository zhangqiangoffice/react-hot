import React from 'react'
import { Icon } from 'antd-mobile';
import style from './asset/css/index.less'

const TitleBar = ({title, step, isEdit, staffId, onGoBack}) => (
  <div className={style.title_bar}>
    <Icon  className={style.goBack} type={require('./asset/svg/goBack.svg')} onClick={e => onGoBack(step - 1, isEdit, staffId)} id="go_back"/>
    <h1>{title}</h1>
  </div>
)

export default TitleBar