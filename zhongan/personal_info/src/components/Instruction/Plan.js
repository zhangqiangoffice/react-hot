import React from 'react'
import SubTitle from './SubTitle'
import Condition from './Condition'
import style from '../asset/css/index.less'


const Instruction = ({onGoToStep}) => (

    <div>
      <SubTitle icon="bao" title="您的保障"/>
      <table className={style.product_plan}>
        <thead>
          <tr>
            <th>保障责任</th>
            <th>保险金额</th>
            <th>保障说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>意外身故残疾</td>
            <td>10万</td>
            <td></td>
          </tr>
          <tr>
            <td>意外医疗费用</td>
            <td>1万</td>
            <td>门急诊+住院<br/>免赔额100元/次<br/>100%赔付</td>
          </tr>
          <tr>
            <td>意外医疗住院津贴</td>
            <td>50/天</td>
            <td>无免赔天数<br/>最多180天</td>
          </tr>
        </tbody>
      </table>

      <SubTitle icon="condition" title="投保条件"/>
      <Condition />
      
    </div>
)

export default Instruction