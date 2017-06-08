import React from 'react'
import SubTitle from './SubTitle'
import style from '../asset/css/index.less'


const Instruction = ({onGoToStep}) => (

    <div>
      <SubTitle icon="bao" title="您的保障"/>
      <table className={style.product_plan}>
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
      
    </div>
)

export default Instruction