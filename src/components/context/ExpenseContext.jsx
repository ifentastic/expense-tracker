import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

// Expense reducer to update the state based on the action
export function ExpenseReducer(state, action) {
    switch (action.type) {
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

    // Return context. Pass in values
    return (
        <ExpenseContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                dispatch
            }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}