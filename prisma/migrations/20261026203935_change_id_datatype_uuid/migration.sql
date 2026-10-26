/*
  Warnings:

  - The primary key for the `User_Content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User_Experiences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "User_Content" DROP CONSTRAINT "User_Content_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Experiences" DROP CONSTRAINT "User_Experiences_user_id_fkey";

-- AlterTable
ALTER TABLE "User_Content" DROP CONSTRAINT "User_Content_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_Content_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_Content_id_seq";

-- AlterTable
ALTER TABLE "User_Experiences" DROP CONSTRAINT "User_Experiences_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_Experiences_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_Experiences_id_seq";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Users_id_seq";

-- AddForeignKey
ALTER TABLE "User_Content" ADD CONSTRAINT "User_Content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Experiences" ADD CONSTRAINT "User_Experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
