import RemainingBudget from "./components/Budget/RemainingBudget";
import ExpenseTotal from "./components/Expenses/ExpenseTotal";
import ExpenseList from "./components/Expenses/ExpenseList";
import AddExpenseForm from "./components/UI/AddExpenseForm";
import Budget from "./components/Budget/Budget";
import ExpenseBarChart from "./components/Expenses/ExpenseBarChart";
import { ExpenseProvider } from "./components/context/ExpenseContext";

export default function App() {
  return (
    <ExpenseProvider>
      <div className="container mx-auto sm:px-4">
        <h1 className="mt-3">My Budget Planner</h1>
        <ExpenseBarChart />
        {/* Tailwind row */}
        <div className="flex flex-wrap mt-3 hstack gap-3">
          {/* Column within the row for imported components */}
          <div className="relative sm:flex-grow sm:flex-1">
            <Budget />
          </div>
          <div className="relative sm:flex-grow sm:flex-1">
            <RemainingBudget />
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
            <AddExpenseForm />
        </div>
      </div>
    </ExpenseProvider>    
  );
}