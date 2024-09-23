import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // unique IDs for each expense
import { ExpenseContext } from "../context/ExpenseContext";
import ErrorModal from "./ErrorModal";

export default function AddExpenseForm() {
    const { budget, expenses, dispatch } = useContext(ExpenseContext);
    
    // Manage state of entered expense description, cost, editing, and error
    const [enteredDescription, setEnteredDescrption] = useState("");
    const [enteredCost, setEnteredCost] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    function descrptionChangeHandler(event) {
        setEnteredDescrption(event.target.value);
    }

    function costChangeHandler(event) {
        setEnteredCost(event.target.value);
    }

    // Function to submit the form
    function submitHandler(event) {
        event.preventDefault(); // cancel operation that caused event to be dispatched
        const expenseData = {
            id: uuidv4(),
            description: enteredDescription,
            cost: +enteredCost,
            category: enteredCategory
        };

        const totalSpent = expenses.reduce((total, item) => {
            return total += item.cost;
        }, 0);

        // Check if cost exceeds the budget
        if (expenseData.cost > budget) {
            setError("Cost exceeds the budget! Please remove the expense or reduce the cost.");
            return;
        }

        // Check if total amount spent exceeds the budget
        if (totalSpent + expenseData.cost > budget) {
            setError("Total expenses exceed the budget! Please adjust your expenses.");
            return;
        }
        // Save expense data and clear it upon submission
        dispatch({
            type: "ADD_EXPENSE",
            payload: expenseData
        });
        setEnteredDescrption("");
        setEnteredCost("");
        setEnteredCategory("");
        setIsEditing(false);
    }

    function startEditingHandler() {
        setIsEditing(true);
    }

    function stopEditingHandler() {
        setIsEditing(false);
    }

    function closeErrorHandler() {
        setError(null);
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
                                id="name"
                                value={enteredDescription}
                                onChange={descrptionChangeHandler}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="cost">Cost</label>
                            <input
                                required
                                type="number"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                id="cost"
                                value={enteredCost}
                                onChange={costChangeHandler}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="category">Category</label>
                            <select 
                                name="" 
                                id="" 
                                className=
                                    "bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
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
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-block align-middle text-center font-bold select-none border-none whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-white text-blue-600 hover:bg-white mt-3"
                            onClick={stopEditingHandler}
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
                    onClick={startEditingHandler}
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