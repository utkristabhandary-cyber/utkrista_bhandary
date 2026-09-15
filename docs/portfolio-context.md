# PORTFOLIO CONTEXT & CANONICAL SOURCE OF TRUTH

> **CONFIDENTIALITY & PURPOSE**:
> This document is the internal canonical source of truth for the personal portfolio of **Utkrista Bhandary**.
> It is an internal reference designed for AI coding agents and human contributors to prevent:
> - Hallucinated personal information
> - Inconsistent biography and career chronology
> - Contradictory project descriptions or inflated metrics
> - Invented experiences, technologies, or job titles
> - Outdated or duplicated content
> - Accidental drift from approved professional positioning
>
> **MANDATORY RULE FOR AI AGENTS**: Read this document in full before proposing, drafting, modifying, or refactoring any copy, biographical summaries, project representations, or skill lists.

---

## 1. Identity

- **Full Legal Name**: UTKRISTA BHANDARY
- **Display Name**: Utkrista Bhandary (or UTKRISTA BHANDARY in display typography)
- **Base Location**: Thimi, Bhaktapur, Nepal
- **Geographic Coordinates**: 27.6766° N, 85.3857° E
- **Current Academic Status**: First Year BSc IT Student
- **Primary Education**: Bachelor of Science in Information Technology (BSc IT)
- **Degree Granting & Affiliated Institutions**: Techspire College / Asia Pacific University (APU)
- **Expected Year of Completion**: 2026
- **Primary Contact Email**: `utkristabhandary@gmail.com`
- **Telephone (Direct)**: `+977-9860905119`
- **Verified Links**:
  - GitHub: https://github.com/utkristabhandary-cyber
  - LinkedIn: https://www.linkedin.com/in/utkrista-bhandary-b3235733a

*Privacy Directive*: Do not expose private contact information unnecessarily throughout the website. Restrict direct email and phone contact to designated contact channels or verified communication touchpoints.

---

## 2. Professional Positioning

### Primary Identity
**AI-Assisted Software Developer**

### Supporting Technical Disciplines
- Full-Stack Development
- Backend Development & REST APIs
- Software Testing & Quality Assurance
- Data Analysis & Visualization
- AI-Assisted Development & Prompt Engineering
- UI/UX & Design Thinking
- Development Automation Workflows
- Technical Documentation

### Approved Canonical Biography / Professional Summary
> "Early-career software developer building practical software, data and technology solutions through AI-assisted research, development, testing and iteration."

### Prohibited Positioning & Tone Restrictions
Do **NOT** position Utkrista as:
- Senior Developer / Lead Architect
- Experienced Software Architect
- Professional / Senior AI Engineer
- Professional Data Scientist
- Senior / Career QA Engineer
- "Coding Ninja", "10x Developer", "Rockstar Engineer", or "Technology Visionary"

*Reasoning*: Utkrista is an ambitious, disciplined first-year BSc IT student with genuine engineering strengths in software construction, automated testing, and AI-accelerated workflows. Honest, evidence-grounded competence carries far greater credibility than inflated titles.

---

## 3. Career Direction

### Target Opportunities
- Software Development Internships
- Entry-level Software Engineering Roles
- Technology-focused Internships & Fellowships
- Software Testing / QA Engineering Internships & Roles
- Data Analytics / Data Engineering Entry-level Opportunities
- AI / Automation Integration Opportunities

The portfolio balances full-stack engineering, testing discipline, data analysis, and UI/UX while anchoring **SOFTWARE / TECHNOLOGY DEVELOPMENT** as the primary identity.

---

## 4. Education

- **Degree**: Bachelor of Science in Information Technology (BSc IT)
- **Institution**: Techspire College
- **University Affiliation**: Asia Pacific University (APU)
- **Period**: 2026 — Expected
- **Current Level**: First Year
- **Core Coursework**:
  - Programming & Object-Oriented Principles (Python, Architecture)
  - Database Systems (Relational Design, SQL, Normalization)
  - Web Technologies (Frontend, Responsive Design, REST APIs)
  - Data Structures & Algorithms

---

## 5. Project Source of Truth

