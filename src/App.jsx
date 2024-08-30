import { useState } from "react";
import Budget from "./components/Budget";
import ExpenseList from "./components/ExpenseList";
import ExpenseTotal from "./components/ExpenseTotal";
import NewExpense from "./components/NewExpense";
import RemainingBudget from "./components/RemainingBudget";

function App() {
  // Dummy list of expenses as initial state
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Shopping", cost: 40 },
    { id: 2, name: "Car Service", cost: 400 },
    { id: 3, name: "Salaries", cost: 1400 }
  ]);
  
  const [budget, setBudget] = useState(2000);

  function handleSaveClick(value) {
    setBudget(value);
  }

  function addExpenseHandler(expense) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, expense];
    })
  }
  
  return (
    <div className="container mx-auto sm:px-4">
      <h1 className="mt-3">My Budget Planner</h1>
      {/* Tailwind row */}
      <div className="flex flex-wrap mt-3 hstack gap-3">
        {/* Column within the row for imported components */}
        <div className="relative sm:flex-grow sm:flex-1">
          <Budget budget={budget} handleSaveClick={handleSaveClick} />
        </div>
        <div className="relative sm:flex-grow sm:flex-1">
          <RemainingBudget expenses={expenses} budget={budget} />
        </div>
        <div className="relative sm:flex-grow sm:flex-1">
          <ExpenseTotal expenses={expenses} />
        </div>  
      </div>
      <h3 className="mt-3">Expenses</h3>
      <div className="flex flex-wrap mt-3">
        <div className="relative sm:flex-grow sm:flex-1">
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        </div>
      </div>
      <div className="relative sm:flex-grow sm:flex-1">
          <NewExpense onAddExpense={addExpenseHandler} />
      </div>
    </div>
  );
}

export default App;
