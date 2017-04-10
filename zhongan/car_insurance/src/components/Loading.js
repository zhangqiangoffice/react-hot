import React from 'react';

const Loading = ({isLoading}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading">
      <img src={ctx + '/static/img/public/loading.gif'} />
    </div>
  );
}

export default Loading