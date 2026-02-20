import React from "react";

function ExpenseForm({
  description,
  amount,
  category,
  isEditing,
  setDescription,
  setAmount,
  setCategory,
  onSubmit,
  onCancelEdit,
}) {
  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Other",
  ];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-900 p-6 rounded-md border border-gray-700 space-y-4"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-white text-center">
        {isEditing ? "Edit Expense" : "Add Expense"}
      </h2>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm text-gray-400 mb-1"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Groceries"
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm text-gray-400 mb-1"
        >
          Amount (₹)
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 500"
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm text-gray-400 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isEditing ? "Update" : "Add"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex-1 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;