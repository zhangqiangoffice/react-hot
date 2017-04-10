import React from 'react';

const Navigation = ({step}) => (
  <div className="navigation">
    <span>
      <img className={"step" + step} src={ctx + '/static/img/zhongan/car_insurance/step' + step + '.png'} />
    </span>
  </div>
)

export default Navigation