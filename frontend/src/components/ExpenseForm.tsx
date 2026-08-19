import { useEffect, useState } from "react";
import api from "../api";
import type { Expense } from "../App";

interface ExpenseFormProps {
  fetchExpenses: () => Promise<void>;
  editingExpense: Expense | null;
  setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}

function ExpenseForm({
  fetchExpenses,
  editingExpense,
  setEditingExpense,
}: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setType(editingExpense.type);
      setCategory(editingExpense.category);
    } else {
      setTitle("");
      setAmount("");
      setType("EXPENSE");
      setCategory("");
    }
  }, [editingExpense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = {
        title,
        amount: Number(amount),
        type,
        category,
      };

      console.log("Submitting:", data);

      if (editingExpense) {
        await api.put(`/expenses/${editingExpense.id}`, data);
        setEditingExpense(null);
      } else {
        await api.post("/expenses", data);
      }

      setTitle("");
      setAmount("");
      setType("EXPENSE");
      setCategory("");

      await fetchExpenses();
    } catch (error) {
      console.error("Failed to save transaction", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{editingExpense ? "Edit Transaction" : "Add Transaction"}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as "INCOME" | "EXPENSE")}
      >
        <option value="EXPENSE">Expense</option>
        <option value="INCOME">Income</option>
      </select>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading
          ? "Saving..."
          : editingExpense
            ? "Update Transaction"
            : "Add Transaction"}
      </button>

      {editingExpense && (
        <button
          type="button"
          onClick={() => setEditingExpense(null)}
          style={{ marginTop: "10px" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ExpenseForm;
