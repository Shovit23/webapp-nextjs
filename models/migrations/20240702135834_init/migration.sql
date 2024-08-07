-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "roleName" TEXT NOT NULL,
    CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "roles_list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "modules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moduleKey" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "moduleDescription" TEXT,
    "moduleOwner" TEXT
);

-- CreateTable
CREATE TABLE "services" (
    "serviceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceName" TEXT NOT NULL,
    "serviceDescription" TEXT,
    "moduleKey" TEXT NOT NULL,
    CONSTRAINT "services_moduleKey_fkey" FOREIGN KEY ("moduleKey") REFERENCES "modules" ("moduleKey") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_list_roleName_key" ON "roles_list"("roleName");

-- CreateIndex
CREATE UNIQUE INDEX "modules_moduleKey_key" ON "modules"("moduleKey");

-- CreateIndex
CREATE UNIQUE INDEX "modules_moduleName_key" ON "modules"("moduleName");

-- CreateIndex
CREATE UNIQUE INDEX "services_serviceName_key" ON "services"("serviceName");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_email_key" ON "user_token"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_token_key" ON "user_token"("token");
