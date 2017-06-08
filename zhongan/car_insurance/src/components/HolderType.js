import React from 'react'
import BlankLi from './BlankLi'
import RadioSelector from './RadioSelector'
import data from '../reducers/data.json'
import style from './asset/css/index.less'


const OutPut = ({holderType, justRead, onChangeHolderType}) => (
  <ul className="coat_ul">
    <BlankLi item="投保人类型">
      {justRead ? data.HolderType[holderType] :
      <RadioSelector a={data.HolderType[0]} b={data.HolderType[1]} selected={holderType} onSelect={onChangeHolderType}/>
      }
    </BlankLi>
  </ul>
)

export default OutPut