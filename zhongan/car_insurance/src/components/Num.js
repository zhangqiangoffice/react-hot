import React from 'react'
import BlankLi from './BlankLi'
import ClickDiv from './ClickDiv'
import data from '../reducers/data.json'
import { getTotalFee } from '../api'
import style from './asset/css/index.less'

const OutPut = ({ applyNum, carType, usingType, onShowSelector}) => {
  let totalFee = getTotalFee(carType, usingType, applyNum)
  
  return (
    <ul className="coat_ul">
      <BlankLi item="份数">
        <ClickDiv val={data.ApplyNum[applyNum]} onClickHandler={e => onShowSelector(data.ApplyNum, applyNum, 'ApplyNum')}/>
      </BlankLi>
      <BlankLi item="保费">
        {totalFee}元
      </BlankLi>
  
    </ul>
  )

}

export default OutPut