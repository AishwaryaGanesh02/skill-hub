/*
  Warnings:

  - You are about to drop the column `degnid` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `level` to the `UserSkill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_degnid_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "degnid";

-- AlterTable
ALTER TABLE "UserSkill" ADD COLUMN     "level" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_DesignationSkills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DesignationSkills_AB_unique" ON "_DesignationSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_DesignationSkills_B_index" ON "_DesignationSkills"("B");

-- AddForeignKey
ALTER TABLE "_DesignationSkills" ADD CONSTRAINT "_DesignationSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Designation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesignationSkills" ADD CONSTRAINT "_DesignationSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
