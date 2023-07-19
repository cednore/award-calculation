const mockTransactions = [
  {
    customerId: "Jason",
    transactions: [
      { month: "January", amount: 120 },
      { month: "February", amount: 80 },
      { month: "March", amount: 150 }
    ]
  },
  {
    customerId: "John",
    transactions: [
      { month: "January", amount: 60 },
      { month: "February", amount: 70 },
      { month: "March", amount: 90 }
    ]
  },
  {
    customerId: "Jack",
    transactions: [
      { month: "January", amount: 110 },
      { month: "February", amount: 130 },
      { month: "March", amount: 140 }
    ]
  }
];

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransactions);
    }, 2000);
  });
};
