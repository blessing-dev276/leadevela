export type WorkImage = {
  src: string;
  title: string;
  caption: string;
};

export type WorkCase = {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  cover: string;
  coverAlt: string;
  services: string[];
  challenge: string;
  approach: string[];
  journey: { step: string; detail: string }[];
  gallery: WorkImage[];
  demonstrates: string[];
  note: string;
};

const asset = (group: string, name: string) => `/portfolio/work/${group}/${name}.jpeg`;

export const workCases: WorkCase[] = [
  {
    slug: "vehicle-protection-lead-capture",
    title: "Vehicle Protection Lead Capture",
    client: "A-Z Vehicle Protection",
    category: "Automotive · Forms & qualification",
    summary: "A branded intake experience that gathers vehicle details, service interests, and timing before a protection recommendation.",
    cover: asset("vehicle", "form-finished"),
    coverAlt: "Black and red vehicle protection inquiry form with A-Z Vehicle Protection branding",
    services: ["Form design", "Lead qualification", "GoHighLevel"],
    challenge: "A protection studio needs enough context to recommend the right service without asking every prospect the same questions again after the first contact.",
    approach: [
      "Structure the intake around contact details, vehicle information, current condition, protection interests, and timing.",
      "Use clear service language and a high-contrast design that fits the studio's visual identity.",
      "Refine the field labels and layout in the form builder before sharing the final prospect-facing view.",
    ],
    journey: [
      { step: "Identify", detail: "The visitor provides name, phone, and email." },
      { step: "Qualify", detail: "Vehicle details and protection interests give context for the recommendation." },
      { step: "Prioritize", detail: "Timing helps the team understand when the visitor wants the work completed." },
      { step: "Request", detail: "The visitor submits a request for a tailored protection recommendation." },
    ],
    gallery: [
      { src: asset("vehicle", "form-refined"), title: "Refined PPF intake", caption: "The form builder view shows the final field structure, two-column layout, and branded call to action." },
      { src: asset("vehicle", "form-preview"), title: "Prospect-facing form", caption: "A clean preview of the PPF intake without the editor controls." },
      { src: asset("vehicle", "form-builder"), title: "Form configuration", caption: "The editor view shows how contact and vehicle questions were assembled." },
      { src: asset("vehicle", "form-finished"), title: "Earlier protection form", caption: "An earlier branded version shows the progression from broad service selection to a more focused PPF intake." },
    ],
    demonstrates: ["Multi-field qualification", "Branded form design", "Iteration inside GoHighLevel", "Clear prospect call to action"],
    note: "The screenshots show form design and configuration. They do not establish submission volume or conversion results.",
  },
  {
    slug: "wellness-lead-magnet-journey",
    title: "Wellness Lead Magnet Journey",
    client: "Back to Me",
    category: "Wellness · Email & content delivery",
    summary: "A German-language opt-in journey spanning landing creative, email confirmation, a download page, and a welcome sequence.",
    cover: asset("wellness", "landing-creative"),
    coverAlt: "Back to Me beach landing creative with German-language headline",
    services: ["Landing creative", "Email design", "Lead magnet delivery", "MailerLite"],
    challenge: "A lead magnet should feel like one coherent experience from first interest through confirmation and access to the promised material.",
    approach: [
      "Connect the visual theme and message across the landing creative, confirmation email, and thank-you page.",
      "Use a confirmation step before delivering the video journey and workbook.",
      "Prepare a welcome workflow to continue the conversation after the initial download.",
    ],
    journey: [
      { step: "Discover", detail: "The visitor encounters the German-language wellness landing creative." },
      { step: "Confirm", detail: "The confirmation email asks the visitor to verify their address." },
      { step: "Receive", detail: "The thank-you page presents the workbook download." },
      { step: "Continue", detail: "A welcome email workflow supports the next step in the journey." },
    ],
    gallery: [
      { src: asset("wellness", "landing-creative"), title: "Landing creative", caption: "A calm coastal visual establishes the tone for the German-language wellness experience." },
      { src: asset("wellness", "confirmation-email"), title: "Confirmation email", caption: "The email design invites the visitor to confirm their address before receiving the content." },
      { src: asset("wellness", "thank-you-page"), title: "Thank-you and download page", caption: "The post-confirmation view includes a clear workbook download action." },
      { src: asset("wellness", "welcome-workflow"), title: "Welcome sequence", caption: "The MailerLite preview shows the entry group and first welcome email." },
    ],
    demonstrates: ["Connected landing and email design", "German-language customer journey", "Lead magnet delivery flow", "Welcome automation structure"],
    note: "These screenshots document the designed journey and workflow preview. No subscriber or delivery statistics are claimed.",
  },
  {
    slug: "wellness-segmentation-and-product-automation",
    title: "Wellness Segmentation & Product Automation",
    client: "Wellness education programs",
    category: "Education · Branching workflows",
    summary: "A collection of GoHighLevel workflows for quiz segmentation, email onboarding, and paid digital product delivery.",
    cover: asset("automation", "quiz-branches"),
    coverAlt: "GoHighLevel workflow builder showing multiple quiz branches and conditions",
    services: ["Workflow architecture", "Segmentation", "Email automation", "Product delivery"],
    challenge: "Different quiz outcomes, free resources, and paid products need distinct follow-up paths instead of one generic sequence.",
    approach: [
      "Use tags and form submissions as entry points for different audience journeys.",
      "Branch messages based on quiz signals and product interest.",
      "Connect payment or form triggers to product tags and immediate delivery emails.",
    ],
    journey: [
      { step: "Enter", detail: "A quiz tag, form submission, or payment event starts the relevant flow." },
      { step: "Classify", detail: "Conditions separate contacts by quiz answer, interest, or product." },
      { step: "Deliver", detail: "The matching welcome or product email is configured in the workflow." },
      { step: "Nurture", detail: "Wait steps and further branches shape the next message." },
    ],
    gallery: [
      { src: asset("automation", "quiz-triggers"), title: "Quiz entry points", caption: "Multiple contact tags feed a single segmentation workflow." },
      { src: asset("automation", "quiz-branches"), title: "Branching logic", caption: "Conditions route contacts through different follow-up paths." },
      { src: asset("automation", "energy-reset"), title: "Energy Reset opt-in", caption: "A form submission applies a tag and leads to an immediate welcome email." },
      { src: asset("automation", "boundary-product"), title: "Boundary Blueprint delivery", caption: "Payment and form triggers converge on product tagging and an immediate email." },
      { src: asset("automation", "paid-product"), title: "Paid product path", caption: "A payment trigger leads into tag assignment, email delivery, and a condition." },
    ],
    demonstrates: ["Multiple trigger types", "Tag-based segmentation", "Conditional branching", "Digital product delivery design"],
    note: "The images show configured and published workflow screens. They do not prove enrollment counts, purchases, or delivery outcomes.",
  },
  {
    slug: "real-estate-crm-lifecycle",
    title: "Real Estate CRM Lifecycle",
    client: "Property teams",
    category: "Real estate · CRM & appointments",
    summary: "Workflow examples covering lead intake, qualification, customer onboarding, appointment confirmation, reminders, and outbound calling logic.",
    cover: asset("realestate", "lead-followup"),
    coverAlt: "GoHighLevel real estate new-lead follow-up workflow",
    services: ["CRM workflows", "Pipeline automation", "Appointment sequences", "AI call routing"],
    challenge: "Property inquiries and appointments move through several stages, each needing a timely handoff and a clear next action.",
    approach: [
      "Capture form submissions into a lead follow-up workflow with tagging, an opportunity action, and internal notification.",
      "Separate qualified lead and customer onboarding paths using pipeline stage changes.",
      "Build appointment communications around confirmation, intake, and reminder steps.",
      "Explore conditional outbound calling paths using address and contact tags.",
    ],
    journey: [
      { step: "Capture", detail: "A lead inquiry form triggers tagging and opportunity creation." },
      { step: "Qualify", detail: "A pipeline stage change starts the qualified-lead handoff." },
      { step: "Book", detail: "Appointment booking updates the contact and opportunity." },
      { step: "Prepare", detail: "Confirmation, intake, and reminders guide the contact before the meeting." },
      { step: "Onboard", detail: "A converted opportunity enters a customer onboarding flow." },
    ],
    gallery: [
      { src: asset("realestate", "lead-followup"), title: "New lead follow-up", caption: "The form submission entry point connects tagging, opportunity creation, and internal notification." },
      { src: asset("realestate", "qualified-lead"), title: "Qualified lead handoff", caption: "A pipeline stage change begins a separate qualification workflow." },
      { src: asset("realestate", "appointment-booking"), title: "Appointment entry point", caption: "A booked appointment triggers contact and opportunity updates." },
      { src: asset("realestate", "confirmation"), title: "Confirmation and intake", caption: "The appointment path includes confirmation and client intake emails." },
      { src: asset("realestate", "reminders"), title: "Pre-appointment reminders", caption: "Wait and SMS steps prepare contacts ahead of the meeting." },
      { src: asset("realestate", "customer-onboarding"), title: "Customer onboarding", caption: "A converted pipeline stage starts the onboarding workflow." },
      { src: asset("realestate", "ai-outbound"), title: "Conditional outbound path", caption: "Address and tag conditions route contacts toward an AI call action or alternative steps." },
    ],
    demonstrates: ["Lifecycle workflow planning", "Pipeline-driven triggers", "Appointment communications", "Conditional AI calling"],
    note: "These screenshots come from several property-related workflows and are presented as a collection. No client performance metrics are claimed.",
  },
  {
    slug: "sales-funnel-design-exploration",
    title: "Sales Funnel Design Exploration",
    client: "Elevate concept",
    category: "Education · Funnel design",
    summary: "A visual exploration of a course sales page with an offer narrative, training outline, FAQ, and repeated enrollment calls to action.",
    cover: asset("sales", "elevate-funnel"),
    coverAlt: "Purple and white Elevate course sales funnel design mockup",
    services: ["Landing page design", "Offer structure", "Conversion copy", "Responsive layout concept"],
    challenge: "A training offer needs a page that explains the outcome, what is included, and the next step without making visitors hunt for key details.",
    approach: [
      "Lead with the core promise and a direct enrollment action.",
      "Explain the training, resources, support, and common questions in a clear sequence.",
      "Repeat the call to action after key decision points.",
    ],
    journey: [
      { step: "Understand", detail: "The hero states the offer and intended transformation." },
      { step: "Evaluate", detail: "The page lays out what is included and how the program works." },
      { step: "Resolve", detail: "FAQ content addresses common questions." },
      { step: "Act", detail: "Enrollment calls to action appear throughout the layout." },
    ],
    gallery: [
      { src: asset("sales", "elevate-funnel"), title: "Full sales page concept", caption: "The supplied mockup shows the hero, offer sections, FAQ, testimonials layout, and footer in one composition." },
    ],
    demonstrates: ["Long-form offer architecture", "Clear call-to-action placement", "Design system consistency", "Responsive composition concept"],
    note: "This is presented as a visual design concept. The supplied image does not verify the testimonials, prices, guarantee, a live page, or sales results.",
  },
];

export const getWorkCase = (slug: string) => workCases.find((sample) => sample.slug === slug);
