import { useContext } from "react"
import { ExpenseContext } from "../context/ExpenseContext"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

export default function ExpenseBarChart() {
    const { expenses, budget } = useContext(ExpenseContext);

    // Data to plot on the bar chart
    const data = expenses.map(expense => ({
        name: expense.name,
        cost: expense.cost
    }));
    
    return (
        <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /> {/* Name on x-axis */}
            <YAxis domain={[0, budget]} /> {/* Cost on y-axis from 0 to set budget */}
            <Tooltip />
            <Legend />
            <Bar dataKey="cost" fill="#3b82f6" /> {/* Color of the bars */}
        </BarChart>
    )
}