Every project featured in this portfolio is subject to rigorous verification. Below are the canonical project records.

---

## 6. Project 01: CitiConnect (Flagship)

- **Name**: CitiConnect
- **Category**: Civic Technology / Full-Stack Web Application
- **Status**: Independent Project / Development Project (Active)
- **Date**: 2026
- **Purpose**: A civic service platform designed around Kathmandu municipal service workflows, connecting citizens with municipal officers for transparent complaint submission, operational dispatch, and service tracking.
- **Problem Addressed**: Citizens in Kathmandu lack a transparent, traceable mechanism to report civic infrastructure defects (broken water lines, potholes, uncollected waste, streetlight outages). Municipal ward officers are simultaneously overwhelmed by duplicate submissions, imprecise coordinates, and lack of issue grouping for operational field crews.
- **Solution**: A role-based civic portal with OpenStreetMap pin selection, photo attachments, real-time ticket progression, public ward transparency metrics, and an AI-assisted triage pipeline with mandatory officer confirmation.
- **Core Features**:
  - Citizen complaint submission with GPS coordinate picker & photo evidence
  - Interactive complaint tracking timeline with status checkpoints
  - Dedicated role workflows: Citizen, Ward Officer, System Administrator
  - Ward & department assignment rules
  - Operational issue grouping (clustering related complaints)
  - AI-assisted categorization & urgency analysis (Groq Llama 3 API adapter)
  - Deterministic offline mock AI fallback for zero-downtime reliability
  - Automated SMS/Email-ready status progression triggers
  - Public ward transparency dashboard displaying aggregated resolution metrics
  - Role-based authorization matrix protecting citizen privacy
- **Technical Stack**:
  - Backend: Python, Django, Django REST Framework, Token Authentication
  - Frontend: React 19, TypeScript, Tailwind CSS, Vite
  - Mapping: Leaflet, OpenStreetMap
  - Database: PostgreSQL with spatial coordinate indexing
  - AI Integration: Groq Llama 3 API + local deterministic fallback engine
- **Engineering Concepts Demonstrated**:
  - Strict role-based authorization (IsCitizen, IsOfficer, IsWardAdmin)
  - Coordinate validation bounded to municipal geographic limits
  - Automated backend testing (unit, API contract, regression)
  - Notification deduplication logic
  - Clean separation of concern: *Complaint* vs *Issue*
- **CRITICAL DOMAIN RULE**:
  `Complaint != Issue`
  - A **Complaint** represents an individual citizen submission (citizen identity, timestamp, photo, localized coordinates).
  - An **Issue** represents an internal municipal operational unit that clusters multiple related complaints into one actionable dispatch order. Resolving the single issue updates all related complaints automatically.
- **RESTRICTIONS ON CLAIMS (STRICT)**:
  Do **NOT** claim:
  - Official adoption or partnership with Kathmandu Metropolitan City (KMC)
  - Official government contract, endorsement, or deployment
  - Real active citizen user base numbers
  - Commercial revenue or municipal procurement
- **Approved Canonical Positioning**:
  *"Independent civic-tech project designed around Kathmandu municipal service workflows."*

---

## 7. Project 02: Attendance Management System (AAMS)

- **Name**: Attendance Management System
- **Category**: Full-Stack Academic Management System
- **Status**: 2026 — Present
- **Purpose**: A role-based academic platform designed around real-world institutional scheduling rules for administrators, faculty, and students.
- **Core Domain Entities**:
  - Administrators, Teachers, Students
  - Semesters, Sections, Subjects, Timetables
  - Gazetted Holidays, Attendance Records, Defaulter Reports
- **Technical Stack**:
  - Backend: Python, Django, Django REST Framework
  - Database: PostgreSQL
  - Testing: Django Test Suites, Postman API collections
- **Engineering Invariants & Business Rules**:
  - Zero attendance spoofing: strict API constraints preventing retroactive attendance creation.
  - Gazetted holiday validation: service layer throws `ValidationError` if attendance is recorded on marked holidays.
  - Section & semester relationship integrity: faculty can only record sessions for assigned subject-section combinations.
  - Automated attendance percentage calculation and defaulter threshold alerts.
