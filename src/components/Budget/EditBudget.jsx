import { useState } from "react";

export default function EditBudget({ budget, onSave, onCancel }) {
    // use initial budget to edit
    const [value, setValue] = useState(budget); // Initialize state with the budget prop

    function handleEditValue(event) {
        setValue(event.target.value); // Update state with the input value
    }

    return (
        <>
            <input
                required
                type="number"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded mr-3"
                id="name"
                value={value}
                onChange={handleEditValue}
            />
            <button
                type="button"
                className="inline-block align-middle text-center select-none border-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-gray-500 text-white hover:bg-gray-600 mr-3"
                onClick={onCancel}
            >
                Cancel
            </button>
            <button
                type="button"
                className="inline-block align-middle text-center select-none border-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600"
                onClick={() => onSave(value)}
            >
                Save
            </button>
        </>
    );
}