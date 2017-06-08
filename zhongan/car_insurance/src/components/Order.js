import React from 'react'
import BlankLi from './BlankLi'
import InputBox from './InputBox'
import ClickDiv from './ClickDiv'
import style from './asset/css/index.less'

const OutPut = ({ insuredId, fee, applyNum}) => {

  return (
    <ul className="coat_ul">
      <BlankLi item="订单编号">
        {insuredId}
      </BlankLi>
      <BlankLi item="商品名称">
        众安驾乘意外险
      </BlankLi>
      <BlankLi item="商品单价">
        {fee}
      </BlankLi>
      <BlankLi item="购买份数">
        {applyNum} 份
      </BlankLi>
      
    </ul>
  )
}

export default OutPut