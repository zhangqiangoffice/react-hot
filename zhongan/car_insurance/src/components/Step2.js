import React from 'react'
import TitleBarStepContainer from '../containers/TitleBarStepContainer'
import CarInfoContainer from '../containers/CarInfoContainer'
import NumContainer from '../containers/NumContainer'
import SelectorContainer from '../containers/SelectorContainer'
import Navigation from './Navigation'
import SubTitle from './SubTitle'
import InsureItemCard from './InsureItemCard'
import { Link } from 'react-router'


const OutPut = ({step, onGoToStep}) => (
  <div>
    <TitleBarStepContainer />
    <Navigation step={step}/>

    <CarInfoContainer />

    <SubTitle title="保障责任信息" />

    <NumContainer />

    <InsureItemCard title="意外伤害险" rate="100" responsibility="人身意外伤害-身故、残疾" sum="100,000" deductible="" d_sum=""/>

    <InsureItemCard title="意外伤害医疗费用保险" rate="90" responsibility="意外医疗费用" sum="10,000" deductible="额（元）" d_sum="500"/>

    <InsureItemCard title="团体住院津贴保险" rate="100" responsibility="团体住院津贴" sum="30" deductible="天数（天）" d_sum={false}/>

    <button className="next_btn" onClick={onGoToStep}>下一步</button>

    <SelectorContainer />

  </div>
)

export default OutPut