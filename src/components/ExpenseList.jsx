import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ setItems }) {
    // Dummy list of expenses
    const expenses = [
        { id: 1, name: "Shopping", cost: 40 },
        { id: 2, name: "Car Service", cost: 400 },
        { id: 3, name: "Salaries", cost: 4000 }
    ];

    function removeExpenseHandler(id) {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        // Iterate over expense list and display an expense item
       <ul className="flex flex-col pl-0 mb-0 border rounded border-gray-300">
        {expenses.map((expense) => (
            <ExpenseItem 
                key={expense.id} 
                id={expense.id} 
                name={expense.name} 
                cost={expense.cost}
                onRemove={() => removeExpenseHandler(expense.id)} 
            />
        ))}
       </ul>
    );
}