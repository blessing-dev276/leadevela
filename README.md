# Leadvela Digital Journey Studio

# Build Leadvela's Official Agency Website

Create a beautiful, premium, conversion-focused website for **Leadvela**, a digital solutions agency specializing in website design, GoHighLevel CRM, sales funnels, and business automation.

This is Leadvela's official agency website, not a travel agency website.

The purpose is to attract businesses, demonstrate our expertise, showcase working portfolio projects, and convert interested visitors into discovery calls.

Website: https://leadvela.com

## 1. Technical Requirements

Build FRONTEND ONLY using React, TypeScript, Tailwind CSS, and tasteful animation libraries.

Do not create a database, backend, authentication, Supabase integration, or CRM integration.

Make all interactive frontend components functional, with clear placeholders for future integrations.

The site must be fully responsive and professional on desktop, tablet, and mobile.

## 2. Navigation — Exactly Three Tabs

The main navigation must contain ONLY:

- Services
- Portfolio
- About

Place the Leadvela logo on the left. Clicking the logo returns to the homepage.

On the right, add a separate prominent **Schedule a Call** button linking to https://leadvela.com for now. Keep its destination configurable so it can later point to a dedicated booking page.

Do not add Home, Contact, Blog, Pricing, or other navigation tabs.

Use the same three-tab navigation on mobile.

## 3. Brand Design

Use Leadvela's existing logo and brand identity.

Brand colors:
- Deep Navy: #10233D
- Premium Teal: #16A394
- Dark Teal: #0C706A
- Warm White: #FAFBFA
- Slate: #52616B
- Accent Orange: #E5A05A

Use modern, confident typography such as Manrope or Inter.

Create an elegant design with generous whitespace, subtle gradients, refined cards, smooth transitions, sophisticated photography, and excellent visual hierarchy.

The website should look like a high-end digital agency, not a generic SaaS template.

## 4. Homepage

Hero headline:

**Beautiful Websites. Smarter Systems. Better Business.**

Supporting copy:

"Leadvela builds websites, CRM systems, and automated customer journeys that help businesses capture opportunities, manage inquiries, and follow up more effectively."

Primary CTA: Schedule a Call

Secondary CTA: Explore Our Portfolio

Add a subtle animated visual showing the relationship between a website, inquiry form, CRM pipeline, and automated follow-up.

Below the hero, create sections for:

- What We Do
- Industries We Serve
- Featured Portfolio Projects
- Our Process
- Why Work With Leadvela
- Final Schedule a Call CTA

Keep all copy professional, specific, and believable.

## 5. Services Tab

Create a dedicated Services page with six major service categories:

1. Website Design & Development
   Responsive business websites, landing pages, and conversion-focused interfaces.

2. GoHighLevel CRM Setup
   Contact management, custom fields, pipeline configuration, and lead organization.

3. Workflow Automation
   Automated lead acknowledgment, follow-ups, task creation, and notifications.

4. Sales Funnels & Landing Pages
   Lead generation funnels, inquiry forms, and conversion journeys.

5. Appointment Booking Systems
   Consultation calendars, scheduling flows, confirmations, and reminders.

6. CRM Integration & Troubleshooting
   Connecting website inquiries to CRM processes, fixing broken workflows, and improving existing systems.

Each service should include:
- An elegant visual or icon
- What the service solves
- What Leadvela builds
- Business benefits
- A relevant CTA

Use professional service descriptions rather than exaggerated marketing promises.

## 6. Portfolio Tab — The Most Important Page

Create a premium portfolio gallery where Leadvela can showcase actual work and sample projects.

Initially include five clearly labeled demo projects:

1. Travel Advisor Consultation System
2. Cruise Agency Quote Follow-Up System
3. Yacht Charter Availability Workflow
4. Group Tour Waitlist System
5. Destination Wedding Guest Travel System

For the first project, use the fictional brand **Aurelia Journeys** as the demonstration client.

Each project card should support:
- Cover image
- Project name
- Industry
- Services demonstrated
- Short project summary
- Project status: Concept, In Progress, or Completed Demo
- View Case Study button

Do not falsely label unfinished projects as completed.

Create a reusable case study detail page template with:

- Project overview
- Fictional business scenario or verified real client problem
- Project objectives
- Website screenshots
- Interactive demo or video placeholder
- CRM pipeline screenshots
- Workflow automation screenshots
- System architecture diagram
- Test scenario and verified outcomes
- Technologies used
- CTA: Build Something Similar

Use realistic placeholder content, not fake client reviews, fake performance statistics, or fabricated testimonials.

Make it easy to add more portfolio projects later without redesigning the page.

## 7. About Tab

Create an elegant About page introducing Leadvela as a digital solutions agency.

Headline:

**We Connect Great Design with Smarter Business Systems.**

Explain our approach:

- Understand the customer's journey
- Design the right digital experience
- Connect the necessary tools
- Automate repetitive processes
- Test and refine the system

Include sections for our philosophy, industries served, working process, and a call to action.

Do not invent company history, team size, awards, or customer numbers.

## 8. Realistic Double-Heartbeat Interaction Sound

Implement an original, realistic, soft double-heartbeat sound inspired by the sensation of a real heartbeat.

The sound should be:

**"du-DUM"**

Not a digital beep, piano note, notification chime, or cartoon sound.

The first beat should be a soft, low-frequency thump.

The second beat should be deeper, fuller, and slightly more pronounced.

Use the Web Audio API with:
- Low-frequency oscillators
- Very short amplitude envelopes
- Filtered low-frequency noise for a natural thump
- Two closely spaced beats
- No high-pitched tones
- No reverb tail
- Low overall volume

Aim for a natural heartbeat-like sound with approximately 120–180 milliseconds between the two beats.

Keep the complete effect under 500 milliseconds.

Create a reusable `useHeartbeatSound` hook.

Play it on selected meaningful interactions:
- Selecting a service
- Opening a portfolio project
- Selecting a case study
- Clicking major CTA buttons
- Completing a frontend demo step

Do not play it while scrolling, typing, or hovering.

Provide a sound toggle, initially OFF, so visitors can explicitly enable audio.

Prevent rapid overlapping sounds.

Ensure the audio works on mobile after user interaction.

Use an original synthesized effect, not copied audio from another website.

## 9. Micro-Interactions

Add premium motion:
- Subtle button press animations
- Smooth page transitions
- Soft hover elevation
- Animated portfolio previews
- Scroll reveal effects
- Elegant navigation underline
- Small visual response synchronized with the heartbeat sound

Respect reduced-motion settings.

Avoid excessive animations.

## 10. Footer

Include:
- Leadvela logo
- Short agency description
- Services, Portfolio, and About links
- Contact: hello@leadvela.com
- Company email: admin@leadvela.com
- Website: leadvela.com
- Copyright notice

Do not invent social media accounts or testimonials.

## 11. Quality Requirements

Ensure:
- Every navigation link works
- Every CTA has a defined action
- Portfolio project detail pages work
- The website is responsive
- The sound toggle works
- No backend services are created
- All sample work is labeled accurately
- All images have suitable alt text
- The site is accessible and SEO-ready

## Final Goal

Build a polished, distinctive, trustworthy digital agency website that showcases Leadvela's design and GoHighLevel automation expertise.

The site should make prospective clients understand what we do, see proof of our capabilities, and feel confident scheduling a discovery call.

Prioritize exceptional visual quality, clear messaging, and a compelling portfolio experience.

Build the complete frontend only.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d4b89ed1-4b25-4dd7-81e2-221f70fe93c8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
