-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_productId_fkey";

-- AlterTable
ALTER TABLE "order_details" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
