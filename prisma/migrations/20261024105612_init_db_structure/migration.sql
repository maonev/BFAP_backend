-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "role" "Role" NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Content" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "social_links" JSONB NOT NULL,
    "summary" VARCHAR(100) NOT NULL,
    "bio" TEXT NOT NULL,
    "spotify_refresh_token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Experiences" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "job_title" VARCHAR(50) NOT NULL,
    "company_name" VARCHAR(50) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "summary_jobdesk" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "isCurrent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Experiences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_slug_key" ON "Users"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_Content_user_id_key" ON "User_Content"("user_id");

-- AddForeignKey
ALTER TABLE "User_Content" ADD CONSTRAINT "User_Content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Experiences" ADD CONSTRAINT "User_Experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
