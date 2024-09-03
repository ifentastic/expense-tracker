export default function ViewBudget({ budget, onEdit }) {
    return (
        <>
            <span>Budget: ${budget}</span>
            <button
                type="button"
                className="inline-block align-middle text-center select-none border-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                onClick={onEdit}
            >
                Edit
            </button>
        </>
    );
}