- **Role of AI in Development**:
  - Architecture exploration and schema normalization options
  - Rapid boilerplate generation for serializers and viewsets
  - Researching edge-case boundary validations
  - Documenting API contracts
- **RESTRICTIONS ON CLAIMS (STRICT)**:
  Do **NOT** claim:
  - Production institutional deployment
  - Official adoption by Techspire College / APU
  - Specific active student or faculty counts
  - Commercial revenue or SaaS subscription metrics

---

## 8. Project 03: Candidate Screening Platform

- **Name**: Candidate Screening Platform
- **Context**: Relay Hack x Acquire (Competitive Hackathon)
- **Category**: Hackathon Rapid Prototype
- **Date**: 2026
- **Purpose**: Prototyped under hackathon time constraints to streamline applicant evaluation and recruitment workflows with structured rubrics and AI assistance.
- **Skills Demonstrated**:
  - Rapid MVP prototyping under tight deadlines
  - Collaborative teamwork and Git branching
  - User-centered recruiter workflow design
  - AI-assisted feature acceleration
- **RESTRICTIONS ON CLAIMS**:
  Do **NOT** invent user numbers, accuracy metrics, placement statistics, or unverified award placements.

---

## 9. Project 04: Data Analysis Project

- **Name**: Data Analysis Project
- **Category**: Data Analysis & Visualization
- **Date**: 2026
- **Technologies**: Python, Pandas, NumPy, Seaborn, Matplotlib, Jupyter Notebooks
- **Description**: Exploratory data analysis uncovering statistical distributions, missing value patterns, and correlation matrices to generate actionable domain summaries.
- **Key Engineering Insight**: Data preprocessing, scheme normalization, and outlier detection form 80% of reliable analytical outcomes; clean inputs prevent misleading visual conclusions.
- **RESTRICTIONS ON CLAIMS**:
  Do **NOT** claim fictional enterprise clients, commercial ROI figures, or unverified dataset scales.

---

## 10. AI-Assisted Development Model

Utkrista practices disciplined, transparent AI-assisted engineering. Generative AI is embraced as a development multiplier, never as an unreviewed crutch.

### Approved Canonical Description
> "AI-assisted development is part of my workflow. I use AI for research, architecture exploration, implementation, debugging, documentation and rapid prototyping while reviewing, testing and validating the resulting work."

### The 9-Stage Development Pipeline
1. **UNDERSTAND**: Analyze problem domain, extract invariants, formulate constraints.
2. **RESEARCH**: Investigate ecosystem patterns, standards, and trade-offs.
3. **EXPLORE**: Evaluate schema alternatives, API schemas, and architecture blueprints.
4. **AI-ASSISTED IMPLEMENTATION**: Accelerate boilerplate, regex, serializer logic, and interface shells.
5. **REVIEW**: Manually audit code for security leaks, edge cases, and architectural alignment.
6. **TEST**: Author automated test assertions (unit, permission, contract, boundary).
7. **DEBUG**: Systematically isolate tracebacks, query bottlenecks, and unexpected states.
8. **VALIDATE**: Verify end-to-end user workflows against real-world scenarios.
9. **DOCUMENT**: Record architectural decisions, API contracts, and maintenance guidance.

*Core Philosophy*: Human engineering responsibility remains irreplaceable. AI accelerates output; humans maintain accountability, architectural judgment, and verification.

---

## 11. Testing & QA Capabilities

Software testing is presented as an integral software development strength, reflecting Utkrista's engineering discipline.

### Verified Testing Capabilities
- **Role-Based Permission Auditing**: Validating that unauthorized users cannot invoke protected state transitions or view restricted data.
- **Domain Business-Rule Validation**: Enforcing service-layer rules (e.g., holiday exclusions, valid state machines).
- **API Contract & Schema Validation**: Testing endpoint response codes, error schemas, and payload boundary conditions (e.g., coordinate bounds).
- **Regression Testing & Fault Tolerance**: Validating that external failures (e.g., AI timeout) trigger deterministic fallback behavior.
- **Manual Verification**: Systematic regression checking of interactive UI states and error banners.

