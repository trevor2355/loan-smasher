import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
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

  calculateBiWeeklyExpenses(biWeeklyIncome, expensesArray) {
    console.log('biWeeklyIncome: ', biWeeklyIncome)
    var fixedExpenses = [];
    var percentageExpenses = [];
    for (var i = 0; i < expensesArray.length; i++) {
      if (expensesArray[i] < 1) {
        percentageExpenses.push(expensesArray[i]);
      }
      if (expensesArray[i] > 1) {
        fixedExpenses.push(expensesArray[i])
      }
    }
    var totalBiWeeklyExpense = 0;
    console.log('fixedExpenses: ', fixedExpenses)
    for (var i = 0; i < fixedExpenses.length; i++) {
      totalBiWeeklyExpense += fixedExpenses[i]
    }
    console.log('percentageExpenses: ', percentageExpenses)
    for (var i = 0; i < percentageExpenses.length; i++) {
      var expenseAmount = biWeeklyIncome * percentageExpenses[i];
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

  calculateTotalAfterExpenses(biWeeklyIncome, totalBiWeeklyExpense) {
    var totalAfterExpenses = biWeeklyIncome - totalBiWeeklyExpense;
    return totalAfterExpenses;
  }

  reoccurringPaymentCreator(nextPaymentDue, frequency, paymentAmt, lastPaymentDue) {
    return {
      nextPaymentDue,
      frequency,
      paymentAmt,
      lastPaymentDue
    }
  }

  loan(amtDue, interestRate, obj, obj2) {
    var nextPaymentDue = obj.nextPaymentDue;
    console.log(obj, 'nextPaymentDue: ', nextPaymentDue)
    var latestPaymentMade = this.addMonths(nextPaymentDue, -1);
    console.log('-----', nextPaymentDue, latestPaymentMade);
    while(obj.lastPaymentDue >= nextPaymentDue) {
      var dailyRate = interestRate / 365;
      var interestAcquiredBetweenPaymentPeriods = dailyRate * this.calculateDaysBetweenDates(latestPaymentMade, nextPaymentDue);
      amtDue += interestAcquiredBetweenPaymentPeriods;
      amtDue -= obj.paymentAmt;
      console.log({
        amtDue,
        interestAcquiredBetweenPaymentPeriods,
        dailyRate,
        latestPaymentMade,
        nextPaymentDue
      })
      nextPaymentDue = this.addMonths(nextPaymentDue, 1);
      latestPaymentMade = this.addMonths(latestPaymentMade, 1)
    }

    while(obj2.lastPaymentDue >= nextPaymentDue) {
      var dailyRate = interestRate / 365;
      var interestAcquiredBetweenPaymentPeriods = (dailyRate * this.calculateDaysBetweenDates(latestPaymentMade, nextPaymentDue)) * amtDue;
      amtDue += interestAcquiredBetweenPaymentPeriods;
      amtDue -= obj2.paymentAmt;
      console.log({
        amtDue,
        interestAcquiredBetweenPaymentPeriods,
        dailyRate,
        latestPaymentMade,
        nextPaymentDue
      })
      nextPaymentDue = this.addMonths(nextPaymentDue, 1);
      latestPaymentMade = this.addMonths(latestPaymentMade, 1)
    }
    return amtDue;
  }

  calculateDaysBetweenDates(date1, date2) {
    var milliseconds = Math.abs(date1 - date2);
    var seconds = milliseconds / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    return days;
  }

  addMonths(date, months) {
    var newDate = new Date(date);
    var d = newDate.getDate();
    newDate.setMonth(newDate.getMonth() + +months);
    if (newDate.getDate() != d) {
      newDate.setDate(0);
    }
    return newDate;
  }


  render() {

    console.log(this.calculateDaysBetweenDates(new Date(2020, 4, 20), new Date(2020, 5, 20)))
    console.log(this.addMonths(new Date(2022, 0, 31), 1))
    console.log(this.loan(12399.95, .129, this.reoccurringPaymentCreator(new Date(2020, 5, 20), 'monthly', 93.50, new Date(2020, 9, 20)), this.reoccurringPaymentCreator(new Date(2020, 10, 20), 'monthly', 396.80, new Date(2023, 10, 20))))

    return (
      <h1>Loan Smasher</h1>
    )
  }
}

export default App;