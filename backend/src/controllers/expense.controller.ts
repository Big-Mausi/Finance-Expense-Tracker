import type { Request, Response } from "express";
import prisma from "../prisma.js";
import { error } from "node:console";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await prisma.expense.findMany();

    console.log("Fetched expenses:", error);

    res.json(expenses);
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body);
    const { title, amount, category, type } = req.body;

    console.log("type received:", type);

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        category,
        type,
      },
    });

    console.log("Saved expense:", expense);

    res.status(201).json(expense);
  } catch (error) {
    console.error("Failed to create expense:", error);

    res.status(500).json({
      message: "Failed to create expense",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, amount, category, type } = req.body;

    const expense = await prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        amount,
        category,
        type,
      },
    });

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
    });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.expense.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
};
