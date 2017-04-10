import React from 'react'
import Card from './Card'
import data from '../reducers/data.json'

const OutPut = ({ applyNum, balance, personPremium, cards, onChangePersonPremium, onChangInput, onSubmitCards}) => {
  let showList = cards.map((card, index) => { 
    if (index < applyNum - personPremium / 100) { 
      return (<Card key={index} index={index} card={card} onChangInput={onChangInput}/>)
    }
  })
  
  return (
    <li className="wallet_li">
      <span className="wallet">钱包 </span>
      <span className="balance">(￥{balance})</span>
      <div className="radios">
        <label><input type = "radio" name = "premium" value="0" checked={personPremium === 0} onChange={e => onChangePersonPremium(0)}/>0</label>
        {balance >= 100 ? <label><input type = "radio" name = "premium" checked={personPremium === 100} onChange={e => onChangePersonPremium(100)}/>100</label> : null}
        {applyNum >= 2 && balance >= 200 ? <label><input type = "radio" name = "premium"  checked={personPremium === 200} onChange={e => onChangePersonPremium(200)}/>200</label> : null}
        {applyNum > 2 && balance >= 300 ? <label><input type = "radio" name = "premium"  checked={personPremium === 300} onChange={e => onChangePersonPremium(300)}/>300</label> : null}
      </div>
      <div className="ankangs">
        <p>亲，可使用安康守护卡抵扣保费金额</p>
        <div className="ankangs_div">
          {showList}
        </div>
        <button type="button" className="next_btn" onClick={onSubmitCards}>下一步</button>
      </div>
    </li>
  )

}

export default OutPut