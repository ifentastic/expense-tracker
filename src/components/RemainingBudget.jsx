export default function RemainingBudget({ expenses, budget }) {
    const totalExpenses = expenses.reduce((total, item) => {
        return total += item.cost;
    }, 0);

    const alertType = totalExpenses > budget ? "bg-red-200 border-red-300 text-red-800" : "bg-green-200 border-green-300 text-green-800";
    
    return (
        <div 
            className={`relative px-3 py-4 mb-4 pb-4 items-center border rounded ${alertType}`}
        > {/* green or red background depending on whether the total anmount of expenses exceeds the budget */}
            <span>Remaining: ${budget - totalExpenses}</span>
        </div>
    );
}