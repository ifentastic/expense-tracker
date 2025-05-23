import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseTotal() {
    const { expenses } = useContext(ExpenseContext);
    
    // Convert cost values to numbers and calculate total expenses (https://github.com/chrisblakely01/react-budget-app/blob/main/src/components/ExpenseTotal.js)
    const totalExpenses = expenses.reduce((total, item) => total + parseFloat(item.cost), 0);

    // Format total expenses to 2 decimal places (my work)
    const formattedTotalExpenses = totalExpenses.toFixed(2);
    
    // Render the calculated total amount spent
    return (
        <div className="relative px-3 py-4 mb-4 pb-4 border rounded text-blue-800 bg-blue-200 border-blue-300">
            <span>Spent so far: ${formattedTotalExpenses}</span>
        </div>
    );
}