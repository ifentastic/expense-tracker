import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const { Pool } = pg;
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Configuration
const pool = new Pool({
    user: "postgres", 
    host: "localhost",
    database: "expense_tracker", 
    password: "ifesql2024!", 
    port: 5433
});

// Middleware setup
app.use(cors());
app.use(express.json())

// Route definition
app.get("/", (req, res) => {
    res.send("Welcome to the Expense Tracker API!");
  });

// Get expenses
app.get("/expenses", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM expenses;");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching expenses"); // Log the error
        res.status(500).json({ error: error.message });
    }
  });
  
// Add an expense
app.post("/expenses", async (req, res) => {
    try {
        const { id, description, cost, category } = req.body;
        const result = await pool.query(
            "INSERT INTO expenses (id, description, cost, category) VALUES ($1, $2, $3, $4) RETURNING *;",
            [id, description, cost, category]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error adding expense:", error); // Log the error
        res.status(500).json({ error: error.message });
    }
});

// Delete an expense
app.delete("/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM expenses WHERE id = $1;", [id]);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ error: error.message });
    }
});

// Edit an expense
app.put("/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description, cost, category } = req.body;
        const result = await pool.query(
            "UPDATE expenses SET description = $1, cost = $2, category = $3 WHERE id = $4 RETURNING *;",
            [description, cost, category, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error editing expense:", error);
        res.status(500).json({ error: error.message });
    }
});  

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});