export default function ViewBudget({ budget, onEdit }) {
    // https://github.com/chrisblakely01/react-budget-app/blob/main/src/components/ViewBudget.js
    // Render the current budget and a button for editing it
    return (
        <>
            <span>Budget: ${budget}</span>
            <button
                type="button"
                className="inline-block align-middle text-center select-none border-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-500 text-white hover:bg-blue-600"
                onClick={onEdit}
            >
                Edit
            </button>
        </>
    );
}