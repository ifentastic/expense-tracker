import { useState } from "react";

import AddExpenseForm from "./AddExpenseForm";

export default function NewExpense({ onAddExpense }) {
    // Manage state of editing data
    const [isEditing, setIsEditing] = useState(false);

    function saveExpenseDataHandler(enteredExpenseData) {
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
            </div>
        </div>    
    );
}