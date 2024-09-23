import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
    const { expenses } = useContext(ExpenseContext);

    const [filteredExpenses, setFilteredExpenses] = useState(expenses || []);

	useEffect(() => {
		setFilteredExpenses(expenses);
	}, [expenses]);

    function handleChange(event) {
		const searchResults = expenses.filter((filteredExpense) =>
            filteredExpense.category.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredExpenses(searchResults.length > 0 ? searchResults : expenses);
	}
    
    // return (
    //     <>
    //        <input
    //             type="text"
    //             className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded mb-2 sm:mr-2"
    //             placeholder="Search an expense..."
    //             onChange={handleChange}
    //         />
            
    //         {/* Iterate over expense list and display an expense expense if there are search results */}
    //         {/* Otherwise display a message */}
    //         {filteredExpenses.length > 0 ? (
    //             <table className="w-full max-w-full mb-4 bg-transparent">
    //                 <thead>
    //                     <tr>
    //                         <th scope="col">Description</th>
    //                         <th scope="col">Cost</th>
    //                         <th scope="col">Category</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {filteredExpenses.map((expense) => (
    //                         <Expenseexpense
    //                             key={expense.id}
    //                             id={expense.id}
    //                             description={expense.description}
    //                             cost={expense.cost}
    //                             category={expense.category}
    //                         />
    //                     ))}
    //                 </tbody>
    //             </table>
    //         ) : (
    //             <p className="text-black text-center">No expenses found.</p>
    //         )}            
    //     </>    
    // );

    return (
        <>
            <select 
                name="" 
                id="" 
                className=
                    "bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
                onChange={handleChange}
            >
                <option value=""></option>
                <option value="home">Home</option>
                <option value="utilities">Utilities</option>
                <option value="auto">Auto</option>
                <option value="groceries">Groceries</option>
                <option value="childcare">Childcare</option>
                <option value="medical">Medical</option>
                <option value="entertainment">Entertainment</option>
            </select>
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