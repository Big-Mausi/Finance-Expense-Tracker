import type { Request, Response } from "express";
import prisma from "../prisma.js";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { title, amount, category } = req.body;

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        category,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expense",
    });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, amount, category } = req.body;

    const expense = await prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        amount,
        category,
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
