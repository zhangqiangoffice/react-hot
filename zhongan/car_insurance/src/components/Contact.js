import React from 'react'
import BlankLi from './BlankLi'
import InputBox from './InputBox'
import ClickDiv from './ClickDiv'
import data from '../reducers/data.json'

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
      <input type="text" placeholder="用于接收接收电子保单" value={contactEmail} onChange={e => onChangeContactEmail((e.target.value).trim()) } />
      }
    </BlankLi>
    
  </ul>
)

export default OutPut