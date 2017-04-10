import React from 'react'
import BlankLi from './BlankLi'
import InputBox from './InputBox'
import ClickDiv from './ClickDiv'
import data from '../reducers/data.json'

const OutPut = ({ justRead, carType, usingType, approvedSeats, vinNo, engineNumber, plateNumber, onChangeVinNo, onChangeEngineNumber, onChangePlateNumber, onShowSelector}) => (
  <ul className="coat_ul">
    <BlankLi item="车牌号">
      {justRead ? plateNumber :
      <InputBox val={plateNumber} onChangeVal={onChangePlateNumber}/>
      }
    </BlankLi>
    <BlankLi item="车辆类型">
      {justRead ? data.CarType[carType] :
      <ClickDiv val={data.CarType[carType]} onClickHandler={e => onShowSelector(data.CarType, carType, 'CarType')}/>
      }
    </BlankLi>
    <BlankLi item="使用性质">
      {justRead ? data.UsingType[usingType] : 
      <ClickDiv val={data.UsingType[usingType]} onClickHandler={e => onShowSelector(data.UsingType, usingType, 'UsingType')}/>
      }
    </BlankLi>
    <BlankLi item="座位数">
      {justRead ? data.ApprovedSeats[approvedSeats] :
      <ClickDiv val={data.ApprovedSeats[approvedSeats]} onClickHandler={e => onShowSelector(data.ApprovedSeats, approvedSeats, 'ApprovedSeats')}/>
      }
    </BlankLi>
    <BlankLi item="车架号">
      {justRead ? vinNo : 
      <InputBox val={vinNo} onChangeVal={onChangeVinNo}/>
      }
    </BlankLi>
    <BlankLi item="发动机号">
      {justRead ? engineNumber :
      <InputBox val={engineNumber} onChangeVal={onChangeEngineNumber}/>
      }
    </BlankLi>
    
  </ul>
)

export default OutPut