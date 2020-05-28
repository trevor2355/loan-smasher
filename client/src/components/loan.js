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