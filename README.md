# HSLUConnect

HSLUConnect is a student event platform created for the HSLU community as part of our **Managing IT-Projects** course. The project explores how a small product team can turn a campus-life problem into a working digital service: students need an easy way to discover informal activities, join university-related events, create their own gatherings, and manage attendance in a way that still feels safe and organized.

The application is built as a functional prototype rather than a static concept. It includes registration, profiles, event creation, event moderation, RSVP management, membership tiers, paid-event handling, QR passes, and event-day check-in. In short, it covers the full lifecycle from “I want to host an event” to “people actually attended.”

Live site: <https://hslu-connect.vercel.app/>

Repository: <https://github.com/CynthiaGichuki/HSLUConnect>

## Project Context

This project was developed for the **Managing IT-Projects** course at the Lucerne University of Applied Sciences and Arts. The course context shaped both the technical and organizational decisions behind the system. We treated HSLUConnect not only as a coding assignment, but also as a project-management exercise involving scope definition, feature prioritization, iteration, risk handling, team coordination, and delivery of a working product.

The platform focuses on a real student need: making campus life more visible and accessible. HSLU has students across different campuses, programmes, and social groups. A shared event platform can help students discover activities, meet others, and participate in academic, social, cultural, career, and sports-related events.

## What HSLUConnect Does

HSLUConnect allows verified HSLU students to:

- Register with an HSLU student email address.
- Create a profile with campus, programme, and bio information.
- Browse upcoming events.
- Search and filter events by type, category, and price.
- Create public or private events.
- RSVP to events.
- Receive a QR pass after RSVP approval.
- Check in at events using the QR-based flow.
- View their own created and joined events from the profile page.

The system also includes an admin role for platform oversight. Admins can approve submitted events, reject unsuitable events, view platform metrics, manage users, update roles, and adjust membership tiers.

## Key Features

### Student Registration

Registration is limited to email addresses ending in `@stud.hslu.ch`. The form collects full name, campus, programme, bio, and password. Passwords must meet basic complexity requirements, and user-entered profile text is checked for profanity before account creation.

New users start on the **Discover** membership tier by default.

### Event Discovery

Students can explore events through a searchable event listing. Events can be filtered by:

- Event type: public, private, or official
- Category: social, academic, career, cultural, or sports
- Price: free or paid

The home page also highlights trending approved events and shows a count of verified students.

### Event Creation

Authenticated students can create public and private events. Admins can additionally create official events. Event creation includes:

- Title
- Event type
- Category
- Date and optional time
- Participant limit
- Entry fee
- Location
- Description

Student-created events are submitted for admin approval before becoming publicly visible. Admin-created events can be published directly.

### Public, Private, and Official Events

HSLUConnect supports three event types:

- **Public events** are visible to students and can be joined directly if the user is eligible.
- **Private events** are invite-based and can hide sensitive details until RSVP approval.
- **Official events** are reserved for admins and represent more formal HSLU-related activities.

Private events include invite-token support so creators can share access through a private link.

### RSVP Management

The RSVP flow depends on the event type:

- Public events can be joined directly when capacity and membership rules allow it.
- Private event RSVPs can remain pending until the creator or an admin approves them.
- Approved RSVPs receive a QR token for check-in.
- Rejected or cancelled RSVPs are tracked separately.

Event creators can view attendee lists, approve or reject pending RSVPs, copy attendee emails, and manage event-day access.

### Membership Tiers

The current version includes three membership tiers:

| Tier | Price | Access |
| --- | --- | --- |
| Discover | Free | One free event per month |
| Connect | CHF 5 / month | Access to all free and paid events |
| Belong | CHF 25 / month | Access to all free and paid events, plus CHF 5 off paid events |

Membership logic affects whether a student can join a paid event and how much they owe at check-in.

### Paid Events and Kiosk Payment

HSLUConnect does not process online payments directly. Paid events are handled through an in-person kiosk flow:

1. A student RSVPs to a paid event.
2. If the RSVP is approved, the attendee receives a QR pass.
3. At the event, the organizer or admin confirms payment in person.
4. The system records the payment status, amount, timestamp, and confirming user.
5. Check-in becomes available after payment is confirmed.

This keeps the prototype realistic without requiring full payment-provider integration.

### QR Check-In

Approved RSVPs generate QR passes. The QR code links to the check-in route, where the system validates:

