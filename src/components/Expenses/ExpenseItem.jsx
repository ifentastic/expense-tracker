import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseItem({ id, description, cost, category }) {
    // Access context methods for editing and deleting expenses
    const { editExpense, deleteExpense } = useContext(ExpenseContext);

    // Local state to manage editeing and values of the expense item
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedCost, setEditedCost] = useState(cost);
    const [editedCategory, setEditedCategory] = useState(category);
    
    // Lines 16-55 were provided by Copilot
    // Call deleteExpense function to delete expense item
    function handleDeleteExpense() {
        deleteExpense(id);
    }

    // Handler for value state management based on user input
    function handleEditExpense(event) {
        const { name, value } = event.target;
        if (name === "description") {
            setEditedDescription(value);
        }

        if (name === "cost") {
            setEditedCost(value);
        }

        if (name === "category") {
            setEditedCategory(value);
        }
    }

    // Function to save expense
    function handleSaveExpense(event) {
        event.preventDefault(); // Prevent default form submission
        const updatedExpense = {
            description: editedDescription,
            cost: parseFloat(editedCost).toFixed(2),
            category: editedCategory
        };

        editExpense(id, updatedExpense); // Call editExpense function
        setIsEditing(false);
    }

    function handleCancelEdit() {
        // Reset editing state and restore original values
        setIsEditing(false);
        setEditedDescription(description);
        setEditedCost(cost);
        setEditedCategory(category);
    }
    
    /* Render expense items in a tabular format (provided by ChatGPT),
    along with buttons for editing or deleting an expense item or
    buttons for saving or cancelling the edit (provided by https://www.youtube.com/watch?v=N7iSU2dn9TU),
    depending on editing state */
    return (
        <tr>
            <td className="border-b-2">
                {isEditing ? (
                    <input
                        type="text"
                        name="description"
                        value={editedDescription}
                        onChange={handleEditExpense}
                        placeholder="Expense Description"
                    />
                ) : (
                    description
                )}
            </td>
            <td className="border-b-2">
                {isEditing ? (
                    <input
                        type="number"
                        name="cost"
                        value={editedCost}
                        onChange={handleEditExpense}
                        placeholder="Expense Cost"
                    />
                ) : (
                    `$${cost}`
                )}                
            </td>
            <td className="border-b-2">
                {isEditing ? (
                    <input
                        type="text"
                        name="category"
                        value={editedCategory}
                        onChange={handleEditExpense}
                        placeholder="Expense Category"
                    />
                ) : (
                    category
                )}
            </td>            
            {isEditing ? (
                <td className="border-b-2">
                    <button
                        className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white font-bold py-2 px-4 rounded"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>
                    <button
                        className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded ml-3"
                        onClick={handleSaveExpense}
                    >
                        Save
                    </button>
                </td>
            ) : (
                <td className="border-b-2">
                    <button
                        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                    <button
                        className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded ml-3"
                        onClick={handleDeleteExpense}
                    >
                        Delete
                    </button>
                </td>
            )}    
        </tr>
    );
}