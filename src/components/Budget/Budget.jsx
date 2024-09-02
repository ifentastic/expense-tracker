import { useState } from "react";
import EditBudget from "./EditBudget";
import ViewBudget from "./ViewBudget";

export default function Budget({ budget, handleSaveClick }) {
    // Manage editing state
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleSave(value) {
        handleSaveClick(value);
        setIsEditing(false);
    }
    
    return (
        <div 
            className="relative px-3 py-3 mb-4 border rounded bg-gray-300 border-gray-400 text-gray-800 p-6 flex items-center justify-between" 
            role="alert"
        > {/* gray background */}
            {isEditing ? (
                <EditBudget onSave={handleSave} budget={budget} />
            ) : (
                <ViewBudget handleEditClick={handleEditClick} budget={budget} />
            )}
        </div>
    );
}