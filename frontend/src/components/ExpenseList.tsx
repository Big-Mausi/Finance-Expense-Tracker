import api from "../api";
import type { Expense } from "../App";

interface ExpenseListProps {
  expenses: Expense[];
  fetchExpenses: () => Promise<void>;
  setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}

function ExpenseList({
  expenses,
  fetchExpenses,
  setEditingExpense,
}: ExpenseListProps) {
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      await api.delete(`/expenses/${id}`);
      await fetchExpenses();
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  return (
    <div className="expense-list">
      <h2>Transactions</h2>

      {expenses.length === 0 ? (
        <div className="expense-card">
          <p>No transactions added yet.</p>
        </div>
      ) : (
        expenses.map((expense) => (
          <div className="expense-card" key={expense.id}>
            <h3>{expense.title}</h3>

            <p>
              <strong>Type:</strong>{" "}
              {expense.type === "INCOME" ? "Income" : "Expense"}
            </p>
            <p>
              <strong>Amount:</strong> ₦{expense.amount.toLocaleString()}
            </p>

            <p>
              <strong>Category:</strong> {expense.category}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(expense.createdAt).toLocaleString()}
            </p>

            <div className="actions">
              <button onClick={() => setEditingExpense(expense)}>Edit</button>

              <button onClick={() => handleDelete(expense.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;
