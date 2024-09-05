import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import EditBudget from "./EditBudget";
import ViewBudget from "./ViewBudget";

export default function Budget() {
    const { budget, dispatch } = useContext(ExpenseContext);
    
    // Manage editing state
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(true);
    }

    function handleSave(value) {
        dispatch({
            type: "EDIT_BUDGET",
            payload: value
        });
        setIsEditing(false);
    }

    function handleCancel() {
        setIsEditing(false);
    }
    
    return (
        <div 
            className="relative px-3 py-3 mb-4 border rounded bg-gray-300 border-gray-400 text-gray-800 p-6 flex items-center justify-between"
        > {/* gray background */}
            {isEditing ? (
                <EditBudget onSave={handleSave} budget={budget} onCancel={handleCancel} />
            ) : (
                <ViewBudget onEdit={handleEdit} budget={budget} />
            )}
        </div>
    );
}