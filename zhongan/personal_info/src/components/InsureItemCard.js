import React from 'react'

const OutPut = ({ title, rate, responsibility, sum, deductible, d_sum}) => (
  <div className="insure_item_card">
    <table className="top">
      <tbody>
        <tr>
          <td><span className="big">{title}</span><span className="item">保障项目</span></td>
          <td><span className="gray">赔付比例</span><span className="red">{rate}%</span></td>
        </tr>
      </tbody>
    </table>
    <table className="main">
      <tbody>
        <tr className="title">
          <td>保障责任</td>
          <td>保障金额/人（元）</td>
        </tr>
        <tr>
          <td>{responsibility}</td>
          <td>{sum}</td>
        </tr>
        {d_sum ? 
        <tr className="title">
          <td>次免赔{deductible}</td>
          <td></td>
        </tr>
        : null}
        {d_sum ? 
        <tr>
          <td>{d_sum}</td>
          <td></td>
        </tr>
        : null}
      </tbody>
    </table>
  </div>
)

export default OutPut