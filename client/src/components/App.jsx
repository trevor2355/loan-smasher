import React from 'react';
import Expense from './Expense.jsx';
import Loan from './Loan.jsx';
import Summary from './Summary.jsx';
import data from '../data.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      salary: '72000',
      beginWorkingDate: '7/20/2020',
      expenses: data.expenses,
      loans: data.loans,
      results: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleMonthlyExpenseInput = this.handleMonthlyExpenseInput.bind(this);
    this.handleEstimateTakehomePayAfterTaxes = this.handleEstimateTakehomePayAfterTaxes.bind(this);
    this.handleCalculateTotalExpensesEachPayCheck = this.handleCalculateTotalExpensesEachPayCheck.bind(this);
    this.handleCalculateWhenLoanCanBePaidOff = this.handleCalculateWhenLoanCanBePaidOff.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.handleLoanInput = this.handleLoanInput.bind(this);
    this.addLoan = this.addLoan.bind(this);
  }

  monthlyToBiWeeklyConverter(expense) {
    var dailyExpense = expense / 30;
    var biWeeklyExpense = dailyExpense * 14;
    return biWeeklyExpense;
  }

  calculatePayCheck(yearlyIncome) {
    var dailyIncome = yearlyIncome / 365;
    var payCheck = dailyIncome * 14;
    return payCheck
  }

  calculateBiWeeklyExpenses(grossPayCheck, expensesArray) {
    console.log('Gross PayCheck: ', grossPayCheck)
    var fixedExpenses = [];
    var percentageExpenses = [];
    for (var i = 0; i < expensesArray.length; i++) {
      var currentNum = parseFloat(expensesArray[i]);
      if (currentNum < 1) {
        percentageExpenses.push(currentNum);
      }
      if (currentNum > 1) {
        fixedExpenses.push(currentNum)
      }
    }
    var totalBiWeeklyExpense = 0;
    console.log('fixedExpenses: ', fixedExpenses)
    for (var i = 0; i < fixedExpenses.length; i++) {
      var currentExpense = this.monthlyToBiWeeklyConverter(fixedExpenses[i])
      console.log('currentFixedExpense Converted: ', currentExpense)
      totalBiWeeklyExpense += currentExpense
    }
    console.log('percentageExpenses: ', percentageExpenses)
    for (var i = 0; i < percentageExpenses.length; i++) {
      var expenseAmount = grossPayCheck * percentageExpenses[i];
      totalBiWeeklyExpense += expenseAmount
    }
    return totalBiWeeklyExpense
  }

  estimateTaxes(yearlyIncome) {
    var estimatedFederalTax = this.estimateFederalTax(yearlyIncome)
    var estimatedFICA = this.estimateFICATax(yearlyIncome);
    var estimatedUTStateTax = this.estimateUTStateTax(yearlyIncome);

    var totalTaxEstimate = estimatedFICA + estimatedFederalTax + estimatedUTStateTax;
    return totalTaxEstimate;
  }

  estimateFederalTax(yearlyIncome) {
    var yearlyIncomeMinusStandardDeduction = yearlyIncome - 24800;
    if (yearlyIncomeMinusStandardDeduction < 19400) {
      return yearlyIncomeMinusStandardDeduction * .1;
    }
    if (yearlyIncomeMinusStandardDeduction < 78950) {
      var firstBracket = 19400 * .1;
      var secondBracket = (yearlyIncomeMinusStandardDeduction - 19400) * .12;
      return firstBracket + secondBracket;
    }
    if (yearlyIncomeMinusStandardDeduction < 168400) {
      var firstBracket = 19400 * .1;
      var secondBracket = 59950 * .12;
      var thirdBracket = (yearlyIncomeMinusStandardDeduction - 78950) * .22;
      return firstBracket + secondBracket + thirdBracket;
    }
  }

  estimateFICATax(yearlyIncome) {
    // social security rate
    var SSR = .062;
    // medicare rate
    var MR = .0145

    if (yearlyIncome < 137700) {
      return (yearlyIncome * SSR) + (yearlyIncome * MR);
    }
    if (yearlyIncome <= 250000) {
      var firstBracket = (137700 * SSR) + (137700 * MR);
      var secondBracket = (yearlyIncome - 137700) * MR;
      return firstBracket + secondBracket; 
    }
    if (yearlyIncome > 250000) {
      var firstBracket = (137700 * SSR) + (137700 * MR);
      var secondBracket = (yearlyIncome - 137700) * MR;
      MR = .0235
      var thirdBracket = (yearlyIncome - 250000) * MR;
      return firstBracket + secondBracket + thirdBracket;
    }
  }

  estimateUTStateTax(yearlyIncome) {
    //Utah State flat tax rate
    var UTR = .0495;
    return yearlyIncome * UTR;
  }

  handleInput(event) {
    var id = event.target.id;
    var value = event.target.value;
    this.setState({
      [id]: value
    })
  }

  handleMonthlyExpenseInput(event) {
    var id = event.target.parentElement.id;
    var expenses = this.state.expenses;
    var className = event.target.className;
    for (var i = 0; i < expenses.length; i++) {
      var currentExpense = expenses[i];
      if (currentExpense.id == id) {
        expenses[i][className] = event.target.value;
      }
    }
    this.setState({
      expenses
    })
  }

  addExpense() {
    var expense = {
      id: this.state.expenses.length + 1,
      description: '',
      amount: 0
    }
    var expenses = this.state.expenses;
    expenses.push(expense);
    this.setState({
      expenses
    })
  }

  handleLoanInput(event) {
    var id = event.target.parentElement.parentElement.parentElement.id;
    var loans = this.state.loans;
    var className = event.target.className;
    console.log('id: ', id)
    console.log('loans: ', loans)
    console.log('className: ', className)
    for (var i = 0; i < loans.length; i++) {
      var currentLoans = loans[i];
      if (currentLoans.id == id) {
        loans[i][className] = event.target.value;
      }
    }
    this.setState({
      loans
    })
  }

  addLoan() {
    var loan = {
      id: this.state.loans.length + 1,
      description: '',
      amount: 0,
      interestRate: 0.0
    }
    var loans = this.state.loans;
    loans.push(loan);
    this.setState({
      loans
    })
  }

  handleDateTransition(stringDate) {
    // var date = this.state.beginWorkingDate;
    var firstSlashIndex = stringDate.indexOf('/');
    var month = stringDate.substring(0, firstSlashIndex);
    month -= 1;
    var dateNoMonth = stringDate.substring(firstSlashIndex + 1, stringDate.length);
    var secondSlashIndex = dateNoMonth.indexOf('/');
    var day = dateNoMonth.substring(0, secondSlashIndex);
    var year = dateNoMonth.substring(secondSlashIndex + 1, dateNoMonth.length);
    var date = new Date(year, month, day);
    return date;
  }

  handleEstimateTakehomePayAfterTaxes() {
    if (this.state.salary === '') {
      alert('Please enter a valid salary with no commas or $')
      return
    }
  
    var taxes = this.estimateTaxes(this.state.salary);
    console.log(taxes);
    var takeHomePay = this.state.salary - taxes;
    var grossPayCheck = this.calculatePayCheck(this.state.salary);
    var netPayCheck = this.calculatePayCheck(takeHomePay);
    console.log('netPay: ', netPayCheck)
    this.setState({
      takeHomePay,
      grossPayCheck,
      netPayCheck
    }, () => {this.handleCalculateTotalExpensesEachPayCheck()})
  }

  handleCalculateTotalExpensesEachPayCheck() {
    //FIX
    var monthlyExpenses = [];
    for (var i = 0; i < this.state.expenses.length; i++) {
      monthlyExpenses.push(this.state.expenses[i]['amount'])
    }
    console.log(monthlyExpenses)
    console.log('++++++++++++++++++++++++')
    var totalExpense = this.calculateBiWeeklyExpenses(this.state.grossPayCheck, monthlyExpenses);
    var totalRemainingAfterExpenses = this.state.netPayCheck - totalExpense
    this.setState({
      totalExpense,
      totalRemainingAfterExpenses
    }, () => {this.handleCalculateWhenLoanCanBePaidOff()})
  }

  handleCalculateWhenLoanCanBePaidOff() {
    var beginWorkingDate = this.handleDateTransition(this.state.beginWorkingDate);
    //calculate when the first paycheck will come. (estimate that it is two weeks after starting the job)
    var milliseconds= beginWorkingDate.setDate(beginWorkingDate.getDate() + 14);
    var beginWorkingDate = new Date(milliseconds);
    var currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    var daysPast = (currentDate - beginWorkingDate) / (1000 * 24 * 60 * 60);
    console.log(-28 % 14 === 0)
    console.log('daysPast: ', daysPast)
    var results = []

    var loans = JSON.parse(JSON.stringify(this.state.loans));
    for (var i = 0; i < loans.length; i++) {
      loans[i].principalLoanAmount = parseFloat(this.state.loans[i].amount)
    }

    for (var i = 0; i < loans.length; i++) {
      var currentLoan = loans[i];

      var totalPaidToCurrentLoan = 0;

      // var currentLoanAmount = parseFloat(currentLoan.amount);
      while(parseFloat(currentLoan.amount) > 0 || currentLoan.reoccurringLoanInfo.length > 0) {

         //add 1 day to the current date
        currentDate.setDate(currentDate.getDate() + 1)

        //compound the interest on all loans
        for (var j = i; j < loans.length; j++) {
          var currentLoanDaily = loans[j]
          var currentLoanDailyAmount = parseFloat(currentLoanDaily.amount)
          var dailyRate = parseFloat(currentLoanDaily.interestRate) / 365;
          var dailyCompoundedInterest = dailyRate * currentLoanDailyAmount;
          currentLoanDailyAmount += dailyCompoundedInterest;
          //check if reoccurring payments are necessary
          if (currentLoanDaily.reoccurringLoanInfo.length > 0) {
            if (currentDate.getTime() === Date.parse(currentLoanDaily.reoccurringLoanInfo[0]['date'])) {
              // console.log('TIME FOR ANOTHER SEMESTER OF SCHOOL: ', currentDate)
              // console.log('Loan Amount Before next Semester: ', currentLoanDailyAmount)
              // console.log('REOCCURRING ARRAY: ', currentLoanDaily.reoccurringLoanInfo)
              currentLoanDailyAmount += parseFloat(currentLoanDaily.reoccurringLoanInfo[0]['amount'])
              // console.log('Loan Amount AFTER next Semester: ', currentLoanDailyAmount)

              currentLoanDaily.principalLoanAmount += parseFloat(currentLoanDaily.reoccurringLoanInfo[0]['amount'])

              currentLoanDaily.reoccurringLoanInfo.shift()
            }
          }
          currentLoanDaily.amount = currentLoanDailyAmount
        }

        if (daysPast > -1 && (daysPast % 14 === 0 || daysPast === 0)) {
          console.log("CURRENT DATE: ", currentDate)
          currentLoan.amount = parseFloat(currentLoan.amount) - this.state.totalRemainingAfterExpenses;
          totalPaidToCurrentLoan += this.state.totalRemainingAfterExpenses;
        }
        daysPast++
      }
      var amountLeftAfterLoanPaidOff = Math.abs(currentLoan.amount);
      totalPaidToCurrentLoan += currentLoan.amount
      var payedOffOn = new Date(currentDate)
      var principalLoanAmount = currentLoan.principalLoanAmount
      var interestPaid = totalPaidToCurrentLoan - principalLoanAmount;
      var newResults = {
        loanName: currentLoan.description,
        payedOffOn,
        totalPaidToCurrentLoan,
        amountLeftAfterLoanPaidOff,
        principalLoanAmount,
        interestPaid
      }
      results.push(newResults);
    }
    this.setState({
      results
    }, () => console.log('results: ', this.state.results))
  }


  render() {

    // var takeHomePay;
    // if (this.state.takeHomePay) {
    //   takeHomePay = (
    //     <div>
    //       <h5>Take Home Pay: {accounting.formatMoney(this.state.takeHomePay)}</h5>
    //       <h5>Pay Check After Taxes: {accounting.formatMoney(this.state.netPayCheck)}</h5>
    //     </div>
    //   )
    // }

    // var totalExpense;
    // if (this.state.totalExpense) {
    //   totalExpense = (
    //     <div>
    //       <h5>Total Expenses Each Pay Period: {accounting.formatMoney(this.state.totalExpense)}</h5>
    //       <h5>Amount Left After Expenses Each Pay Period: {accounting.formatMoney(this.state.totalRemainingAfterExpenses)} </h5>
    //     </div>
    //   )
    // }

    // var loanComplete;
    // if (this.state.loanPaidOffOn) {
    //   loanComplete = (
    //     <div>
    //       <h5>Loan will be Paid off in Full on: {this.state.loanPaidOffOn.toDateString()}</h5>
    //       <h5>The Amount left over from last payment is: {accounting.formatMoney(this.state.amountLeftAfterLoanPaidOff)}</h5>
    //     </div>
    //   )
    // }

    var summary;
    if (this.state.results.length > 0) {
      summary = <Summary 
                  salary={this.state.salary}
                  grossPayCheck={this.state.grossPayCheck}
                  netPayCheck={this.state.netPayCheck}
                  takeHomePay={this.state.takeHomePay}
                  totalYearTaxes={this.state.salary - this.state.takeHomePay}
                  totalExpensesEachPayCheck={this.state.totalExpense}
                  amountToBePaidToLoanEachPayCheck={this.state.totalRemainingAfterExpenses}
                  results={this.state.results}
                  />
      console.log(this.state)
    }

    return (
      <div>
        <h1>Loan Smasher</h1>
        <p>
        This loan calculator will not only help you know when your laon will be paid off, but it will smash it in a hurry!
        </p>
        <div className='income-grid'>
          <div className='income-container'>
            <h3>Income</h3>
            <div className='input-container'>
              <span>Salary: </span>
              <input type='text' onChange={this.handleInput} id='salary' value={this.state.salary} placeholder='Ex: 40000'></input>
            </div>
            <div className='input-container'>
              <span>Begin Working On: </span>
              <input type='text' onChange={this.handleInput} id='beginWorkingDate' value={this.state.beginWorkingDate} placeholder='Ex: 6/4/1996'></input>
            </div>
          </div>
          <div className='tax-container'>
            <button>See how taxes will affect your salary</button>
          </div>
        </div>
        <div className='monthly-expenses-container'>
          <h3>Monthly Expenses </h3>
          {this.state.expenses.map(expense => {
            return <Expense expense={expense} key={expense.id} handleMonthlyExpenseInput={this.handleMonthlyExpenseInput}/>
          })}
          <div className='addMonthlyExpensef'>
            <button onClick={this.addExpense}>Add Monthly Expense +</button>
          </div>
          <div className='budget-button-container'>
          <button>See your bi-weekly budget</button>
          </div>
        </div>
        <div className='loan-info-heading'>
          <h3>Loan Info</h3>
        </div>
        <div className='loans-container'>
          {this.state.loans.map(loan => {
            return <Loan loan={loan} key={loan.id} handleLoanInput={this.handleLoanInput}/>
          })}
          <div className='addLoan'>
            <button onClick={this.addLoan}>Add Loan +</button>
          </div>
        </div>
        <div className='calculate-button'>
          <button onClick={this.handleEstimateTakehomePayAfterTaxes}>Calculate When Loan Can Be Paid Off</button>
        </div>
        {summary}
      </div>
    )
  }
}

export default App;