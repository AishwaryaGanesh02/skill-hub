/*
  Warnings:

  - You are about to drop the `_DesignationSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DesignationSkills" DROP CONSTRAINT "_DesignationSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_DesignationSkills" DROP CONSTRAINT "_DesignationSkills_B_fkey";

-- DropTable
DROP TABLE "_DesignationSkills";

-- CreateTable
CREATE TABLE "DesignationSkill" (
    "id" SERIAL NOT NULL,
    "degnid" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "DesignationSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DesignationSkill" ADD CONSTRAINT "DesignationSkill_degnid_fkey" FOREIGN KEY ("degnid") REFERENCES "Designation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignationSkill" ADD CONSTRAINT "DesignationSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
