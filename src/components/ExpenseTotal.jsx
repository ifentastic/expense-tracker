export default function ExpenseTotal({ expenses }) {
    const total = expenses.reduce((total, item) => {
        return total += item.cost;
    }, 0);
    
    return (
        <div
            className="relative px-3 py-4 mb-4 pb-4 border rounded text-blue-800 bg-blue-200 border-blue-300"
        > {/* blue background */}
            <span>Spent so far: ${total}</span>
        </div>
    );
}