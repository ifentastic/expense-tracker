import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, setExpenses }) {
    function removeExpenseHandler(id) {
        setExpenses(expenses.filter(expense => expense.id !== id));
    }

    return (
        // Iterate over expense list and display an expense item
       <ul className="flex flex-col pl-0 mb-0 border rounded border-gray-300">
        {expenses.map((expense) => (
            <ExpenseItem 
                key={expense.id} 
                id={expense.id} 
                name={expense.name} 
                cost={expense.cost}
                onRemove={removeExpenseHandler} 
            />
        ))}
       </ul>
    );
}