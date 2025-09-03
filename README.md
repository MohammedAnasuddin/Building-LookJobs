# Centralized and Intelligent Job Aggregation System

## Introduction

Job searching in the digital age remains fragmented and inefficient. With opportunities scattered across multiple portals such as LinkedIn, Indeed, and Glassdoor, job seekers face significant challenges:

- Repeatedly visiting different platforms.

- Applying filters multiple times.

- Tracking postings manually, many of which expire or update without notice.

This project proposes a **Centralized and Intelligent Job Aggregation System** that automates the extraction of job listings, organizes them into a **structured database**, and presents them on a **unified platform**. By combining **web scraping, automation, and a modern user interface**, the system reduces manual effort, improves efficiency, and ensures timely access to opportunities.

---

## Problem vs. Solution

### The Problem

- **Fragmented job search** across independent portals.

- **Time-consuming manual effort** to apply filters and track listings.

- **Outdated postings** leading to wasted applications.

- **Inconsistent formats** that make comparison difficult.

### The Solution

- A **single dashboard** that aggregates listings from multiple job portals.

- **Automated web scraping** with headless browser automation for periodic updates.

- **Structured data storage** in PostgreSQL for reliable filtering and retrieval.

- A **React-based interface** for intuitive job search and exploration.

- **CRON-based automation** for continuous background updates.

- **Ethical scraping practices**, ensuring compliance with robots.txt and avoiding restricted endpoints.

---

## Features

- Centralized job listings in one platform.

- Automated, periodic updates from multiple sources.

- Intelligent filtering by **role, location, remote work, fresher, or internship**.

- Interactive, responsive user interface.

- Scalable backend for handling large datasets.

---

## Technology Stack

- **Frontend**: React, Mantine UI

- **Backend**: Node.js, Express.js

- **Database**: PostgreSQL

- **Web Scraping**: Puppeteer with Stealth Plugin

- **Authentication**: Auth0

- **Task Scheduling**: CRON jobs

---

## Usage

1. **Register or log in** securely.

2. **Submit job preferences** (title, location, remote/fresher/internship).

3. The system **scrapes job portals** and stores listings in the database.

4. Results are displayed on a **dashboard** with job cards.

5. **CRON jobs** keep listings updated automatically.

---

## System Flow

The following diagram illustrates the overall workflow of the project:

[LookJobs-Flow](Working-of-LookJobs.svg)  
![LookJobs Flow](Working-of-LookJobs.svg)

---

## Future Enhancements

- **AI-powered job recommendations** tailored to user behavior.

- **Natural Language Processing (NLP)** for advanced search capabilities.

- **Employer response tracking** to increase transparency.

- **Mobile application** for broader accessibility.

- **Direct API integrations** with job portals for improved reliability.
