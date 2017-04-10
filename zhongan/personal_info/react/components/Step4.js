import React from 'react'
import TitleBarStepContainer from '../containers/TitleBarStepContainer'
import OrderContainer from '../containers/OrderContainer'
import CardsContainer from '../containers/CardsContainer'
import Navigation from './Navigation'
import ZACashier from './ZACashier'
import BlankLi from './BlankLi'
import ClickDiv from './ClickDiv'
import LoadingContainer from '../containers/LoadingContainer'
import { Link } from 'react-router'

const OutPut = ({step, applyNum, insuredId, sumPremium, url, isZACashier, isOtherWay, balance, onGoToZACashier, onChangeIsOtherWay, onGoToStep}) => (

  <div>
    <TitleBarStepContainer />
    <Navigation step={step}/>

    <div className="total">
      应付金额：<span>{sumPremium}</span>({applyNum}份)
    </div>

    <ul className="coat_ul">
      <BlankLi item="众安收银台">
        <ClickDiv val={'(可用)'} isOpen={isZACashier} onClickHandler={e => (onGoToZACashier())}/>
      </BlankLi>
      {isZACashier ? <ZACashier insuredId={insuredId} url={url} applyNum={applyNum}/> : null}
      <BlankLi item="其他支付方式">
        <ClickDiv val={'(钱包+卡单)'} isOpen={isOtherWay} onClickHandler={e => (onChangeIsOtherWay())}/>
      </BlankLi>
      {isOtherWay ? <CardsContainer /> : null}
    </ul>
    
    <LoadingContainer />
  </div>

)

export default OutPut