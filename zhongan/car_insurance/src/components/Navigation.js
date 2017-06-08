import React from 'react';
import style from './asset/css/index.less'

const Navigation = ({step}) => (
  <div className={style.navigation}>
    <span>
      <img className={style["step" + step]} src={require(`./asset/img/step${step}.png`)} />
    </span>
  </div>
)

export default Navigation