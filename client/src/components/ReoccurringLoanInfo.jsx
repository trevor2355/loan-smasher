import React from 'react';

const ReoccurringLoanInfo = (props) => {
  return (
    <div id={props.info.id}>
      <div>
        <span>Reoccuring Date: </span>
        <input type='text' onChange={props.handleLoanInput} className='date' value={props.info.date} placeholder='1/1/2021'></input>
      </div>
      <div>
        <span>Reoccuring Amount: </span>
        <input type='text' onChange={props.handleLoanInput} className='amount' value={props.info.amount} placeholder='10000'></input>
      </div>
    </div>
  )
}

export default ReoccurringLoanInfo
