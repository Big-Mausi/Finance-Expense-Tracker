import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getExpenses);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
