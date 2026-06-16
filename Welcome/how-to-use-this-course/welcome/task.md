# Welcome

## Why this course exists

SAP backend development has a reputation for being a walled garden. To even start, the
story goes, you need an S/4HANA system, a BTP account, a fistful of paid services, and a
tool that hides most of the work behind a wizard. A lot of developers never get past that
front gate, and the ones who do often build services they cannot fully explain, because a
generator wired most of it for them.

The SAP Cloud Application Programming Model — CAP — is the part of the SAP world that
quietly breaks that spell. It is a real, open framework. You can run it on your own laptop,
with nothing but Node.js, and watch it turn a few lines of a data model into a working
OData service with a database behind it. No S/4HANA. No paid subscription. Just you and the
framework.

This course is built on that fact. We are going to learn CAP by building one real business
application from the first entity to a deployable multitenant service, and you are going to
write it yourself, one small step at a time. Not read it. Not paste it. Write it, and
understand every line: what it is, why it exists, and what would break without it.

Here is the part worth being honest about. Tools can scaffold a CAP project and AI can
finish your line of code, and both are genuinely useful. But neither can tell you whether
what came out is right. The developer who will matter is not the one who prompts the
fastest; it is the one who understands the framework deeply enough to know what to ask for
and to recognise a wrong answer when it arrives. So we do this the deliberate way. By the
end, CAP will not be magic to you. It will be yours.

We also build outside Business Application Studio and VS Code, in a JetBrains IDE, on
purpose. Not out of any quarrel with those tools — they are excellent — but because doing a
few of the steps by hand is how you come to understand what the automation was doing for you
all along. You cannot value a convenience you never knew you had.

Welcome. Let us build something real.

*- [add your name here]*

---

## What you will build

AssetCare: an asset and maintenance management application, the kind of system a plant or
facilities team uses to keep equipment running. You will model equipment, locations,
manufacturers and spare parts; raise and process work orders; record inspections with
photos; track warranties over time; and grow it all the way to an event-driven, multitenant
SaaS that you could deploy to SAP BTP.

It is a fresh domain, not one of the usual SAP samples, chosen because it naturally exercises
nearly every feature CAP has — so you finish having seen even the rare corners.

## Who this course is for

You should already be comfortable with JavaScript (and, for the TypeScript track,
TypeScript). This course does not teach those languages; it teaches CAP. You will also need
Node.js (version 20 or newer) and a JetBrains IDE with the EduTools plugin, which you
already have if you can read this.

## You don't need a paid IDE

EduTools runs only on JetBrains IDEs, not VS Code. A JavaScript/TypeScript course needs
WebStorm (or PhpStorm, or IntelliJ IDEA Ultimate) — the free IntelliJ IDEA Community Edition
does not handle JavaScript courses. The good news is the IDE you need is free:

- WebStorm is free for non-commercial use — learning, personal projects and open source all
  count, so this course costs you nothing.
- Students and teachers get the whole JetBrains toolbox, WebStorm included, free with an
  educational licence.

Licensing terms change, so check the current conditions at jetbrains.com before you lean on
them.

## One-time setup (do this first)

The course uses a checker that gives you instant feedback when you press Check. It needs to
be installed once. Open a terminal at the project root and run:

```
npm install
```

That installs the checker and the CAP tooling (`@sap/cds`, the `cds` CLI, and a local SQLite
database) you will use to run your app. You only do this once. The later lessons that use
PostgreSQL, messaging or attachments will tell you when (and how) to start a local Docker
container for them — nothing is needed up front.

## How the course is organised

This is a guided project. It is not a pile of unrelated exercises — it is one application
that grows as you go. Each lesson builds on the one before, and within a lesson your code
carries forward from each step (a stage) to the next. You are always working on the same,
steadily improving app.

There are two parallel tracks:

- JavaScript — start here. It covers the whole course.
- TypeScript — the same journey again in TypeScript, with a short setup prologue, once you
  have finished or if you prefer to work in TypeScript.

## How to do a task

1. Read the description first. Every task explains what you are about to build and, more
   importantly, why — what problem it solves and how a good engineer thinks about it. The
   understanding is the point; the typing is the easy part.
2. Fill in the blanks. The code file has highlighted blanks for the parts you write. Click
   into each one and type your answer.
3. Press Check. The checker runs and tells you, in plain language, what is correct and what
   still needs work.
4. Stuck? Use Peek author's solution to reveal a correct answer, or Reset Task to start the
   file over. There is no penalty for looking — but try first, because you learn far more
   from the attempt.

## How marking works — you have real design freedom

This course is run like a country with fair laws: strict about what is genuinely right or
wrong, free about everything else.

- If you enter something invalid — a malformed CDS model, a version that does not exist, an
  enum value outside the allowed set, a setting that breaks the service — the check fails.
  That is a real mistake, and catching it is part of learning.
- If you make a valid design choice that simply differs from the author's — your own entity
  label, a different message text, an extra field you wanted — the check passes. There is
  often more than one correct answer.

So you and another learner can hand in different-looking apps and both be right. The goal is
for you to learn to make sound decisions and design the app your own way, not to memorise one
official version.

## Seeing your app run

The Check only inspects your code. To actually run the service, start CAP from the folder of
the stage you are working on:

```
npx cds watch
```

Then open the URL it prints (by default http://localhost:4004). Some early stages
intentionally show very little — the description tells you what to expect and why.

## Getting the most out of this

In a world where tools can generate code for you, the valuable skill is no longer typing —
it is understanding. Throughout this course, keep asking yourself:

- What is this file or setting for?
- What would break if it were missing or wrong?
- Why is this the recommended way, and what are the alternatives?

If you can answer those, you are becoming a designer of software, not just a writer of it.
That is exactly what this course is built to develop.

When you are ready, open the JavaScript track and start the first lesson, Hello CAP. Good
luck.
