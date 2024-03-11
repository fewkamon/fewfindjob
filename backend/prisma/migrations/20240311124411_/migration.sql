-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "PrivateVehicle" AS ENUM ('CAR', 'MOTORCYCLE', 'TRUCK');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "DrivingAbility" AS ENUM ('TRUCK', 'MOTORCYCLE', 'CAR', 'PICKUP_TRUCK', 'FORKLIFT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('JOB_SEEKER', 'COMPANY', 'ADMIN');

-- CreateEnum
CREATE TYPE "RecruitStatus" AS ENUM ('PENDING', 'SUCCESS', 'REJECTED');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CHECK', 'APPROVE', 'DISAPPROVAL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'JOB_SEEKER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobseeker" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "userId" INTEGER NOT NULL,
    "dob" TEXT,
    "gender" "Gender",
    "phonenumber" TEXT,
    "image" TEXT,
    "skillId" INTEGER,

    CONSTRAINT "Jobseeker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "phonenumber" TEXT,
    "companyname" TEXT,
    "description" TEXT,
    "name" TEXT,
    "image" TEXT,
    "benefits" TEXT[],
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "amount" DOUBLE PRECISION,
    "salary" INTEGER NOT NULL,
    "jobType" "JobType",
    "qualification" TEXT,
    "how_to_apply" TEXT,
    "contact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "companyId" INTEGER,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "address" TEXT,
    "district" TEXT,
    "subdistrict" TEXT,
    "province" TEXT,
    "postalCode" INTEGER,
    "jobseekerId" INTEGER,
    "companyId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "th_typing" INTEGER,
    "eng_typing" INTEGER,
    "driving_ability" "DrivingAbility"[],
    "private_vehicle" "PrivateVehicle"[],
    "other_special_skills" TEXT,
    "achievements" TEXT,
    "other_experience" TEXT,
    "references" TEXT,
    "jobseekerId" INTEGER,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "detail" TEXT,
    "image" TEXT,
    "status" "NewsStatus" NOT NULL DEFAULT 'PRIVATE',
    "view" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruitmentUrgent" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "jobseekerId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "status" "RecruitStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruitmentUrgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "jobseekerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruitmentFile" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "status" "RecruitStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER,

    CONSTRAINT "RecruitmentFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Jobseeker_userId_key" ON "Jobseeker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_jobseekerId_key" ON "Location"("jobseekerId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_companyId_key" ON "Location"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_jobseekerId_key" ON "Skill"("jobseekerId");

-- AddForeignKey
ALTER TABLE "Jobseeker" ADD CONSTRAINT "Jobseeker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_jobseekerId_fkey" FOREIGN KEY ("jobseekerId") REFERENCES "Jobseeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_jobseekerId_fkey" FOREIGN KEY ("jobseekerId") REFERENCES "Jobseeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentUrgent" ADD CONSTRAINT "RecruitmentUrgent_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentUrgent" ADD CONSTRAINT "RecruitmentUrgent_jobseekerId_fkey" FOREIGN KEY ("jobseekerId") REFERENCES "Jobseeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentUrgent" ADD CONSTRAINT "RecruitmentUrgent_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_jobseekerId_fkey" FOREIGN KEY ("jobseekerId") REFERENCES "Jobseeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentFile" ADD CONSTRAINT "RecruitmentFile_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentFile" ADD CONSTRAINT "RecruitmentFile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
