/*
  Warnings:

  - A unique constraint covering the columns `[CPF,userId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clients_CPF_userId_key" ON "clients"("CPF", "userId");
