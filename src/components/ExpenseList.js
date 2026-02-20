import React from "react";
import { EditIcon, DeleteIcon } from "./Icons";

function ExpenseList({ expenses, filter, setFilter, onEdit, onDelete }) {
  const categories = [
    "All",
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Other",
  ];

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-md p-6 space-y-4">
      
      {/* Header + Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          Recent Expenses
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:border-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Expense List */}
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="p-4 border border-gray-700 rounded-md text-center text-gray-400">
            No expenses found.
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="p-4 border border-gray-700 rounded-md flex justify-between items-center"
            >
              {/* Details */}
              <div>
                <p className="font-medium text-white capitalize">
                  {expense.description}
                </p>
                <p className="text-sm text-gray-400">
                  {expense.category} • {expense.date}
                </p>
              </div>

              {/* Amount + Buttons */}
              <div className="flex items-center gap-3">
                <p className="font-semibold text-blue-500">
                  ₹{expense.amount.toFixed(2)}
                </p>

                <button
                  onClick={() => onEdit(expense)}
                  className="text-gray-400 hover:text-blue-500 transition"
                >
                  <EditIcon />
                </button>

                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;