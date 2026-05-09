CREATE TABLE "users" (
  "user_id" varchar(225) PRIMARY KEY,
  "name" varchar(225),
  "email" varchar(225),
  "job_req_id_array" varchar[]
);

CREATE TABLE "job_requirements" (
  "job_req_id" varchar(225) PRIMARY KEY,
  "user_id" varchar(225) NOT NULL,
  "added_date" date,
  "job_title" varchar(225) NOT NULL,
  "location" varchar(225) NOT NULL,
  "is_remote" boolean,
  "is_intern" boolean,
  "is_fresher" boolean
);

CREATE TABLE "job_update_details" (
  "id" serial PRIMARY KEY,
  "job_req_id" varchar(225) NOT NULL,
  "added_on" TIMESTAMPTZ DEFAULT NOW(),
  "job_title" varchar(225) NOT NULL,
  "company" varchar(225),
  "job_provider" varchar(100) NOT NULL,
  "job_location" varchar(225) NOT NULL,
  "job_url" varchar(500) NOT NULL,
  "is_internship" boolean,
  "is_remote" boolean,
  "is_fresher" boolean
);

CREATE TABLE "job_seen_index" (
  "id" serial PRIMARY KEY,
  "platform_job_id" varchar(225) UNIQUE NOT NULL,
  "job_req_id" varchar(225) NOT NULL,
  "source" varchar(100),
  "title" varchar(225),
  "company" varchar(225),
  "location" varchar(225),
  "url" varchar(500),
  "first_seen" timestamptz DEFAULT (NOW()),
  "last_seen" timestamptz DEFAULT (NOW()),
  "seen_count" integer DEFAULT 1,
  "is_active" boolean DEFAULT true
);

CREATE INDEX "idx_details_job_req_id" ON "job_update_details" ("job_req_id");

CREATE INDEX "idx_seen_platform_job_id" ON "job_seen_index" ("platform_job_id");

CREATE INDEX "idx_seen_last_seen" ON "job_seen_index" ("last_seen");

CREATE INDEX "idx_seen_job_req_id" ON "job_seen_index" ("job_req_id");

-- ALTER TABLE "job_requirements" ADD FOREIGN KEY ("job_req_id") REFERENCES "users" ("job_req_id_array") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "job_update_details" ADD FOREIGN KEY ("job_req_id") REFERENCES "job_requirements" ("job_req_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "job_seen_index" ADD FOREIGN KEY ("job_req_id") REFERENCES "job_requirements" ("job_req_id") DEFERRABLE INITIALLY IMMEDIATE;
