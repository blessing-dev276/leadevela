import { CalendarCheck, Filter, LayoutTemplate, Plug, Users, Workflow, type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  short: string;
  icon: LucideIcon;
  solves: string;
  builds: string[];
  benefits: string[];
  cta: string;
};

export const services: Service[] = [
  {
    id: "websites",
    title: "Website Design & Development",
    short: "Responsive business websites, landing pages, and conversion-focused interfaces.",
    icon: LayoutTemplate,
    solves:
      "Outdated or unclear websites make it hard for visitors to understand what you offer and how to contact you.",
    builds: ["Responsive multi-page business websites", "Focused landing pages for campaigns", "Clear inquiry and contact paths", "On-page SEO foundations and accessible markup"],
    benefits: ["A credible first impression", "Visitors find the next step quickly", "A site your team can maintain"],
    cta: "Discuss a website project",
  },
  {
    id: "crm",
    title: "GoHighLevel CRM Setup",
    short: "Contact management, custom fields, pipeline configuration, and lead organization.",
    icon: Users,
    solves: "Inquiries scattered across inboxes, spreadsheets, and DMs make it easy to lose track of opportunities.",
    builds: ["Sub-account configuration", "Custom fields and tags that match your process", "Opportunity pipelines with clear stages", "Smart lists and basic reporting views"],
    benefits: ["One place for every contact", "A shared view of where each lead stands", "Cleaner data for future decisions"],
    cta: "Plan your CRM setup",
  },
  {
    id: "automation",
    title: "Workflow Automation",
    short: "Automated lead acknowledgment, follow-ups, task creation, and notifications.",
    icon: Workflow,
    solves: "Manual follow-up is inconsistent, and new inquiries can wait hours or days for a first response.",
    builds: ["Instant inquiry acknowledgment by email or SMS", "Timed follow-up sequences", "Automatic task assignment for your team", "Internal notifications for new or stalled leads"],
    benefits: ["Faster first responses", "Fewer repetitive manual steps", "Consistent communication with every lead"],
    cta: "Automate a workflow",
  },
  {
    id: "funnels",
    title: "Sales Funnels & Landing Pages",
    short: "Lead generation funnels, inquiry forms, and conversion journeys.",
    icon: Filter,
    solves: "Campaign traffic arrives on general pages with no focused path toward an inquiry or booking.",
    builds: ["Multi-step lead capture funnels", "Qualifying inquiry forms", "Thank-you and next-step pages", "Funnel-to-pipeline connections"],
    benefits: ["A clear path from interest to inquiry", "Better-qualified leads", "Campaigns connected to follow-up"],
    cta: "Design a funnel",
  },
  {
    id: "booking",
    title: "Appointment Booking Systems",
    short: "Consultation calendars, scheduling flows, confirmations, and reminders.",
    icon: CalendarCheck,
    solves: "Back-and-forth emails to find a meeting time slow down sales conversations and cause no-shows.",
    builds: ["Consultation calendars with availability rules", "Pre-call intake questions", "Confirmation and reminder messages", "Reschedule and no-show follow-up"],
    benefits: ["Prospects book without friction", "Fewer missed appointments", "Better-prepared discovery calls"],
    cta: "Set up booking",
  },
  {
    id: "integration",
    title: "CRM Integration & Troubleshooting",
    short: "Connecting website inquiries to CRM processes, fixing broken workflows, and improving existing systems.",
    icon: Plug,
    solves: "Forms that don't reach the CRM, duplicated contacts, or automations that silently stop working.",
    builds: ["Website form to CRM connections", "Audit of existing workflows and triggers", "Fixes for broken or duplicated automations", "Documentation of how the system works"],
    benefits: ["Confidence that inquiries arrive", "A system that behaves predictably", "Clear notes for your team"],
    cta: "Get a system review",
  },
];
