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
                <table className="w-full max-w-full mb-4 bg-transparent">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map((expense) => (
                            <ExpenseItem
                                key={expense.id}
                                id={expense.id}
                                description={expense.description}
                                cost={expense.cost}
                                category={expense.category}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-black text-center">No expenses found.</p>
            )}            
        </>    
    );
}