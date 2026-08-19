import { useState } from "react";

function Budget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [budget, setBudget] = useState(100000);
  const [budgetInput, setBudgetInput] = useState("100000");

  const handleSaveBudget = () => {
    const newBudget = Number(budgetInput);

    if (!newBudget || newBudget <= 0) {
      return;
    }

    setBudget(newBudget);
    setIsEditing(false);
  };

  const spent = 65000;
  const remaining = budget - spent;
  const percentageUsed = Math.min((spent / budget) * 100, 100);

  return (
    <section className={`budget-card ${isOpen ? "open" : ""}`}>
      <div className="budget-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="budget-header" onClick={() => setIsOpen(!isOpen)}>
          <h2>Monthly Budget</h2>
          <p> Set and manage your spending limit</p>
        </div>

        <button
          type="button"
          className="budget-toggle"
          aria-label={isOpen ? "Close budget" : "Open budget"}
        >
          {isOpen ? "^" : "⌄"}
        </button>
      </div>

      <div className="budget-content">
        {" "}
        {isEditing ? (
          <div className="budget-editor">
            {" "}
            <label htmlFor="budget">Monthly budget</label>
            <input
              id="budget"
              type="number"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              min="1"
            />
            <div className="budget-editor-actions">
              <button type="button" onClick={handleSaveBudget}>
                {" "}
                Save Budget
              </button>

              <button
                type="button"
                onClick={() => {
                  setBudgetInput(budget.toString());
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="budget-info">
              <div>
                <span>Budget</span>
                <strong>₦{budget.toLocaleString()}</strong>
              </div>

              <div>
                <span>Spent</span>
                <strong>₦{spent.toLocaleString()}</strong>
              </div>

              <div>
                <span>Remaining</span>
                <strong>₦{Math.max(remaining, 0).toLocaleString()}</strong>
              </div>
            </div>

            <div className="budget-progress">
              <div
                className="budget-progress-bar"
                style={
                  {
                    "--progress": `${percentageUsed}%`,
                  } as React.CSSProperties
                }
              ></div>
            </div>

            <p className="budget-message">
              {remaining >= 0
                ? `You're doing well! You still have ₦${remaining.toLocaleString()} left.`
                : `You've exceeded your budget by  ₦${Math.abs(remaining).toLocaleString()}. `}
            </p>

            <button
              type="button"
              className="edit-budget"
              onClick={() => {
                setBudgetInput(budget.toString());
                setIsEditing(true);
              }}
            >
              Edit Budget
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Budget;
