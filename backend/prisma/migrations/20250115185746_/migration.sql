/*
  Warnings:

  - The values [GRAPHICS_CARD] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('LAPTOP', 'PRINTER', 'MONITOR', 'ALL_IN_ONE', 'DESKTOP', 'CUSTOM_PC', 'ACCESSORY', 'MOTHERBOARD', 'PROCESSOR', 'RAM', 'SSD', 'HDD', 'CABINET', 'FAN', 'GPU', 'SCREEN', 'KEYBOARD', 'MOUSE', 'PSU');
ALTER TABLE "products" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;
