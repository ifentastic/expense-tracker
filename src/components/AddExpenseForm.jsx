import { useState } from "react";

export default function AddExpenseForm({ onSaveExpenseData, onCancel }) {
    // Manage state of entered expense name and cost
    const [enteredName, setEnteredName] = useState("");
    const [enteredCost, setEnteredCost] = useState("");

    function nameChangeHandler(event) {
        setEnteredName(event.target.value);
    };

    function costChangeHandler(event) {
        setEnteredCost(event.target.value);
    };

    // Function to submit the form
    function submitHandler(event) {
        event.preventDefault(); // cancel operation that caused event to be dispatched
        const expenseData = {
            name: enteredName,
            cost: +enteredCost
        };
        // Save expense data and clear it upon submission
        onSaveExpenseData(expenseData);
        setEnteredName("");
        setEnteredCost("");
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="flex flex-wrap">
                <div className="relative sm:flex-grow sm:flex-1">
                    {/* Label and input for name and cost */}
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        type="text"
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="name"
                        value={enteredName}
                        onChange={nameChangeHandler}
                    />
                </div>
                <div className="relative sm:flex-grow sm:flex-1">
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
            </div>
            <div className="flex flex-wrap">
                <div className="relative sm:flex-grow sm:flex-1">
                    <button
                        className="inline-block align-middle text-center select-none border font-bold whitespace-nowrap rounded py-1 px-3 leading-normal no-underline bg-white text-blue-600 mt-3 border-none mr-auto"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="inline-block align-middle text-center select-none border font-bold whitespace-nowrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 mt-3"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}