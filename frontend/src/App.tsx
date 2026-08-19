import { useEffect, useState } from "react";
import "./App.css";
import api from "./api";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TotalExpenses from "./components/TotalExpenses";

export interface Expense {
  id: number;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  createdAt: string;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const fetchExpenses = async (): Promise<void> => {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  useEffect(() => {
    void fetchExpenses();
  }, []);

  const totalIncome = expenses
    .filter((expense) => expense.type === "INCOME")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpenses = expenses
    .filter((expense) => expense.type === "EXPENSE")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="container">
      <h1>Finance Expense Tracker</h1>

      <p className="subtitle">
        Keep track of your income and daily expenses in one place
      </p>

      <TotalExpenses
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      <ExpenseForm
        fetchExpenses={fetchExpenses}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <ExpenseList
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        setEditingExpense={setEditingExpense}
      />
    </div>
  );
}

export default App;