*Guideline*: Testing is an engineering discipline and mindset. Do not claim formal corporate employment as a QA Engineer.

---

## 12. Technical Skills

Skills are cataloged strictly by verified capability. **Do NOT assign arbitrary percentage proficiency bars** (e.g., "Python 92%").

### 1. Programming & Development
- Python
- Django & Django REST Framework
- Flask
- HTML5 & CSS3
- Tailwind CSS
- REST APIs
- Git & GitHub

### 2. Data & Analytics
- Pandas
- NumPy
- Seaborn & Matplotlib
- Data Analysis & Cleaning
- Data Visualization
- Power BI

### 3. AI & Automation
- AI-Assisted Development
- Prompt Engineering
- AI Research & Triage Workflows
- Rapid Prototyping
- Automation Workflows

### 4. Databases & Design
- PostgreSQL
- Relational Schema Design
- Figma
- UI/UX Design & Wireframing
- Canva & Graphic Design

### 5. Professional & Soft Skills
- Problem Solving
- Design Thinking
- Technical Documentation
- Team Collaboration
- Leadership
- Public Speaking & Event Planning

---

## 13. Leadership & Extracurricular Experience

All entries reflect genuine student leadership and volunteer commitments. Do **NOT** represent these as corporate commercial employment.

### 1. Acting Vice President — Techspire IT Club
- **Period**: 2026 — Present
- **Type**: Student Leadership / Club
- **Responsibilities**:
  - Support strategic planning and execution of technology workshops, coding challenges, and student hackathons.
  - Coordinate across technical, design, and logistics teams to foster an inclusive engineering culture.

### 2. Art, Design & Tech Team — Techspire IT Club
- **Period**: 2026 — Present
- **Type**: Design & Creative Contributor
- **Responsibilities**:
  - Produce visual identity assets, promotional material, and technical event branding.
  - Ensure clear visual communication across student-facing tech initiatives.

### 3. Graphics Designer & Event Planning — Hult Prize, Techspire College
- **Period**: 2026
- **Type**: Event Organization & Volunteer
- **Responsibilities**:
  - Designed promotional assets, social media branding, and presentation materials.
  - Supported venue logistics, participant coordination, and event execution for the social entrepreneurship event.

---

## 14. Certifications & Training

- **Data Science Certification** — Techspire College
- **Power BI Certification** — Industry Training
- **Design Thinking Certification** — Techspire College
- **Prompt Engineering Workshop** — Technical Workshop
- **UI/UX Design Training** — Professional Workshop
- **Web Development Training** — Technical Workshop

*Anti-Hallucination Directive*: Do **NOT** invent certificate IDs, issue dates, scores, or external verification URLs that have not been provided.

---

## 15. Portfolio Content Rules & Priority

When ordering or structuring content on the website:
1. **Primary Project**: CitiConnect
2. **Secondary Core Project**: Attendance Management System
3. **AI-Assisted Workflow**: The 9-stage engineering loop
4. **Testing Philosophy**: Test runner / automated assertions
5. **Supporting Projects**: Candidate Screening Platform & Data Analysis
6. **Technical Skills**: Grouped, typography-driven matrix
7. **Leadership & Experience**: Club & community contribution
8. **Education**: BSc IT (Techspire / APU)
9. **Certifications**: Verified training programs
10. **Contact**: Direct communication touchpoints

---

## 16. Writing Style & Tone

The portfolio voice is:
- **Confident & Technical**: Explains systems through domain invariants, data models, and verification.
- **Concise & Direct**: Eliminates generic filler, corporate jargon, and self-congratulatory buzzwords.
- **Honest & Grounded**: Proudly early-career, highlighting curiosity, craft, and systematic discipline.
- **Banned Words**: "Coding ninja", "10x engineer", "visionary", "disruptor", "rockstar", "world-class", "industry-leading".

---

## 17. Claims & Evidence System

