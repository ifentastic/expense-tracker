export default function ExpenseItem({ id, name, cost, onRemove }) {
    return (
      <li className="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center" >
        {name} {/* List expense item */}
        <div>
            <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-blue-500 text-white hover:bg-blue-600 py-1 px-3 mr-3">
                ${cost} {/* Cost of the expense */}
            </span>
            <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded" 
                onClick={onRemove}
            >
                Remove
            </button>
        </div>
      </li> 
    );
}