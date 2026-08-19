-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'EXPENSE';
