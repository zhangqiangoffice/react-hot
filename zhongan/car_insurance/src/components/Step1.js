import React from 'react'
import TitleBarStepContainer from '../containers/TitleBarStepContainer'
import HolderContainer from '../containers/HolderContainer'
import HolderTypeContainer from '../containers/HolderTypeContainer'
import SelectorContainer from '../containers/SelectorContainer'
import LiSelectorContainer from '../containers/LiSelectorContainer'
import ContactContainer from '../containers/ContactContainer'
import CompanyContainer from '../containers/CompanyContainer'
import ProductContainer from '../containers/ProductContainer'
import Navigation from './Navigation'
import BlankLi from './BlankLi'
import RadioSelector from './RadioSelector'
import SubTitle from './SubTitle'
import InputBox from './InputBox'
import ClickDiv from './ClickDiv'
import { Link } from 'react-router'


const Step1 = ({step, holderType, onChangeHolderType, onGoToStep}) => (
  <div>
    <TitleBarStepContainer />
    <Navigation step={step}/>

    <HolderTypeContainer />

    <SubTitle title="投保产品信息" />

    <ProductContainer />


    {holderType ? 
        <div>
            <SubTitle title="投保企业信息" />
            <CompanyContainer />
            <SubTitle title="投保企业联系人" />
            <ContactContainer />
        </div>
        :
        <div>
            <SubTitle title="投保人信息" />
            <HolderContainer />
        </div>
    }

    <button className="next_btn" onClick={e => onGoToStep(holderType)}>下一步</button>

    <SelectorContainer />
    <LiSelectorContainer />

  </div>
)

export default Step1