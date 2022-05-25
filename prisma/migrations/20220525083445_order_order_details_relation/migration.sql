/*
  Warnings:

  - Added the required column `orderId` to the `order_detals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_detals" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_detals" ADD CONSTRAINT "order_detals_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
