-- DropForeignKey
ALTER TABLE "Guide" DROP CONSTRAINT "Guide_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Guide" DROP CONSTRAINT "Guide_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
