/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `manufacturers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `manufacturers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sells` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "manufacturers_name_key";

-- AlterTable
ALTER TABLE "manufacturers" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sells" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "manufacturers_userId_name_key" ON "manufacturers"("userId", "name");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manufacturers" ADD CONSTRAINT "manufacturers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
