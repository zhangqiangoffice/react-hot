import React from 'react'
import BlankLi from './BlankLi'
import InputBox from './InputBox'
import ClickDiv from './ClickDiv'
import data from '../reducers/data.json'
import style from './asset/css/index.less'

const OutPut = ({ justRead, companyName, companyCertiType, companyCertiNo, companyProvinceName, companyCityName, companyCountryName, companyAddress, onChangeCompanyName, onChangeCompanyCertiNo, onChangeCompanyAddress, onShowCompanyCertiTypeBox, onShowLiSelectBox}) => (
  <ul className="coat_ul">
    <BlankLi item="企业名称">
      {justRead ? companyName :
      <InputBox val={companyName} onChangeVal={onChangeCompanyName}/>
      }
    </BlankLi>
    <BlankLi item="证件类型">
      {justRead ? data.CompanyCertiType[companyCertiType] :
      <ClickDiv val={data.CompanyCertiType[companyCertiType]} onClickHandler={e => onShowCompanyCertiTypeBox(data.CompanyCertiType, companyCertiType, 'CompanyCertiType')}/>
      }
    </BlankLi>
    <BlankLi item="证件号码">
      {justRead ? companyCertiNo :
      <InputBox val={companyCertiNo} onChangeVal={onChangeCompanyCertiNo}/>
      }
    </BlankLi>
    <BlankLi item="所在省份">
      {justRead ? companyProvinceName :
      <ClickDiv val={companyProvinceName} onClickHandler={e => onShowLiSelectBox('province')}/>
      }
    </BlankLi>
    <BlankLi item="所在城市">
      {justRead ? companyCityName :
      <ClickDiv val={companyCityName} onClickHandler={e => onShowLiSelectBox('region')}/>
      }
    </BlankLi>
    <BlankLi item="所在区县">
      {justRead ? companyCountryName :
      <ClickDiv val={companyCountryName} onClickHandler={e => onShowLiSelectBox('county')}/>
      }
    </BlankLi>
    <BlankLi item="详细地址">
      {justRead ? companyAddress :
      <InputBox val={companyAddress} onChangeVal={onChangeCompanyAddress}/>
      }
    </BlankLi>
    
  </ul>
)

export default OutPut