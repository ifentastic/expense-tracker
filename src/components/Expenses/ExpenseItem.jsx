import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseItem({ id, name, cost }) {
    const { dispatch } = useContext(ExpenseContext);

    // Manage state of edited name and cost
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedCost, setEditedCost] = useState(cost);
    
    function handleRemoveExpense() {
        dispatch({
            type: "DELETE_EXPENSE",
            payload: id
        });
    }

    function handleEditExpense() {
        setIsEditing(true);
    }

    function handleEditName(event) {
        setEditedName(event.target.value);
    }

    function handleEditCost(event) {
        setEditedCost(event.target.value);
    }

    function handleSaveExpense() {
        dispatch({
            type: "EDIT_EXPENSE",
            payload: { id, name: editedName, cost: editedCost }
        });
        setIsEditing(false);
    }

    function handleCancelEdit() {
        setIsEditing(false);
        setEditedName(name);
        setEditedCost(cost);
    }
    
    return (
      <li className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center" >
        {name} {/* List expense item */}
        {isEditing ? (
            <div>
                <input
                    type="text"
                    value={editedName}
                    onChange={handleEditName}
                    placeholder="Expense Name"
                />
                <input
                    type="number"
                    value={editedCost}
                    onChange={handleEditCost}
                    placeholder="Expense Cost"
                />
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded"
                    onClick={handleCancelEdit}
                >
                    Cancel
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded"
                    onClick={handleSaveExpense}
                >
                    Save
                </button>
            </div>
        ) : (
           <div className="flex justify-end items-center">
                <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-blue-500 text-white hover:bg-blue-600 py-1 px-3 mr-3">
                    ${cost} {/* Cost of the expense */}
                </span>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded mr-3"
                    onClick={handleEditExpense}
                >
                    Edit
                </button>
                <button 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded" 
                    onClick={handleRemoveExpense}
                >
                    Remove
                </button>
            </div> 
        )}    
      </li> 
    );
}