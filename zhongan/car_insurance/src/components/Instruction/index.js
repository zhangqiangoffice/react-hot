import React from 'react'
import TitleBarInstructionContainer from '../../containers/TitleBarInstructionContainer'
import Tab from './Tab'
import Footer from './Footer'
import { Link } from 'react-router'
import style from '../asset/css/index.less'


const Instruction = ({onGoToStep}) => (
  <div>
    <TitleBarInstructionContainer />
    <img className={style.top_img} src={require('../asset/img/instruction.png')}/>
    <div className={style.words}><p>驾乘意外伤害险</p><span>车主必备保障 没份低至90元</span></div>
    <Tab />
    <Footer />
    <ul className={style.bottom_btns} >
      <li>价格：￥90</li>
      <li><Link to={'/step1'} onClick={onGoToStep}>购买该产品</Link></li>
    </ul>
  </div>
)

export default Instruction