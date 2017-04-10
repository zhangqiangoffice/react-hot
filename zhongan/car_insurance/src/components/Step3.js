import React from 'react'
import TitleBarStepContainer from '../containers/TitleBarStepContainer'
import CarInfoContainer from '../containers/CarInfoContainer'
import NumContainer from '../containers/NumContainer'
import HolderContainer from '../containers/HolderContainer'
import CompanyContainer from '../containers/CompanyContainer'
import HolderTypeContainer from '../containers/HolderTypeContainer'
import ContactContainer from '../containers/ContactContainer'
import ProductContainer from '../containers/ProductContainer'
import LoadingContainer from '../containers/LoadingContainer'
import Navigation from './Navigation'
import SubTitle from './SubTitle'
import InsureItemCard from './InsureItemCard'
import BlankLi from './BlankLi'
import { Link } from 'react-router'


const OutPut = ({step, holderType, onGoToStep}) => (
  <div>
    <TitleBarStepContainer />
    <Navigation step={step}/>

    <SubTitle title="投保类型" />
    <HolderTypeContainer />

    <SubTitle title="投保产品信息" />
    <ProductContainer />

    <SubTitle title="被保对象信息" />
    <CarInfoContainer />

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

    <button className="next_btn" onClick={onGoToStep}>下一步</button>

    <LoadingContainer />


  </div>
)

export default OutPut