All portfolio claims must adhere to one of three confidence tiers:
- **VERIFIED**: Explicitly corroborated by verified documentation, source code, or personal submission. May be featured as fact.
- **INFERRED**: Logical deduction based on context (e.g., student leadership implies organizational ability). Must be phrased modestly.
- **UNVERIFIED**: Any claim lacking tangible proof. **MUST BE OMITTED**.

*Golden Rule*: When in doubt, **OMIT THE CLAIM**. Never allow an AI agent to extrapolate or synthesize unverified credentials.

---

## 18. Content Change Protocol

Future AI agents and contributors must follow this procedure before altering canonical data:
1. Identify current canonical value in `/docs/portfolio-context.md`.
2. Evaluate proposed change against verified evidence.
3. If verified, update `/docs/portfolio-context.md`.
4. Append an entry to `/docs/portfolio-context-changelog.md`.
5. Update corresponding components and data layers.

---

## 19. Project Change Protocol

When projects evolve:
- Update status, features, and architecture only as real development occurs.
- Never retroactively fabricate historical metrics or deployment scale.
- Maintain transparent records of what has been built versus planned roadmap items.

---

## 20. Current Portfolio State

- **Stage**: Full-Stack Interactive Prototype with Owner Content Management System (CMS)
- **Aesthetic**: Editorial developer portfolio with high-contrast dark palette (`#0c0d0f`), bold typography (Syne + Plus Jakarta Sans + JetBrains Mono), and generous negative space.
- **Key Modules**:
  - Public Editorial Experience (Hero, Selected Work, Process, AI Philosophy, Testing QA Console, About, Skills, Leadership, Contact)
  - Owner-Only CMS (`/admin` / `PORTFOLIO CONTROL`) secured for `utkristabhandary@gmail.com`
  - Centralized typed Content Repository with prototype persistence and production backend boundaries
  - CV version management and public download toggle

---

## 21. Instructions for Future AI Agents

1. Always read `/docs/portfolio-context.md` before generating copy, revising projects, or refactoring the CMS.
2. Verify all additions against the verified facts recorded in this document.
3. Do not invent metrics, production partnerships, user counts, or external links.
4. Protect the owner-only CMS boundaries: maintain clear separation between client UX prototype checks and future server-side token verification.

---

## 22. Change Log Reference

See `/docs/portfolio-context-changelog.md` for the immutable history of canonical updates.

---

## 23. AI-Readable Context Summary

```yaml
PERSON: Utkrista Bhandary
PRIMARY_IDENTITY: AI-Assisted Software Developer
CAREER_STAGE: Early Career / First Year BSc IT Student
INSTITUTION: Techspire College / Asia Pacific University (APU)
LOCATION: Thimi, Bhaktapur, Nepal (27.6766° N, 85.3857° E)
EMAIL: utkristabhandary@gmail.com
PHONE: "+977-9860905119"
PRIMARY_PROJECT: CitiConnect (Civic Technology / Full-Stack Web App)
SECONDARY_PROJECT: Attendance Management System (Academic Management Platform)
ADDITIONAL_PROJECTS: Candidate Screening Platform, Data Analysis Project
CORE_DEVELOPMENT_STACK: Python, Django, Django REST Framework, PostgreSQL, React, TypeScript, Tailwind
SUPPORTING_SKILLS: Software Testing, Data Analysis, AI Workflows, UI/UX, Design Thinking
ENGINEERING_STRENGTH: Building + Testing + Debugging + Validation
AI_PHILOSOPHY: AI accelerates development; human reviews and validates the result.
DOMAIN_RULE_CITICONNECT: Complaint != Issue
TARGET_OPPORTUNITIES: Software development internships, entry-level software roles, QA/testing, data analysis
CLAIMS_POLICY: Strict zero-hallucination policy; omit unverified metrics or enterprise adoption claims
```

---

## 24. Verification Affirmation

- [x] No unsupported claims introduced.
- [x] Zero fabricated corporate jobs, enterprise clients, or government contracts.
- [x] Internally consistent educational and project chronology.
- [x] Clear prioritization: CitiConnect (#1), Attendance Management System (#2).
- [x] Testing accurately framed as an engineering strength rather than false professional QA title.
- [x] AI-assisted development explicitly framed around human accountability and systematic verification.
