CREATE TYPE "public"."generationRequestStatus" AS ENUM('queued', 'running', 'completed', 'failed', 'cancelled');--> statement-breakpoint
ALTER TABLE "generationRequest" ALTER COLUMN "status" SET DATA TYPE "public"."generationRequestStatus" USING "status"::"public"."generationRequestStatus";--> statement-breakpoint
ALTER TABLE "generationStage" DROP COLUMN "status";