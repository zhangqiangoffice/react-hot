import React from 'react'
import TitleBarStepContainer from '../containers/TitleBarStepContainer'
import OrderContainer from '../containers/OrderContainer'
import Navigation from './Navigation'
import style from './asset/css/index.less'


const OutPut = ({step, sumPremium, onGoToStep}) => (
  <div>
    <TitleBarStepContainer />
    <Navigation step={step}/>

    <OrderContainer />

    <div className="total">
      应付金额：<span>{sumPremium}</span>
    </div>

    <button type="button" className={style.next_btn} onClick={onGoToStep}>去支付</button>

  </div>
)

export default OutPut