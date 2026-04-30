CREATE TABLE "generationRequest" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"status" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generationStage" (
	"id" text PRIMARY KEY NOT NULL,
	"requestId" text NOT NULL,
	"stage" text NOT NULL,
	"status" text NOT NULL,
	"attempt" integer DEFAULT 0 NOT NULL,
	"startedAt" timestamp,
	"finishedAt" timestamp,
	CONSTRAINT "unique_generation_stage_request_id_stage_attempt" UNIQUE("requestId","stage","attempt")
);
--> statement-breakpoint
CREATE TABLE "resumeVersion" (
	"id" text PRIMARY KEY NOT NULL,
	"requestId" text NOT NULL,
	"kind" text NOT NULL,
	"mongoDocumentId" text NOT NULL,
	"scoreOverall" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "generationRequest" ADD CONSTRAINT "generationRequest_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generationStage" ADD CONSTRAINT "generationStage_requestId_generationRequest_id_fk" FOREIGN KEY ("requestId") REFERENCES "public"."generationRequest"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumeVersion" ADD CONSTRAINT "resumeVersion_requestId_generationRequest_id_fk" FOREIGN KEY ("requestId") REFERENCES "public"."generationRequest"("id") ON DELETE cascade ON UPDATE no action;