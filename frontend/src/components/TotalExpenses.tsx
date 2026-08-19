interface TotalExpensesProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

function TotalExpenses({
  totalIncome,
  totalExpenses,
  balance,
}: TotalExpensesProps) {
  return (
    <div className="summary-cards">
      <div className="total-card">
        <h2>Total Income</h2>
        <h1>₦{totalIncome.toLocaleString()}</h1>
      </div>

      <div className="total-card">
        <h2>Total Expenses</h2>
        <h1>₦{totalExpenses.toLocaleString()}</h1>
      </div>

      <div className="total-card">
        <h2>Balance</h2>
        <h1>₦{balance.toLocaleString()}</h1>
      </div>
    </div>
  );
}

export default TotalExpenses;
