import React from 'react'
import TitleBarInstructionContainer from '../containers/TitleBarInstructionContainer'
import SubTitle from './SubTitle'
import { Link } from 'react-router'


const Instruction = ({onGoToStep}) => (
  <div>
    <TitleBarInstructionContainer />
    <img className="top_img" src={ctx + '/static/img/zhongan/car_insurance/instruction.png'}/>
    <SubTitle title="产品方案" />
    <table className="product_plan">
      <thead>
        <tr>
          <th>产品计划</th>
          <th>使用性质</th>
          <th>座位数</th>
          <th>保费（每份）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>5座及以下客车</td>
          <td>非营运</td>
          <td>2-5座</td>
          <td>90</td>
        </tr>
        <tr>
          <td>6-9座客车</td>
          <td>非营运</td>
          <td>6-9座</td>
          <td>100</td>
        </tr>
        <tr>
          <td>5座及以下客车</td>
          <td>营运</td>
          <td>2-5座</td>
          <td>110</td>
        </tr>
        <tr>
          <td>6-9座客车</td>
          <td>营运</td>
          <td>6-9座</td>
          <td>120</td>
        </tr>
        <tr>
          <td>2吨及以下货车</td>
          <td>非营运/<br/>营运</td>
          <td>2-5座</td>
          <td>180</td>
        </tr>
        <tr>
          <td>2吨及以上~10吨货车</td>
          <td>非营运/<br/>营运</td>
          <td>2-3座</td>
          <td>200</td>
        </tr>
        <tr>
          <td>10吨以上货车</td>
          <td>非营运/<br/>营运</td>
          <td>2-3座</td>
          <td>200</td>
        </tr>
        <tr>
          <td>特种车二和三（专用车）</td>
          <td>非营运/<br/>营运</td>
          <td>1-3座</td>
          <td>130</td>
        </tr>
        <tr>
          <td>特种车一</td>
          <td>非营运/<br/>营运</td>
          <td>2-3座</td>
          <td>160</td>
        </tr>
        <tr>
          <td>特种车四或其他特种车</td>
          <td>非营运/<br/>营运</td>
          <td>2-3座</td>
          <td>200</td>
        </tr>
      </tbody>
    </table>
    <SubTitle title="核保定义" />
    <div className="blank">
      1、非营运车辆是指不以直接或间接方式收取运费、租金或其他收入的车辆；<br/>
      2、营运车辆是指以直接或间接方式收取运费、租金或其他收入的车辆；<br/>
      3、客车是指以载运人员为主要使用用途的车辆；<br/>
      4、货车是指以载运货物为主要使用用途的车辆（挂车，重型半挂牵引车属于货车）；<br/>
      5、特种车二和三(专用车): 特种车二：专用净水车、特种车一以外的罐式货车，以及用于清障、清扫、清洁、起重、装卸、升降、搅拌、挖掘、推土、冷藏、保温等的各种专用机动车； 特种车三：装有固定专用仪器设备从事专业工作的监测、消防、运钞、医疗、电视转播等的各种专用机动车；<br/>
      6、特种车一：油罐车、汽罐车、液罐车；<br/>
      7、特种车四及拖拉机 特种车四：集装箱拖头。 拖拉机：兼用型拖拉机和运输型拖拉机； 兼用性拖拉机：为保监会公布的《机动车交通事故责任强制保险费率方案中 农用型拖拉机的定义，是指以田间作业为主，通过铰接连接牵引挂车可进行运输作业的拖拉机。兼用型拖拉机包括各种收割机运输型拖拉机：指货箱与底盘一体，不通过牵引挂车可运输作业的拖拉机。<br/>
      8、车辆类型以车辆行驶证标明的车辆类型为准；<br/>
      9、车辆座位数以车辆行驶证标明的核定载人数为准；<br/>
      10、货车吨位数以车辆行驶证标明的核定载质量为准。
    </div>
    <Link to={'/step1'}><button className="bottom_btn" onClick={onGoToStep}>购买该产品</button></Link>
  </div>
)

export default Instruction