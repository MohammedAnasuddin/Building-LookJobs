# LookJobs MVP - Test Specification Document For  Frontend

## Purpose

This document defines the expected behavior of all critical user flows within LookJobs. Every automated test should validate these scenarios and expected outcomes.

---

# Authentication

| ID       | Scenario              | Steps                       | Expected Result                              |
| -------- | --------------------- | --------------------------- | -------------------------------------------- |
| AUTH-001 | Unauthenticated User  | Open application            | Landing page displayed                       |
| AUTH-002 | Login                 | Click Get Started/Login     | Auth0 login flow starts                      |
| AUTH-003 | Successful Login      | Complete Auth0 login        | Dashboard displayed                          |
| AUTH-004 | Existing User Session | Refresh page                | User remains logged in                       |
| AUTH-005 | Expired Session       | Open app after token expiry | User redirected to landing page              |
| AUTH-006 | Logout                | Click Logout in Profile     | User logged out and returned to landing page |

---

# User Bootstrap

| ID       | Scenario       | Steps                       | Expected Result                            |
| -------- | -------------- | --------------------------- | ------------------------------------------ |
| USER-001 | First Login    | Login with new account      | User record created in database            |
| USER-002 | Existing Login | Login with existing account | Existing user loaded successfully          |
| USER-003 | Refresh        | Refresh application         | User bootstrap executes without duplicates |

---

# Job Requirements

| ID      | Scenario                  | Steps                 | Expected Result                  |
| ------- | ------------------------- | --------------------- | -------------------------------- |
| REQ-001 | Create Requirement        | Submit valid form     | Requirement created              |
| REQ-002 | Create Requirement Tab    | Submit valid form     | New tab appears                  |
| REQ-003 | Active Tab Switch         | Create requirement    | New tab becomes active           |
| REQ-004 | Requirement Refresh       | Refresh page          | Requirement remains visible      |
| REQ-005 | Delete Requirement        | Delete requirement    | Requirement removed              |
| REQ-006 | Delete Active Requirement | Delete selected tab   | Another valid tab becomes active |
| REQ-007 | Empty State               | No requirements exist | Empty state displayed            |

---

# Scraping Workflow

| ID         | Scenario                 | Steps              | Expected Result            |
| ---------- | ------------------------ | ------------------ | -------------------------- |
| SCRAPE-001 | Initial State            | Create requirement | Scraping card displayed    |
| SCRAPE-002 | Pending Status           | Scrape begins      | Pending stage displayed    |
| SCRAPE-003 | Scraping Status          | Scrape running     | Progress indicator visible |
| SCRAPE-004 | Completed Status         | Scrape finishes    | Scraping card disappears   |
| SCRAPE-005 | Job Results              | Scrape completes   | Jobs rendered              |
| SCRAPE-006 | Refresh During Scrape    | Refresh page       | Scrape state restored      |
| SCRAPE-007 | Refresh After Completion | Refresh page       | Jobs still visible         |

---

# Job Feed

| ID       | Scenario              | Steps                      | Expected Result        |
| -------- | --------------------- | -------------------------- | ---------------------- |
| FEED-001 | Render Jobs           | Open completed requirement | Jobs displayed         |
| FEED-002 | View Job              | Click View Job             | Job URL opens          |
| FEED-003 | Multiple Requirements | Switch tabs                | Correct jobs displayed |
| FEED-004 | Empty Requirement     | No jobs returned           | Empty state displayed  |
| FEED-005 | Feed Refresh          | Refresh page               | Same jobs displayed    |

---

# Job Grouping

| ID        | Scenario          | Steps                | Expected Result               |
| --------- | ----------------- | -------------------- | ----------------------------- |
| GROUP-001 | Today Group       | Jobs added today     | Appears under Today           |
| GROUP-002 | Yesterday Group   | Jobs added yesterday | Appears under Yesterday       |
| GROUP-003 | Week Group        | Older jobs           | Appears under This Week       |
| GROUP-004 | Group Order       | Mixed groups         | Today → Yesterday → This Week |
| GROUP-005 | Group Persistence | Refresh page         | Same grouping maintained      |

---

# Bookmarks

