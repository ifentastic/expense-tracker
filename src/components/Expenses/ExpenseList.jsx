import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
    // https://github.com/chrisblakely01/react-budget-app/blob/main/src/components/ExpenseList.js
    const { expenses } = useContext(ExpenseContext);

    const [filteredExpenses, setFilteredExpenses] = useState(expenses || []);

	useEffect(() => {
		setFilteredExpenses(expenses);
	}, [expenses]);

    function handleChange(event) {
		const searchResults = expenses.filter((filteredExpense) => {
            const searchTerm = event.target.value.toLowerCase();

            // Check if description, cost, or category matches the search term (my work)
            return (
                filteredExpense.description.toLowerCase().includes(searchTerm) || 
                filteredExpense.cost.toString().includes(searchTerm) ||
                filteredExpense.category.toLowerCase().includes(searchTerm) // cost is a number
            );
        });
        setFilteredExpenses(searchResults.length > 0 ? searchResults : expenses);
	}

    // Render the list of expenses in a tabular format (my work)
    return (
        <>
            <input
                id="name"
                type="text" 
                className=
                    "block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                onChange={handleChange}
            />                
            <table className="w-full max-w-full mb-4 bg-transparent">
                <thead>
                    <tr>
                        <th className="border-b-2 text-left" scope="col">Description</th>
                        <th className="border-b-2 text-left" scope="col">Cost</th>
                        <th className="border-b-2 text-left" scope="col">Category</th>
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
        </>       
    );
}