/*
  Warnings:

  - You are about to drop the column `orderId` on the `order_detals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_detals" DROP CONSTRAINT "order_detals_orderId_fkey";

-- AlterTable
ALTER TABLE "order_detals" DROP COLUMN "orderId";
