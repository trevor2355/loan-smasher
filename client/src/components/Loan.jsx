import React from 'react';
import ReoccurringLoanInfo from './ReoccurringLoanInfo.jsx'

const Loan = (props) => {
  var reoccurringLoanInfo;
  if (props.loan.reoccurringLoanInfo) {
    reoccurringLoanInfo = props.loan.reoccurringLoanInfo.map(info => {
      return (
        <ReoccurringLoanInfo key={info.id} info={info} handleLoanInput={props.handleLoanInput}/>
      )
    })
  }
  return (
    <div className='loan' id={props.loan.id}>
      <h4>Loan {props.loan.description}</h4>
      <div>
        <span>Loan {props.loan.id}: </span>
        <input type='text' onChange={props.handleLoanInput} className='amount' value={props.loan.amount} placeholder='Ex: 250'></input>
      </div>
      <div>
        <span>Description: </span>
        <input type='text' onChange={props.handleLoanInput} className='description' value={props.loan.description} placeholder='optional...' ></input>
      </div>
      <div>
        <span>Interest Rate: </span>
        <input type='text' onChange={props.handleLoanInput} className='interestRate' value={props.loan.interestRate} placeholder='Ex: .075'></input>
      </div>
      {reoccurringLoanInfo}
    </div>
  )
}

export default Loan