-- CreateTable
CREATE TABLE "sells" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DECIMAL(7,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sells_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sells" ADD CONSTRAINT "sells_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
