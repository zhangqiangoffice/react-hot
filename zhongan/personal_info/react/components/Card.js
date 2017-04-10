import React from 'react'

const OutPut = ({ index, card, onChangInput}) => {
  
  return (
    <div className="ankang">
      <p>
        <input type="text" placeholder="请输入卡号" value={card.insuranceId} onChange={e => onChangInput(index, 'insuranceId', (e.target.value).trim())}/>
      </p>
      <p>
        <input type="text" placeholder="请输入密码" value={card.password} onChange={e => onChangInput(index, 'password', (e.target.value).trim())}/>
      </p>
    </div>
  )

}

export default OutPut