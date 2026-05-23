export const buildRelevancePrompt = ({ job, requirements }) => {
  return [
    // =========================
    // SYSTEM
    // =========================

    {
      role: "system",

      content: `
You are an expert job relevance classifier.

Your task is to determine whether a job posting is relevant to a user's requested role and preferences.

STRICT RULES:

1. Consider semantic similarity of roles
2. Consider seniority level
3. Consider internship preference
4. Consider realistic suitability
5. Only roles with similar responsibilities and career tracks should count as relevant.
5.1 Being in the same industry alone does NOT make a role relevant.
6. Senior roles are NOT relevant for freshers

Think step-by-step internally before deciding.

You must ONLY output:

true

or

false

No explanations.
No punctuation.
No extra text.
`,
    },

    // =========================
    // USER
    // =========================

    {
      role: "user",

      content: `
# USER REQUIREMENTS

Requested Role:
${requirements.job_title}

Location:
${requirements.location}

Fresher:
${requirements.is_fresher ? "yes" : "no"}

Internship:
${requirements.is_intern ? "yes" : "no"}

# JOB DETAILS

Title:
${job.job_title}

Company:
${job.job_provider}

Location:
${job.job_location || "unknown"}

# RELEVANCE RULES

Relevant jobs:
- closely matching roles
- adjacent specializations
- suitable experience level

Not relevant:
- unrelated domains
- clearly senior roles for freshers
- mismatched internships

# EXAMPLES

Requested:
Full Stack Developer Intern

Relevant:
- Frontend Developer Intern
- Backend Developer Intern
- React Developer Intern
- Full Stack Engineer Intern

Not Relevant:
- QA Intern
- Content Writer Intern
- Logistics Intern
- HR Intern
- Technology Solutions Intern

Requested:
Business Analyst

Relevant:
- Product Analyst
- Strategy Analyst
- Data Analyst

Not Relevant:
- HR Recruiter
- Sales Executive
- Graphic Designer

Requested:
Frontend Developer Intern in Hyderabad

Relevant:
- React Developer Intern (Hyderabad)
- Frontend Engineer Intern (Hyderabad)

Not Relevant:
- Frontend Developer Intern (Mumbai)
- Backend Intern (Bengaluru)
- Logistics Intern (Hyderabad)
- Content Writer Intern (Hyderabad)


# TASK

Determine whether the job is relevant.

Reply ONLY:
true

or

false
`,
    },
  ];
};
