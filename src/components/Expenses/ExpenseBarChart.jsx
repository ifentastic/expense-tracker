import { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { ExpenseContext } from "../context/ExpenseContext";


export default function ExpenseBarChart() {
    // Access expenses from the context
    const { expenses } = useContext(ExpenseContext);

    // Function to categorize expenses
    function categorizeExpenses() {
        const categorizedData = {};

        // Iterate through expenses to categorize expenses and sum costs
        expenses.forEach(expense => {
            if (categorizedData[expense.category]) {
                categorizedData[expense.category] += parseFloat(expense.cost);
            }

            else {
                categorizedData[expense.category] = parseFloat(expense.cost);
            }
        });

        // Convert categorized data into an array for Recharts
        return Object.keys(categorizedData).map(category => ({
            category,
            cost: categorizedData[category],
        }));
    }

    // Categorized data for the chart
    const data = categorizeExpenses();

    // Formatter for Y-axis
    function dollarFormatter(value) {
        return `$${value}`;
    }
    
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={dollarFormatter} />
                <Tooltip formatter={(value) => [`$${value}`, "Cost"]} />
                <Bar dataKey="cost" fill="#0000ff" />
            </BarChart>
        </ResponsiveContainer>
    )
}