/*
  Warnings:

  - You are about to drop the column `moduleKey` on the `services` table. All the data in the column will be lost.
  - Added the required column `moduleName` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_services" (
    "serviceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceName" TEXT NOT NULL,
    "serviceDescription" TEXT,
    "moduleName" TEXT NOT NULL,
    CONSTRAINT "services_moduleName_fkey" FOREIGN KEY ("moduleName") REFERENCES "modules" ("moduleName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_services" ("serviceDescription", "serviceId", "serviceName") SELECT "serviceDescription", "serviceId", "serviceName" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
CREATE UNIQUE INDEX "services_serviceName_key" ON "services"("serviceName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
