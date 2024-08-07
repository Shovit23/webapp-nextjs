/*
  Warnings:

  - Added the required column `email` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_modules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moduleKey" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "moduleDescription" TEXT,
    "moduleOwner" TEXT,
    "email" TEXT NOT NULL,
    CONSTRAINT "modules_email_fkey" FOREIGN KEY ("email") REFERENCES "users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_modules" ("id", "moduleDescription", "moduleKey", "moduleName", "moduleOwner") SELECT "id", "moduleDescription", "moduleKey", "moduleName", "moduleOwner" FROM "modules";
DROP TABLE "modules";
ALTER TABLE "new_modules" RENAME TO "modules";
CREATE UNIQUE INDEX "modules_moduleKey_key" ON "modules"("moduleKey");
CREATE UNIQUE INDEX "modules_moduleName_key" ON "modules"("moduleName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
