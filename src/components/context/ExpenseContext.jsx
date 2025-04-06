import { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// Expense reducer to update the state based on the action
export function ExpenseReducer(state, action) {
    switch (action.type) {
        case "SET_EXPENSES":
            return {...state, expenses: action.payload };
        case "ADD_EXPENSE":
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };
        case "DELETE_EXPENSE":
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload
                )
            };
        case "EDIT_EXPENSE":
            return {
                ...state,
                expenses: state.expenses.map((expense) => (
                    expense.id === action.payload.id
                        ? { ...expense, ...action.payload }
                        : expense
                ))
            };
        case "EDIT_BUDGET":
            return {
                ...state,
                budget: action.payload
            };    
        default:
            return state;
    }
}

// Set initial state when app loads
const initialState = {
    budget: 3000,
    expenses: [
        { id: uuidv4(), description: "Lawn care", cost: 125, category: "Home" },
        { id: uuidv4(), description: "Cell phone", cost: 254, category: "Utilities" },
        { id: uuidv4(), description: "Gas", cost: 40, category: "Auto" },
        { id: uuidv4(), description: "2 bags of apples", cost: 4, category: "Groceries" },
        { id: uuidv4(), description: "Child support", cost: 500, category: "Childcare" },
        { id: uuidv4(), description: "Dental care", cost: 50, category: "Medical" },
        { id: uuidv4(), description: "1 Spotify subscription", cost: 12, category: "Entertainment" },
    ]
}

// Create context — what our components import and use to access the state
export const ExpenseContext = createContext();

// Provider component: wraps the components
// Accepts the children, the nested components
export function ExpenseProvider({ children }) {
    // Set up app state by taking a reducer and an initial state
    const [state, dispatch] = useReducer(ExpenseReducer, initialState);

    // Fetch expenses from backend when the component mounts
    useEffect(() => {
        async function fetchExpenses() {
            try {
                const response = await axios.get("http://localhost:5000/expenses");
                dispatch({ type: "SET_EXPENSES", payload: response.data });
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, []);

    // Function to add an expense
    async function addExpense(expense) {
        try {
            const response = await axios.post("http://localhost:5000/expenses", expense);
            dispatch({ type: "ADD_EXPENSE", payload: response.data }); // Assuming response data contains the added expense
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    // Function to delete an expense
    async function deleteExpense(id) {
        try {
            await axios.delete(`http://localhost:5000/expenses/${id}`);
            dispatch({ type: "DELETE_EXPENSE", payload: id });
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    }

    // Function to edit an expense
    async function editExpense(id, updatedExpense) {
        try {
            const response = await axios.put(
                `http://localhost:5000/expenses/${id}`, updatedExpense
            );
            dispatch({ type: "EDIT_EXPENSE", payload: response.data });
        } catch (error) {
            console.error("Error editing expense:", error);
        }
    }

    // Return context. Pass in values
    return (
        <ExpenseContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                dispatch,
                addExpense,
                deleteExpense,
                editExpense
            }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}