CREATE TABLE "users" (
  "user_id" varchar(225) PRIMARY KEY,
  "name" varchar(225),
  "email" varchar(225),

  -- optional cache
  "job_req_id_array" varchar[]
);

-- =========================
-- JOB REQUIREMENTS
-- =========================

CREATE TABLE "job_requirements" (
  "job_req_id" varchar(225) PRIMARY KEY,

  "user_id" varchar(225) NOT NULL,

  "added_date" TIMESTAMPTZ DEFAULT NOW(),

  "job_title" varchar(225) NOT NULL,
  "location" varchar(225) NOT NULL,

  "is_remote" boolean,
  "is_intern" boolean,
  "is_fresher" boolean
);

-- =========================
-- JOB UPDATE DETAILS
-- =========================

CREATE TABLE "job_update_details" (
  "id" serial PRIMARY KEY,

  "job_req_id" varchar(225) NOT NULL,

  "added_on" TIMESTAMPTZ DEFAULT NOW(),

  "job_title" varchar(225) NOT NULL,
  "company" varchar(225),

  "job_provider" varchar(100) NOT NULL,
  "job_location" varchar(225) NOT NULL,

  -- 🔥 CHANGED TO TEXT
  "job_url" TEXT NOT NULL,

  "is_internship" boolean,
  "is_remote" boolean,
  "is_fresher" boolean
);

-- =========================
-- JOB SEEN INDEX
-- =========================

CREATE TABLE "job_seen_index" (
  "id" serial PRIMARY KEY,

  "platform_job_id" varchar(225)
  UNIQUE NOT NULL,

  "job_req_id" varchar(225) NOT NULL,

  "source" varchar(100),
  "title" varchar(225),
  "company" varchar(225),
  "location" varchar(225),

  -- 🔥 CHANGED TO TEXT
  "url" TEXT,

  "first_seen" timestamptz DEFAULT NOW(),
  "last_seen" timestamptz DEFAULT NOW(),

  "seen_count" integer DEFAULT 1,

  "is_active" boolean DEFAULT true
);

-- =========================
-- BOOKMARKS
-- =========================

CREATE TABLE "bookmarks" (
  "id" serial PRIMARY KEY,

  "user_id" varchar(225) NOT NULL,

  "job_update_id" integer NOT NULL,

  "created_at" timestamptz DEFAULT NOW(),

  CONSTRAINT "unique_user_job"
  UNIQUE ("user_id", "job_update_id")
);

-- =========================
-- INDEXES
-- =========================

CREATE INDEX "idx_details_job_req_id"
ON "job_update_details" ("job_req_id");

CREATE INDEX "idx_seen_platform_job_id"
ON "job_seen_index" ("platform_job_id");

CREATE INDEX "idx_seen_last_seen"
ON "job_seen_index" ("last_seen");

CREATE INDEX "idx_seen_job_req_id"
ON "job_seen_index" ("job_req_id");

CREATE INDEX "idx_bookmarks_user_id"
ON "bookmarks" ("user_id");

CREATE INDEX "idx_bookmarks_job_update_id"
ON "bookmarks" ("job_update_id");

-- =========================
-- FOREIGN KEYS
-- =========================

ALTER TABLE "job_requirements"
ADD CONSTRAINT "fk_job_requirements_user"
FOREIGN KEY ("user_id")
REFERENCES "users" ("user_id")
ON DELETE CASCADE;

ALTER TABLE "job_update_details"
ADD CONSTRAINT "fk_job_updates_requirement"
FOREIGN KEY ("job_req_id")
REFERENCES "job_requirements" ("job_req_id")
ON DELETE CASCADE;

ALTER TABLE "job_seen_index"
ADD CONSTRAINT "fk_seen_requirement"
FOREIGN KEY ("job_req_id")
REFERENCES "job_requirements" ("job_req_id")
ON DELETE CASCADE;

ALTER TABLE "bookmarks"
ADD CONSTRAINT "fk_bookmarks_user"
FOREIGN KEY ("user_id")
REFERENCES "users" ("user_id")
ON DELETE CASCADE;

ALTER TABLE "bookmarks"
ADD CONSTRAINT "fk_bookmarks_job"
FOREIGN KEY ("job_update_id")
REFERENCES "job_update_details" ("id")
ON DELETE CASCADE;