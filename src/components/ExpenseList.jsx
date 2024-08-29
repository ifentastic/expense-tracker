import { useState } from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
    // Dummy list of expenses as initial state
    const [expenses, setExpenses] = useState([
        { id: 1, name: "Shopping", cost: 40 },
        { id: 2, name: "Car Service", cost: 400 },
        { id: 3, name: "Salaries", cost: 4000 }
    ]);

    function removeExpenseHandler(id) {
        setExpenses(expenses.filter(expense => expense.id !== id));
    }

    return (
        // Iterate over expense list and display an expense item
       <ul className="flex flex-col pl-0 mb-0 border rounded border-gray-300">
        {expenses.map((expense) => (
            <ExpenseItem 
                key={expense.id} 
                id={expense.id} 
                name={expense.name} 
                cost={expense.cost}
                onRemove={removeExpenseHandler} 
            />
        ))}
       </ul>
    );
}