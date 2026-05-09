## What is `index: true` in the route configuration?
The index: true property defines the Default Child Route.

- The Problem: Your AppLayout has an <Outlet /> (which is a placeholder). When you go to the path /, the router knows to show AppLayout, but it doesn't know what to put inside the <Outlet /> yet.
- The Solution: By setting index: true on the HomePage, you are telling React Router: "When the URL matches exactly the parent's path (/), render this component inside the parent's <Outlet />."


## Dedicated folders for Each feature
As projects grow, how you organize files becomes just as important as the code itself.



## type imports
THe error is:Uncaught SyntaxError: The requested module 'http://localhost:5173/src/features/jobs/types/job.ts' doesn't provide an export named: 'Job'



This error occurs because of a mismatch between how TypeScript types are handled at development time and how the browser expects modules to work at runtime.

Why this is happening
In your job.ts file, you are using export type Job. In TypeScript, a type is a compile-time construct that doesn't exist in JavaScript. When Vite serves this file to the browser, it transpiles it. Because there are no runtime values (like variables or functions) being exported, the resulting JavaScript file often ends up being empty or only containing export {}.

Meanwhile, in mock-jobs.ts, you are using a standard import: import { Job } from "../types/job". Because you aren't using the type keyword in the import statement, the transpiler might think you are trying to import a runtime value. When the browser tries to find a variable named Job inside the module exports and doesn't find it, it throws the SyntaxError.

The Solution
The most professional and robust fix in a modern Vite/React setup is to use Type-Only Imports. This tells the transpiler (and the browser) that Job is strictly a type and should be completely ignored at runtime.

Additionally, I recommend changing type to interface for your data models. In TypeScript, interface is generally preferred for defining the structure of objects/entities as it provides better compiler performance and clearer error messages.

Here are the necessary changes:

job.ts
export interface Job {
  id: string
  title: string
  company: string


mock-jobs.ts
import type { Job } from "../types/job"



## Utilizing Hooks
Create:

src/features/jobs/hooks/use-jobs-feed.ts

This hook becomes:

the feed orchestrator

🎯 Why This Matters

Instead of:

filtering inside components
scattered logic
duplicated state

You centralize:

active preference
search query
filtered jobs

inside ONE feature hook.

This is scalable architecture.

Important Learning

Notice:

state logic is OUTSIDE UI
components become cleaner
business behavior becomes reusable

This is proper React architecture.