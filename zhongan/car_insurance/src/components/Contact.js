import React from 'react'
import BlankLi from './BlankLi'
import InputBox from './InputBox'
import ClickDiv from './ClickDiv'
import data from '../reducers/data.json'
import style from './asset/css/index.less'

const OutPut = ({ justRead, contactPeople, contactCertiType, contactCertiNo, contactPhone, contactEmail, onChangeContactPeople, onChangeContactCertiNo, onChangeContactPhone, onChangeContactEmail, onShowContactCertiTypeBox}) => (
  <ul className="coat_ul">
    <BlankLi item="联系人姓名">
      {justRead ? contactPeople :
      <InputBox val={contactPeople} onChangeVal={onChangeContactPeople}/>
      }
    </BlankLi>
    <BlankLi item="证件类型">
      {justRead ? data.ContactCertiType[contactCertiType] :
      <ClickDiv val={data.ContactCertiType[contactCertiType]} onClickHandler={e => onShowContactCertiTypeBox(data.ContactCertiType, contactCertiType, 'ContactCertiType')}/>
      }
    </BlankLi>
    <BlankLi item="证件号码">
      {justRead ? contactCertiNo :
      <InputBox val={contactCertiNo} onChangeVal={onChangeContactCertiNo}/>
      }
    </BlankLi>
    <BlankLi item="联系人电话">
      {justRead ? contactPhone :
      <InputBox val={contactPhone} onChangeVal={onChangeContactPhone}/>
      }
    </BlankLi>
    <BlankLi item="联系邮箱">
      {justRead ? contactEmail :
      <InputBox val={contactEmail} onChangeVal={onChangeContactEmail} tip="用于接收电子保单"/>
      }
    </BlankLi>
    
  </ul>
)

export default OutPut