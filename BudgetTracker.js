import React from "react";

function BudgetTracker({ expenses, budget, setBudget }) {
  // Calculate totals
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const remainingBudget = budget - totalExpenses;
  const spentPercentage =
    budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-md p-6 space-y-4">
      {/* Header + Budget Input */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Monthly Budget</h2>

        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-28 bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded-md text-center focus:outline-none focus:border-blue-500"
          placeholder="Enter budget"
        />
      </div>

      {/* Total Spent */}
      <div>
        <p className="text-2xl font-bold text-white">
          ₹{totalExpenses.toFixed(2)}
        </p>
        <p className="text-sm text-gray-400">Spent of ₹{budget || 0}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full"
          style={{ width: `${spentPercentage}%` }}
        ></div>
      </div>

      {/* Remaining Budget */}
      <p
        className={`text-sm font-medium ${
          remainingBudget < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {remainingBudget >= 0
          ? `₹${remainingBudget.toFixed(2)} remaining`
          : `₹${Math.abs(remainingBudget).toFixed(2)} over budget`}
      </p>
    </div>
  );
}

export default BudgetTracker;
