import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // unique IDs for each expense
import { ExpenseContext } from "../context/ExpenseContext";
import ErrorModal from "./ErrorModal";

export default function AddExpenseForm() {
    // Access budget, expenses and context method for adding an expense item
    const { budget, expenses, addExpense } = useContext(ExpenseContext);
    
    // Manage state of new expense with description, cost, and category
    const [newExpense, setNewExpense] = useState({
        description: "",
        cost: "",
        category: ""
    });

    // Manage editing, loading, and error states
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Function to add an expense
    function changeHandler(event) {
        // Update the newExpense state whenever an input field changes 
        // Maintain the existing state while updating the specific field that has changed
        const { name, value } = event.target;
        setNewExpense({ ...newExpense, [name]: value});
    }

    // Function to submit the form
    async function submitHandler(event) {
        event.preventDefault(); // prevent default submission behavior
        setIsLoading(true);
        setError(null);

        const totalSpent = expenses.reduce((total, item) => {
            return total += item.cost;
        }, 0);

        try {
            // Format cost to 2 decimal places
            const formattedCost = parseFloat(newExpense.cost).toFixed(2);

            // Generate unique ID and include formatted cost
            const expenseWithId = {
                ...newExpense, id: uuidv4(),
                cost: formattedCost
            };
            await addExpense(expenseWithId);
            setNewExpense({ description: "", cost: "", category: "" });
            setIsEditing(false); // Hide form after submission
          } catch (error) {
            // Check if cost or total amount spent exceeds the budget
            if (newExpense.cost > budget || totalSpent + newExpense.cost > budget) {
                setError("Cost or total expenses exceed the budget! Please remove the expense or reduce the cost.", error);    
            }
          } finally {
            setIsLoading(false);
          }    
    }

    // Function to start editing
    function handleStartEdit() {
        setIsEditing(true); // Show form on button click
    }

    // Function to cancel the edit
    function handleCancelEdit() {
        // Clear expense data
        setNewExpense({
            description: "", 
            cost: "", 
            category: ""
        });
        setIsEditing(false); // Hide form on cancel
    }

    // Function to close error modal
    function closeErrorHandler() {
        setError(null); // Clear error message
    }

    return (
        <div>
            {isEditing ? (
                <form onSubmit={submitHandler}>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <label htmlFor="description">Description</label>
                            <input
                                required
                                type="text"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                name="description"
                                value={newExpense.description}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="cost">Cost</label>
                            <input
                                required
                                type="number"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                name="cost"
                                value={newExpense.cost}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="category">Category</label>
                            <input
                                required
                                type="text"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                name="category"
                                value={newExpense.category}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-block align-middle text-center font-bold select-none border-none whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-white text-blue-600 hover:bg-white mt-3"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-block align-middle text-center select-none border font-bold whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 mt-3"
                        >
                            Submit
                        </button>
                    </div>            
                </form>
            ) : (
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-4 m-8 w-64 max-w-full rounded-xl text-center"
                    onClick={handleStartEdit}
                >
                    Add Expense
                </button>
            )}
            {error && (
                <ErrorModal 
                    title="Error" 
                    message={error}
                    onClose={closeErrorHandler}
                />
            )}
        </div>                                                    
    );
}