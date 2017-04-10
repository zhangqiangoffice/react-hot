import React from 'react'
import data from '../reducers/data.json'

const OutPut = ({ isShow, step, title, btn, indName, list, onClickBtn, onClickInd, onClickJob }) => {
  if (!isShow) {
    return null
  } 

  let listShows = null;
  if (step === 0) {
    listShows = list.map((ind, index) => {
      return (<li key={index} onClick={e => onClickInd(index)}>{ind.name}</li>)
    })

  } else {
    listShows = list.map((job, index) => {
      if (job.class !== '拒保') {
        return (
          <li key={index} onClick={e => onClickJob(`${job.name}(${job.class}类)`, `${indName}|${job.name}(${job.class}类)|${job.detail}`)}>
            <span>{`${job.name}(${job.class}类)`}</span>
            <p>{job.detail}</p>
          </li>
        )
      }
    })
  }
  
  return (
    <div className="occupation">
      <div className="o_head">
        <h2>请选择{title}</h2>
        <span dangerouslySetInnerHTML={{__html: btn}} onClick={e => onClickBtn(step)}></span>
      </div>
      <div className="o_body">
        <ol>
          {listShows}
        </ol>
      </div>

    </div>
  )
}

export default OutPut