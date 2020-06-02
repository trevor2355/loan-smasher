import React from 'react';
import accounting from 'accounting';

const Summary = (props) => {
  return (
    <div>
      <h2>Summary</h2>
      <div>
        <h3>Budget Information</h3>
        <div>Salary: {accounting.formatMoney(props.salary)}</div>
        <div>Take Home Pay: {accounting.formatMoney(props.takeHomePay)}</div>
        <div>Total Taxes Paid: {accounting.formatMoney(props.totalYearTaxes)}</div>
        <div>Gross Pay Check: {accounting.formatMoney(props.grossPayCheck)}</div>
        <div>Net Pay Check: {accounting.formatMoney(props.netPayCheck)}</div>
        <div>Breakdown of each individual expense</div>
        <div>Total Expenses Each Pay Check: {accounting.formatMoney(props.totalExpensesEachPayCheck)}</div>
        <div>Amount to be Paid to Loan Each Pay Check: {accounting.formatMoney(props.amountToBePaidToLoanEachPayCheck)}</div>
      </div>
      <div>
        <h3>Loan Information</h3>
        {props.results.map(loan => {
          console.log(loan)
          return (
            <div>
              <h5>{loan.loanName}</h5>
                <div>Principal Loan Amount: {accounting.formatMoney(loan.principalLoanAmount)}</div>
                <div>Payed Off in Full On: {loan.payedOffOn.toDateString()}</div>
                <div>Total Interest Paid: {accounting.formatMoney(loan.interestPaid)}</div>
                <div>Total Amount Paid Towards Loan: {accounting.formatMoney(loan.totalPaidToCurrentLoan)}</div>
                <div>Amount Left After Loan is Payed Off: {accounting.formatMoney(loan.amountLeftAfterLoanPaidOff)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Summary