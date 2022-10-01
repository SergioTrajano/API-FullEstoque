/*
  Warnings:

  - A unique constraint covering the columns `[userId,barcode]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "products_barcode_key";

-- CreateIndex
CREATE UNIQUE INDEX "products_userId_barcode_key" ON "products"("userId", "barcode");
