import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseItem({ id, description, cost, category }) {
    const { dispatch } = useContext(ExpenseContext);

    // Manage state of edited description, cost, and category
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedCost, setEditedCost] = useState(cost);
    const [editedCategory, setEditedCategory] = useState(category);
    
    function handleRemoveExpense() {
        dispatch({
            type: "DELETE_EXPENSE",
            payload: id
        });
    }

    function handleEditExpense() {
        setIsEditing(true);
    }

    function handleEditDescription(event) {
        setEditedDescription(event.target.value);
    }

    function handleEditCost(event) {
        setEditedCost(event.target.value);
    }

    function handleEditCategory(event) {
        setEditedCategory(event.target.value);
    }

    function handleSaveExpense() {
        dispatch({
            type: "EDIT_EXPENSE",
            payload: { id, description: editedDescription, cost: +editedCost }
        });
        setIsEditing(false);
    }

    function handleCancelEdit() {
        setIsEditing(false);
        setEditedDescription(description);
        setEditedCost(cost);
    }
    
    return (
    //   <li className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center" >
    //     {description} {/* List expense item */}
    //     {isEditing ? (
    //         <div>
    //         <input
    //             type="text"
    //             value={editedDescription}
    //             onChange={handleEditDescription}
    //             placeholder="Expense Description"
    //         />
    //         <input
    //             type="number"
    //             value={editedCost}
    //             onChange={handleEditCost}
    //             placeholder="Expense Cost"
    //         />
    //         <input
    //             type="text"
    //             value={editedCategory}
    //             onChange={handleEditCategory}
    //             placeholder="Expense Category"
    //         />
    //         <button
    //             className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded mr-3"
    //             onClick={handleCancelEdit}
    //         >
    //             Cancel
    //         </button>
    //         <button
    //             className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded"
    //             onClick={handleSaveExpense}
    //         >
    //             Save
    //         </button>
    //     </div>
    //     ) : (
    //         <div className="flex justify-end items-center">
    //             <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-blue-500 text-white hover:bg-blue-600 py-1 px-3 mr-3">
    //                 ${cost} {/* Cost of the expense */}
    //             </span>
    //             <button
    //                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded mr-3"
    //                 onClick={handleEditExpense}
    //             >
    //                 Edit
    //             </button>
    //             <button 
    //                 className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded" 
    //                 onClick={handleRemoveExpense}
    //             >
    //                 Remove
    //             </button>
    //         </div> 
    //     )}    
    //   </li>
        <tr>
            <td className="border border-gray-300 px-4 py-2">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedDescription}
                        onChange={handleEditDescription}
                        placeholder="Expense Description"
                    />
                ) : (
                    description
                )}
            </td>
            <td className="border border-gray-300 px-4 py-2">
                {isEditing ? (
                    <input
                        type="number"
                        value={editedCost}
                        onChange={handleEditCost}
                        placeholder="Expense Cost"
                    />
                ) : (
                    `$${cost}`
                )}                
            </td>
            <td className="border border-gray-300 px-4 py-2">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedCategory}
                        onChange={handleEditCategory}
                        placeholder="Expense Category"
                    />
                ) : (
                    category
                )}
            </td>            
            {isEditing ? (
                <div>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded ml-3"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded ml-3"
                        onClick={handleSaveExpense}
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded ml-3"
                        onClick={handleEditExpense}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded ml-3"
                        onClick={handleRemoveExpense}
                    >
                        Remove
                    </button>
                </div>
            )}    
        </tr>
    );
}