module.exports = {
  expenses: [
    {
      id: 1,
      description: 'Rent',
      amount: '805.00'
    },
    {
      id: 2,
      description: 'Tithing',
      amount: '.10',
    },
    {
      id: 3,
      description: 'Car Insurance Corolla',
      amount: '81.67'
    },
    {
      id: 4,
      description: 'Groceries',
      amount: '300.00'
    },
    {
      id: 5,
      description: 'Amazon Prime',
      amount: '6.96'
    },
    {
      id: 6,
      description: 'Apple Music',
      amount: '10.71'
    },
    {
      id: 7,
      description: 'Spotify',
      amount: '5.00'
    },
    {
      id: 8,
      description: 'Car Insurance Tacoma',
      amount: '80.00'
    },
    {
      id: 9,
      description: 'Gas',
      amount: '81.67'
    },
    {
      id: 10,
      description: 'Corolla Loan',
      amount: '180.00'
    },
    {
      id: 11,
      description: 'Cell Phone',
      amount: '45.00'
    },
    {
      id: 12,
      description: 'YouTube TV',
      amount: '10.00'
    },
    {
      id: 13,
      description: 'Fun Money',
      amount: '.05'
    },
    {
      id: 14,
      description: 'Fast Offering',
      amount: '75.00'
    },
  ],
  loans: [
    {
      id: 1,
      description: 'Hack Reactor',
      amount: '12390.00',
      interestRate: '.0899',
      reoccurringLoanInfo: []
    },
    {
      id: 2,
      description: 'U of U Summer 2020',
      amount: '13500.00',
      interestRate: '.06079',
      reoccurringLoanInfo: []
    },
    {
      id: 3,
      description: 'U of U Fall 2020 - Summer 2022',
      amount: '0',
      interestRate: '.043',
      reoccurringLoanInfo: [
        {
          id: 1,
          amount: '10729.75',
          date: new Date(2020, 8, 1)
        },
        {
          id: 2,
          amount: '10729.75',
          date: new Date(2021, 0, 1)
        },
        {
          id: 3,
          amount: '10729.75',
          date: new Date(2021, 4, 1)
        },
        {
          id:4,
          amount: '10729.75',
          date: new Date(2021, 8, 1)
        },
        {
          id: 5,
          amount: '10729.75',
          date: new Date(2022, 0, 1)
        },
        {
          id: 6,
          amount: '10729.75',
          date: new Date(2022, 4, 1)
        },
      ]
    }
  ]
}