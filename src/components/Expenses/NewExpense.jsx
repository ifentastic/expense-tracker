import { useState } from "react";

import AddExpenseForm from "../UI/AddExpenseForm";
import ErrorModal from "../UI/ErrorModal";

export default function NewExpense({ onAddExpense, budget }) {
    // Manage state of editing data
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    function saveExpenseDataHandler(enteredExpenseData) {
        // Check if cost exceeds the budget
        if (enteredExpenseData.cost > budget) {
            setError("Cost exceeds the budget! Please remove the expense or reduce the cost.");
            return;
        }
        
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        onAddExpense(expenseData);
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
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div>
                {!isEditing && (
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-4 m-8 w-64 max-w-full rounded-xl text-center"
                        onClick={startEditingHandler}
                    >
                        Add Expense
                    </button>
                )}
                {isEditing && (
                    <AddExpenseForm 
                        onSaveExpenseData={saveExpenseDataHandler}
                        onCancel={stopEditingHandler}
                    />
                )}
                {error && (
                    <ErrorModal 
                        title="Error" 
                        message={error}
                        onClose={closeErrorHandler}
                    />
                )}
            </div>
        </div>    
    );
}