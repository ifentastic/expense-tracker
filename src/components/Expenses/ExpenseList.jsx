import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
    const { expenses } = useContext(ExpenseContext);

    const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);

	useEffect(() => {
		setfilteredExpenses(expenses);
	}, [expenses]);

    function handleChange(event) {
		const searchResults = expenses.filter((filteredExpense) =>
			filteredExpense.name.toLowerCase().includes(event.target.value)
		);
        
		setfilteredExpenses(searchResults);
	}
    
    return (
        <>
           <input
                type="text"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded mb-2 sm:mr-2"
                placeholder="Search an expense..."
                onChange={handleChange}
            />
            
            {/* Iterate over expense list and display an expense item if there are search results */}
            {/* Otherwise display a message */}
            {filteredExpenses.length > 0 ? (
                <ul className="flex flex-col pl-0 mb-0 border rounded border-gray-300">
                    {filteredExpenses.map((expense) => (
                        <ExpenseItem 
                            key={expense.id} 
                            id={expense.id} 
                            name={expense.name} 
                            cost={expense.cost}
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-black text-center">No expenses found.</p>
            )}            
        </>    
    );
}