| ID       | Scenario                   | Steps                           | Expected Result           |
| -------- | -------------------------- | ------------------------------- | ------------------------- |
| BOOK-001 | Save Job                   | Click bookmark icon             | Bookmark created          |
| BOOK-002 | Save State                 | Bookmark saved                  | Icon becomes filled       |
| BOOK-003 | Refresh Feed               | Refresh page                    | Bookmark remains filled   |
| BOOK-004 | Remove Bookmark Feed       | Click filled bookmark           | Bookmark removed          |
| BOOK-005 | Remove Bookmark Saved Page | Remove bookmark from Saved page | Bookmark removed          |
| BOOK-006 | Saved Page Rendering       | Open Saved page                 | Saved jobs displayed      |
| BOOK-007 | Empty Saved Page           | No bookmarks exist              | Empty state displayed     |
| BOOK-008 | Bookmark Persistence       | Refresh page                    | Saved jobs remain visible |

---

# Saved Jobs Page

| ID       | Scenario              | Steps                    | Expected Result                    |
| -------- | --------------------- | ------------------------ | ---------------------------------- |
| SAVE-001 | Requirement Grouping  | Open Saved page          | Jobs grouped by requirement        |
| SAVE-002 | Date Grouping         | Open Saved page          | Today/Yesterday grouping displayed |
| SAVE-003 | Multiple Requirements | Multiple bookmarked jobs | Separate sections shown            |
| SAVE-004 | Bookmark Removal      | Remove saved job         | Section updates correctly          |

---

# Profile

| ID       | Scenario          | Steps        | Expected Result             |
| -------- | ----------------- | ------------ | --------------------------- |
| PROF-001 | Profile Render    | Open Profile | User details displayed      |
| PROF-002 | User Name         | Open Profile | Name displayed              |
| PROF-003 | User Email        | Open Profile | Email displayed             |
| PROF-004 | Requirement Count | Open Profile | Requirement count displayed |
| PROF-005 | Saved Count       | Open Profile | Saved jobs count displayed  |
| PROF-006 | Logout            | Click Logout | User logged out             |

---

# Navigation

| ID      | Scenario           | Steps            | Expected Result           |
| ------- | ------------------ | ---------------- | ------------------------- |
| NAV-001 | Feed Navigation    | Click Feed       | Feed page opens           |
| NAV-002 | Saved Navigation   | Click Saved      | Saved page opens          |
| NAV-003 | Profile Navigation | Click Profile    | Profile page opens        |
| NAV-004 | Mobile Navigation  | Mobile viewport  | Bottom navigation visible |
| NAV-005 | Desktop Navigation | Desktop viewport | Header navigation visible |

---

# Error Handling

| ID      | Scenario             | Steps               | Expected Result        |
| ------- | -------------------- | ------------------- | ---------------------- |
| ERR-001 | Route Error          | Trigger React error | Error page shown       |
| ERR-002 | Return Home          | Click Return Home   | Redirected to Feed     |
| ERR-003 | API Failure          | API returns error   | UI remains stable      |
| ERR-004 | Unauthorized Request | Token invalid       | User logged out safely |

---

# Deployment Smoke Tests

| ID        | Scenario           | Steps               | Expected Result    |
| --------- | ------------------ | ------------------- | ------------------ |
| SMOKE-001 | Fresh Login        | Login on production | Success            |
| SMOKE-002 | Create Requirement | Create requirement  | Success            |
| SMOKE-003 | Scrape Complete    | Wait for scrape     | Jobs appear        |
| SMOKE-004 | Save Bookmark      | Save job            | Bookmark appears   |
| SMOKE-005 | Remove Bookmark    | Remove bookmark     | Bookmark removed   |
| SMOKE-006 | Open Profile       | Open profile        | Success            |
| SMOKE-007 | Refresh App        | Refresh browser     | State restored     |
| SMOKE-008 | Logout             | Logout              | Landing page shown |

---

Total Critical Test Cases: ~55
Recommended Automated Coverage Target: 80%+

This document is strong enough to drive:

- Vitest test implementation
- Manual QA testing
- Future regression testing before deployment
- CI/CD quality gates

The highest-priority automated tests are:

```plaintext
AUTH-003
REQ-001
REQ-002
REQ-003
SCRAPE-005
BOOK-001
BOOK-003
BOOK-005
SAVE-001
PROF-006
ERR-001
```

Those 11 tests alone would have caught nearly every major bug you've fixed during the MVP build. 🚀
