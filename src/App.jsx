import { useState } from "react";
import Budget from "./components/Budget";
import ExpenseList from "./components/ExpenseList";
import ExpenseTotal from "./components/ExpenseTotal";
import NewExpense from "./components/NewExpense";
import Remaining from "./components/Remaining";

function App() {
  const [budget, setBudget] = useState(2000);

  function handleSaveClick(value) {
    setBudget(value);
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
          <Remaining />
        </div>
        <div className="relative sm:flex-grow sm:flex-1">
          <ExpenseTotal />
        </div>  
      </div>
      <h3 className="mt-3">Expenses</h3>
      <div className="flex flex-wrap mt-3">
        <div className="relative sm:flex-grow sm:flex-1">
          <ExpenseList />
        </div>
      </div>
      <div className="relative sm:flex-grow sm:flex-1">
          <NewExpense />
      </div>
    </div>
  );
}

export default App;
