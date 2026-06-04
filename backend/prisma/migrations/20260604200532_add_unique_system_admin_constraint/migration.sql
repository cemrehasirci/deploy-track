CREATE UNIQUE INDEX "User_single_system_admin_idx"
ON "User" ("isSystemAdmin")
WHERE "isSystemAdmin" = true;