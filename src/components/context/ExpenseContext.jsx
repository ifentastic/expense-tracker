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
    budget: 2000,
    expenses: [
        { id: uuidv4(), name: "Shopping", cost: 40 },
        { id: uuidv4(), name: "Car Service", cost: 400 },
        { id: uuidv4(), name: "Salaries", cost: 1400 }
    ]
}

// Create context — what our components import and use to access the state
export const ExpenseContext = createContext();

// Provider component: wraps the components
// Accepts the children, the nested components
export function ExpenseProvider({ children }) {
    // Set up app state by taking a reducer and an initial state
    const [state, dispatch] = useReducer(ExpenseReducer, initialState)

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