interface TotalExpensesProps {
  total: number;
}

function TotalExpenses({ total }: TotalExpensesProps) {
  return (
    <div className="total-card">
      <h2>Total Expenses</h2>
      <h1>₦{total.toLocaleString()}</h1>
    </div>
  );
}

export default TotalExpenses;
