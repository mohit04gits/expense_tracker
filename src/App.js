import React, { useState, useEffect } from "react";

// Components
import Header from "./components/Header";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  // --- STATE MANAGEMENT ---
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? Number(savedBudget) : 0;
  });

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);

  const [filter, setFilter] = useState("All");

  // --- DATA PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget.toString());
  }, [budget]);

  // --- CORE LOGIC ---
  const handleAddOrUpdateExpense = (e) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) return;

    if (isEditing) {
      const updatedExpenses = expenses.map((exp) =>
        exp.id === currentExpenseId
          ? { ...exp, description, amount: parseFloat(amount), category }
          : exp
      );
      setExpenses(updatedExpenses);
    } else {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString(),
      };
      setExpenses([newExpense, ...expenses]);
    }
    resetForm();
  };

  const handleStartEdit = (expense) => {
    setIsEditing(true);
    setCurrentExpenseId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setCategory("Food");
    setIsEditing(false);
    setCurrentExpenseId(null);
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Delete this expense?")) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  const filteredExpenses = expenses.filter((exp) =>
    filter === "All" ? true : exp.category === filter
  );

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white font-sans p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <Header />

        {/* Budget Section */}
        <section>
          <BudgetTracker
            expenses={expenses}
            budget={budget}
            setBudget={setBudget}
          />
        </section>

        {/* Expense Form + List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ExpenseForm
              description={description}
              amount={amount}
              category={category}
              isEditing={isEditing}
              setDescription={setDescription}
              setAmount={setAmount}
              setCategory={setCategory}
              onSubmit={handleAddOrUpdateExpense}
              onCancelEdit={resetForm}
            />
          </div>

          <div className="lg:col-span-2">
            <ExpenseList
              expenses={filteredExpenses}
              filter={filter}
              setFilter={setFilter}
              onEdit={handleStartEdit}
              onDelete={handleDeleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;