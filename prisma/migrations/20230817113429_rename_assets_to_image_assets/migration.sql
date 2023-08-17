-- AlterTable
ALTER TABLE "assets" RENAME TO "image_assets";

-- AlterTable
ALTER TABLE "image_assets" RENAME CONSTRAINT "assets_pkey" TO "image_assets_pkey";
