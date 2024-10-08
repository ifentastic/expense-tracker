import { useState } from "react";

export default function EditBudget({ budget, onSave }) {
    // use initial budget to edit
    const [value, setValue] = useState(budget);

    function handleEditValue(event) {
        setValue(event.target.value);
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
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                onClick={() => onSave(value)}
            >
                Save
            </button>
        </>
    );
}