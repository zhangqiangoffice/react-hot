import React from 'react'

const OutPut = ({ showSelector, selectorOptions, selectorSelected, selectorTarget, onSelect, onClose}) => {
  if (!showSelector) {
    return null
  }

  return (
    <div className="selector" onClick={onClose}>
      <ul>
        {selectorOptions.map((option, index) => 
          <li key={index} onClick={e => onSelect(selectorTarget, index)}>{option}<img src={ctx + '/static/img/carInf/radio_' + (index === selectorSelected ? 'on' : 'off') + '.png'} /></li> 
        )}
      </ul>
    </div>
  )
}

export default OutPut