- The QR token
- The RSVP status
- The attendee
- The event
- The payment status
- Whether the current user is allowed to check the attendee in

Only the event creator or an admin can check in an attendee. For paid events, unpaid attendees must be marked as paid before check-in is enabled.

### Admin Dashboard

Admins have access to a control center with:

- Total users
- Total events
- Total RSVPs
- Pending event approvals
- Approved upcoming events
- Rejected events
- Approved RSVP metrics
- Event moderation tools
- User role controls
- Membership tier controls

The dashboard is designed to support moderation, oversight, and basic platform operations.

## Technology Stack

HSLUConnect uses a lightweight modern web stack:

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | Astro | Page structure, routing, and UI composition |
| Styling | Tailwind CSS | Responsive interface styling |
| Icons | lucide-astro | Interface icons |
| Auth | Supabase Auth | Student registration, login, sessions, and logout |
| Database | Supabase PostgreSQL | Profiles, events, RSVPs, membership, payment, and check-in data |
| Security | Supabase Row Level Security | Database-level access control |
| Serverless | Supabase Edge Functions | QR email workflow |
| Deployment | Vercel | Hosted production site |

## Main Data Model

The platform is built around three main application tables.

### `profiles`

Stores application-level user information:

- User ID
- Full name
- Email
- Programme
- Campus
- Bio
- Role
- Membership tier

### `events`

Stores event information:

- Title and description
- Event type
- Category
- Date and time
- Location
- Participant limit
- Entry fee
- Creator
- Approval status
- Private invite token

### `event_rsvps`

Stores participation and attendance information:

- Event ID
- User ID
- RSVP status
- Approval metadata
- QR token
- Payment status
- Paid amount and timestamp
- Check-in status and timestamp

## Security Notes

The project includes several important security and safety measures:

- HSLU student email restriction during registration.
- Supabase-managed authentication.
- Password complexity validation.
- Row Level Security in the database.
- Role-based access for admin features.
- Ownership checks for event management.
- Private event invite tokens.
- Plain-text rendering and escaping for user-entered content.
- HTTPS through Vercel deployment.

Some production-grade improvements would still be needed before using this as a real university service, such as a full security audit, stricter logging, deeper policy review, abuse-reporting tools, and formal data-retention rules.

## Running the Project Locally

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build the production version:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

The local development server usually runs at:

```text
http://localhost:4321
```

## Environment Variables

The app expects Supabase configuration values to be available as public environment variables:

```text
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

These are used by the Supabase client in `src/lib/supabase.ts`.

## Important Pages

| Route | Purpose |
| --- | --- |
| `/` | Home page with hero, trending events, and platform highlights |
| `/explore` | Search and filter approved events |
| `/create` | Create a new event |
| `/profile` | View and edit the current user profile and schedule |
| `/users/profile` | View a public student profile |
| `/tiers` | View membership plans |
| `/events/event_details` | View event details, RSVP, manage attendees, and access QR pass |
| `/events/check_in` | Validate QR passes and confirm event attendance |
| `/admin` | Admin dashboard and moderation tools |
| `/auth/register` | Student registration |
| `/auth/login` | Login |
| `/auth/terms` | Terms of service |
| `/auth/privacy` | Privacy policy |

## Current Limitations

HSLUConnect is a working prototype, but it is not yet a fully production-ready platform. Known limitations and future opportunities include:

- More complete automated test coverage.
- More detailed audit logs for admin and payment actions.
- Stronger reporting and abuse-handling flows.
- Improved scanner experience for mobile check-in.
- More robust notification flows for event approval and RSVP changes.
- Deeper review of all Row Level Security policies.
- Real payment-provider integration if online payment becomes part of the scope.
- Analytics for attendance, engagement, membership usage, and event popularity.

## Why This Project Matters

The value of HSLUConnect is not only technical. The project demonstrates how a student team can identify a practical campus problem, define a manageable scope, make trade-offs, and deliver a usable system within a course timeline.

It also shows how project-management decisions affect software architecture. For example, choosing Supabase reduced backend complexity, using Vercel simplified deployment, and keeping payments at the kiosk avoided the risk of implementing online payment processing too early. These decisions helped the team focus on a complete event-management workflow while still leaving room for future development.

HSLUConnect is therefore both a product prototype and a record of project execution for the Managing IT-Projects course.
