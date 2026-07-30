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
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
    }
  }, [editingExpense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense.id}`, {
          title,
          amount: Number(amount),
          category,
        });

        setEditingExpense(null);
      } else {
        await api.post("/expenses", {
          title,
          amount: Number(amount),
          category,
        });
      }

      setTitle("");
      setAmount("");
      setCategory("");

      await fetchExpenses();
    } catch (error) {
      console.error("Failed to save expense", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{editingExpense ? "Edit Expense" : "Add New Expense"}</h2>

      <input
        type="text"
        placeholder="Expense title"
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
            ? "Update Expense"
            : "Add Expense"}
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
