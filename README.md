# SAP CAP — Guided Project (AssetCare)

A JetBrains EduTools guided project that teaches the SAP Cloud Application Programming
Model (CAP) from the very basics to its most advanced (and rarely used) features by
building one real SAP-style business application: AssetCare, an asset and maintenance
management app (Equipment, Work Orders, Technicians, Spare Parts, Inspections,
Maintenance Plans) on the Node.js stack.

## How this course is organised

This is a guided project, so each lesson is an EduTools framework lesson: your code
propagates from one stage to the next, and each lesson continues the app where the
previous one left off. You are always working on the same growing application.

Two parallel tracks are provided as top-level sections:

| Folder | Track | Notes |
| --- | --- | --- |
| [`javascript/`](javascript) | JavaScript | 31 lessons, the full curriculum |
| [`typescript/`](typescript) | TypeScript | Same 31 lessons plus a `00-typescript-setup` prologue |

See [CURRICULUM.md](CURRICULUM.md) for the full lesson-by-lesson roadmap.

## Prerequisites

- Solid JavaScript (and TypeScript for the TS track). These languages are not taught here.
- Node.js 20 or newer (22/24 LTS recommended) and npm.
- A JetBrains IDE with the EduTools plugin (several are free — see below).
- Optional, only for the later lessons: Docker (for the local PostgreSQL, MinIO, Keycloak
  and Mailpit stand-ins). The early lessons need nothing but Node.

## You don't need a paid IDE

EduTools runs only on JetBrains IDEs (not VS Code), and a JavaScript/TypeScript course
needs WebStorm (or PhpStorm, or IntelliJ IDEA Ultimate) — IntelliJ IDEA Community Edition
does not support JavaScript courses. The IDE you need is free:

- WebStorm is free for non-commercial use — learning, personal projects and open source
  all qualify, so taking this course costs nothing.
- Students and teachers get the full JetBrains toolbox (WebStorm included) free with an
  educational licence.

Licensing terms change over time, so confirm the current conditions at
[jetbrains.com](https://www.jetbrains.com/).

## Backend — free and open source only

No S/4HANA or paid SAP BTP satellite systems are required. The course uses only tooling a
trainee can run locally:

1. CAP with SQLite for the fast inner loop (zero setup — `cds watch` runs in memory).
2. PostgreSQL (via Docker) as the realistic deploy and schema-migration target.
3. Free local stand-ins for the paid SAP services a full app would otherwise need:
   mocked auth and Keycloak (instead of XSUAA/IAS), file-based messaging and Redis
   (instead of Event Mesh), `@cap-js/attachments` and MinIO (instead of Document
   Management / Object Store), Mailpit for email, and a local mock OData service (instead
   of an S/4HANA remote backend).

## Status

Skeleton. The section/lesson structure and the roadmap are in place; each lesson currently
holds a single overview stage. The hands-on stages are populated lesson by lesson.

## References

- SAP CAP (capire) — https://cap.cloud.sap/
- SAPUI5 / OpenUI5 (for the Fiori UI lessons) — https://ui5.sap.com/
- UI5 tutorials — https://github.com/UI5/tutorials
- UI5 org repositories — https://github.com/UI5
