import React from 'react'
import style from './asset/css/index.less'

const ClickDiv = ({val, onClickHandler}) => (
  <div className={style.click_div} onClick={onClickHandler}>
    {val === '' || val === undefined || val === null ? <span>请选择</span> : val}
  </div>
)

export default ClickDiv