/*
  Warnings:

  - You are about to drop the column `email` on the `modules` table. All the data in the column will be lost.
  - Made the column `moduleOwner` on table `modules` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_modules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moduleKey" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "moduleDescription" TEXT,
    "moduleOwner" TEXT NOT NULL,
    CONSTRAINT "modules_moduleOwner_fkey" FOREIGN KEY ("moduleOwner") REFERENCES "users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_modules" ("id", "moduleDescription", "moduleKey", "moduleName", "moduleOwner") SELECT "id", "moduleDescription", "moduleKey", "moduleName", "moduleOwner" FROM "modules";
DROP TABLE "modules";
ALTER TABLE "new_modules" RENAME TO "modules";
CREATE UNIQUE INDEX "modules_moduleKey_key" ON "modules"("moduleKey");
CREATE UNIQUE INDEX "modules_moduleName_key" ON "modules"("moduleName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
