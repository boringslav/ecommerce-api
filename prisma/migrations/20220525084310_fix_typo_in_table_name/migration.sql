/*
  Warnings:

  - You are about to drop the `order_detals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_detals" DROP CONSTRAINT "order_detals_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_detals" DROP CONSTRAINT "order_detals_productId_fkey";

-- DropTable
DROP TABLE "order_detals";

-- CreateTable
CREATE TABLE "order_details" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
