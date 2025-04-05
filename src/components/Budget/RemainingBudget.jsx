import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function RemainingBudget() {
    const { expenses, budget } = useContext(ExpenseContext);
    
    // Convert cost values to numbers and calculate total expenses
    const totalExpenses = expenses.reduce((total, item) => total + parseFloat(item.cost), 0);

    // Calculate remaining budget and format it to 2 decimal places
    const remainingBudget = (budget - totalExpenses).toFixed(2);

    // Conditional background color rendering based on remaining amount
    const alertType = totalExpenses > budget ? "bg-red-200 border-red-300 text-red-800" : "bg-green-200 border-green-300 text-green-800";
    
    return (
        <div className={`relative px-3 py-4 mb-4 pb-4 items-center border rounded ${alertType}`}>
            <span>Remaining: ${remainingBudget}</span>
        </div>
    );
}