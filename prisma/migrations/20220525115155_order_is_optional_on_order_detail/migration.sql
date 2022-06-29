-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_orderId_fkey";

-- AlterTable
ALTER TABLE "order_details" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
