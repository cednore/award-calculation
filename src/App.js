import "./styles.css";
import { fetchTransactions } from "./Backend";
import { useState, useEffect, Fragment } from "react";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate asynchronous API call to fetch data
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
        setLoading(false);
      });

    // Cleanup function
    return () => {
      // Clear transactions and rewards when component unmounts
      setTransactions([]);
    };
  }, []);

  const calculateRewardPoints = (amount) => {
    return (
      Math.max(amount - 100, 0) * 2 + Math.max(Math.min(amount, 100) - 50, 0)
    );
  };

  const renderTransactionRow = (customer) => {
    const { customerId, transactions } = customer;

    let totalAmount = 0;
    let totalReward = 0;

    return (
      <tr key={customerId}>
        <td>{customerId}</td>
        {transactions.map((transaction, index) => {
          const { amount } = transaction;
          const rewardPoints = calculateRewardPoints(amount);
          totalAmount += amount;
          totalReward += rewardPoints;

          return (
            <Fragment key={index}>
              <td className="amount-cell">${amount}</td>
              <td className="reward-cell">{rewardPoints} pt</td>
            </Fragment>
          );
        })}
        <td className="total-amount">${totalAmount}</td>
        <td className="total-reward">{totalReward} pt</td>
      </tr>
    );
  };

  return (
    <div>
      <h2>Rewards Calculation Program</h2>
      {loading ? (
        <p>Loading Transaction Data...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th rowSpan="2">Customer ID</th>
                <th colSpan="2">January</th>
                <th colSpan="2">February</th>
                <th colSpan="2">March</th>
                <th rowSpan="2">Total Amount</th>
                <th rowSpan="2">Total Reward</th>
              </tr>
              <tr>
                <th>Amount</th>
                <th>Reward</th>
                <th>Amount</th>
                <th>Reward</th>
                <th>Amount</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((customer) => renderTransactionRow(customer))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
