import cruiseCover from "@/assets/cover-cruise.jpg";
import yachtCover from "@/assets/cover-yacht.jpg";
import groupCover from "@/assets/cover-group-tour.jpg";
import weddingCover from "@/assets/cover-wedding.jpg";

export type ProjectStatus = "Concept" | "In Progress" | "Completed Demo";

export type Project = {
  slug: string;
  name: string;
  client: string;
  clientNote: string;
  industry: string;
  services: string[];
  summary: string;
  status: ProjectStatus;
  cover: string;
  coverAlt: string;
  websiteUrl?: string;
  media?: { homepage: string; fullPage: string; form: string; pipeline: string };
  overview: string;
  scenario: string;
  objectives: string[];
  pipeline: string[];
  workflow: { trigger: string; steps: string[]; note?: string };
  formFields: string[];
  test: { scenario: string; checks: { label: string; result: "Verified" | "Planned" }[] };
  technologies: string[];
};

/** Add a new project by appending an object here — cards and case study pages render automatically. */
export const projects: Project[] = [
  {
    slug: "travel-advisor-consultation-system",
    name: "Travel Advisor Consultation System",
    client: "Aurelia Journeys",
    clientNote: "Fictional demonstration brand",
    industry: "Luxury Travel Advisory",
    services: ["Website Design", "GoHighLevel Forms", "CRM Pipeline", "Workflow Automation"],
    summary:
      "A consultation-led GoHighLevel demo with a trip inquiry form, a six-stage CRM pipeline, and a draft acknowledgment workflow.",
    status: "Completed Demo",
    cover: "/portfolio/travel-advisor/homepage.png",
    coverAlt: "Aurelia Journeys demo homepage with a luxury travel hero and consultation call to action",
    websiteUrl: "https://sites.leadconnectorhq.com/preview/a3wx7FZsULm7DjJWrW3W?notrack=true",
    media: {
      homepage: "/portfolio/travel-advisor/homepage.png",
      fullPage: "/portfolio/travel-advisor/full-page.png",
      form: "/portfolio/travel-advisor/consultation-form-mockup.png",
      pipeline: "/portfolio/travel-advisor/pipeline-mockup.png",
    },
    overview:
      "Aurelia Journeys is a fictional demonstration brand. Its GoHighLevel preview page presents the travel advisory experience and a consultation inquiry form. A six-stage CRM pipeline and a four-step workflow have been configured; the workflow remains a draft pending publication and testing.",
    scenario:
      "The advisor receives trip requests through email, Instagram, and a basic contact form. Details arrive incomplete, follow-up depends on memory, and there is no single view of which travelers are waiting for a response.",
    objectives: [
      "Present the advisor's services with a calm, premium website",
      "Capture structured trip details in a single inquiry form",
      "Route form inquiries into the New Inquiry pipeline when the workflow is published",
      "Create or update contacts from form answers",
      "Send acknowledgment email and SMS after a test confirms the workflow runs",
    ],
    pipeline: ["New Inquiry", "Contacted", "Consultation Booked", "Proposal Sent", "Booked Trip", "Lost"],
    workflow: {
      trigger: "Form Submitted: Aurelia Journeys Trip Inquiry",
      steps: ["Create or update contact with form data", "Create opportunity in New Inquiry pipeline", "Send acknowledgment email to contact", "Send acknowledgment SMS to contact"],
      note: "The Aurelia Journeys Trip Inquiry form is now selected on the preview page. The workflow is still a draft, so its actions will not run until it is published.",
    },
    formFields: ["Full Name (required)", "Email (required)", "Phone", "Destination (required)", "Travel Dates", "Trip Details / Budget"],
    test: {
      scenario: "A test traveler submits the Aurelia Journeys Trip Inquiry form. After publication, each workflow step should be checked with a test contact.",
      checks: [
        { label: "Contact created with all form fields mapped", result: "Planned" },
        { label: "Opportunity placed in New Inquiry stage", result: "Planned" },
        { label: "Acknowledgment email delivered to test inbox", result: "Planned" },
        { label: "Acknowledgment SMS delivered to test phone", result: "Planned" },
      ],
    },
    technologies: ["GoHighLevel Website Builder", "GoHighLevel Forms", "GHL Opportunities", "GHL Workflows"],
  },
  {
    slug: "cruise-agency-quote-follow-up",
    name: "Cruise Agency Quote Follow-Up System",
    client: "Fictional cruise agency",
    clientNote: "Demonstration scenario",
    industry: "Cruise Travel",
    services: ["GoHighLevel CRM", "Workflow Automation", "Sales Funnels"],
    summary:
      "A quote request funnel and follow-up sequence that keeps cruise prospects engaged between quote delivery and booking decision.",
    status: "In Progress",
    cover: cruiseCover,
    coverAlt: "Cruise ship sailing on calm water at golden hour, aerial view",
    overview:
      "This demonstration explores how a cruise agency can manage quote requests and keep conversations moving during the often-long decision window.",
    scenario:
      "Quotes are sent manually by email and rarely followed up. Prospects compare options elsewhere and the agency cannot see which quotes are still open.",
    objectives: ["Capture sailing preferences in a guided quote funnel", "Track every quote as an opportunity", "Follow up on open quotes at sensible intervals", "Flag quotes approaching price-hold expiry"],
    pipeline: ["Quote Requested", "Quote Sent", "Follow-Up", "Booked"],
    workflow: {
      trigger: "Quote marked as sent",
      steps: ["Move opportunity to Quote Sent", "Wait 2 days → check-in email", "Wait 3 days → advisor call task", "Price-hold reminder before expiry"],
    },
    formFields: ["Name", "Email", "Preferred cruise line", "Departure month", "Cabin type", "Guests"],
    test: {
      scenario: "A test prospect requests a 7-night Caribbean quote; the quote is marked sent and left unanswered.",
      checks: [
        { label: "Funnel submission creates opportunity", result: "Verified" },
        { label: "Check-in email triggers after wait step", result: "Planned" },
        { label: "Advisor call task assigned", result: "Planned" },
        { label: "Price-hold reminder fires", result: "Planned" },
      ],
    },
    technologies: ["GoHighLevel Funnels", "GHL Workflows", "Custom Fields", "Email & SMS"],
  },
  {
    slug: "yacht-charter-availability-workflow",
    name: "Yacht Charter Availability Workflow",
    client: "Fictional charter broker",
    clientNote: "Concept scenario",
    industry: "Yacht Charter",
    services: ["Website Design", "Workflow Automation", "CRM Integration"],
    summary:
      "A concept for handling charter availability requests, matching inquiries to yacht options, and coordinating broker follow-up.",
    status: "Concept",
    cover: yachtCover,
    coverAlt: "White motor yacht anchored in a turquoise cove, overhead drone view",
    overview: "A concept exploring how a charter broker could structure availability requests and keep high-value inquiries from going cold.",
    scenario: "Availability questions arrive with varying detail, and brokers spend time chasing dates, guest numbers, and budget before they can respond.",
    objectives: ["Collect charter dates, region, and guest count upfront", "Tag inquiries by region and yacht size", "Assign the right broker automatically", "Confirm availability checks with the client"],
    pipeline: ["Availability Request", "Options Sent", "Contract", "Confirmed"],
    workflow: { trigger: "Availability form submitted", steps: ["Tag by region and size", "Assign broker by region", "Send 'checking availability' message", "Broker task: send options within 24h"] },
    formFields: ["Name", "Email", "Region", "Charter dates", "Guests", "Yacht preference"],
    test: {
      scenario: "Planned: a test inquiry for a 7-day Croatia charter for eight guests.",
      checks: [
        { label: "Region-based broker assignment", result: "Planned" },
        { label: "Availability message delivered", result: "Planned" },
      ],
    },
    technologies: ["React", "GoHighLevel", "GHL Workflows", "Webhooks"],
  },
  {
    slug: "group-tour-waitlist-system",
    name: "Group Tour Waitlist System",
    client: "Fictional tour operator",
    clientNote: "Concept scenario",
    industry: "Group Tours",
    services: ["Sales Funnels", "GoHighLevel CRM", "Workflow Automation"],
    summary: "A concept for managing waitlists on sold-out departures and notifying travelers in order when spaces open.",
    status: "Concept",
    cover: groupCover,
    coverAlt: "Small group of hikers walking a mountain trail at sunrise",
    overview: "A concept for tour operators whose popular departures sell out and who need a fair, organized way to offer released spaces.",
    scenario: "Waitlists live in spreadsheets, and offering a released space means manually emailing people one by one.",
    objectives: ["Capture waitlist sign-ups per departure", "Record sign-up order", "Notify the next traveler when a space opens", "Move to the next person if no reply"],
    pipeline: ["Waitlisted", "Space Offered", "Deposit Pending", "Confirmed"],
    workflow: { trigger: "Space released on departure", steps: ["Find next waitlisted contact", "Send space-available message", "Wait 48h for response", "Offer to next traveler if no reply"] },
    formFields: ["Name", "Email", "Departure", "Travelers", "Phone"],
    test: { scenario: "Planned: release one space on a full departure with three waitlisted travelers.", checks: [{ label: "Offer reaches first traveler", result: "Planned" }, { label: "Fallback to second traveler", result: "Planned" }] },
    technologies: ["GoHighLevel Funnels", "GHL Workflows", "Tags & Smart Lists"],
  },
  {
    slug: "destination-wedding-guest-travel",
    name: "Destination Wedding Guest Travel System",
    client: "Fictional wedding travel planner",
    clientNote: "Concept scenario",
    industry: "Destination Weddings",
    services: ["Website Design", "Sales Funnels", "Workflow Automation", "Appointment Booking"],
    summary: "A concept for coordinating guest travel registrations, room blocks, and reminders for a destination wedding.",
    status: "Concept",
    cover: weddingCover,
    coverAlt: "Beachfront wedding ceremony setup with floral arch at sunset",
    overview: "A concept that gives wedding guests a simple way to register travel plans while giving the planner a clear overview.",
    scenario: "Guest travel details are collected over messages and spreadsheets, making room-block tracking and reminders difficult.",
    objectives: ["Guest registration page per wedding", "Track room-block bookings", "Send deadline reminders to guests", "Give the planner a live guest status view"],
    pipeline: ["Invited", "Registered", "Room Booked", "Travel Confirmed"],
    workflow: { trigger: "Guest registration submitted", steps: ["Tag guest with wedding name", "Send room-block booking link", "Reminder before booking deadline", "Notify planner of confirmations"] },
    formFields: ["Guest name", "Email", "Party size", "Arrival date", "Room preference"],
    test: { scenario: "Planned: register two test guests and confirm one room booking.", checks: [{ label: "Guest tagged to correct wedding", result: "Planned" }, { label: "Deadline reminder sent", result: "Planned" }] },
    technologies: ["React", "GoHighLevel", "GHL Calendars", "GHL Workflows"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
