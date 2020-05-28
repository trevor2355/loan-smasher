import React from 'react';

const Expense = (props) => {
  return (
    <div className='monthlyExpense' id={props.expense.id}>
      <span>Monthly Expense {props.expense.id}: </span>
      <input type='text' onChange={props.handleMonthlyExpenseInput} className='amount' value={props.expense.amount} placeholder='Ex: 250'></input>
      <span>Description: </span>
      <input type='text' onChange={props.handleMonthlyExpenseInput} className='description' value={props.expense.description} placeholder='optional...' ></input>
    </div>
  )
}

export default Expense