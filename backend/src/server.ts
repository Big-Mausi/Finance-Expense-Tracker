import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expense.routes.js";

const app = express();
const PORT = process.env.PORT || 4005;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});
app.use("/expenses", expenseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
