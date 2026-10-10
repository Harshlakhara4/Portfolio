export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What types of projects do you build?",
    answer:
      "Business websites, full-stack web applications, admin panels and dashboards, and automation or improvements to existing systems. If your idea involves a website, a web app, or a workflow that could be streamlined, it's probably a fit.",
  },
  {
    question: "How does your project pricing work?",
    answer:
      "The packages on this page are starting points, not fixed quotes. Final pricing depends on the confirmed scope, the integrations involved, and overall complexity. After a short conversation about what you need, I'll share a clear, itemised quote.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends entirely on scope. A compact website is far quicker than a full application with authentication and admin workflows. Once the scope is confirmed in the planning stage, I'll give you a realistic timeline with milestones rather than a generic promise.",
  },
  {
    question: "Can you work with an existing website or codebase?",
    answer:
      "Yes. I can improve, extend, or fix an existing site or application — adding features, integrating APIs, resolving bugs, and improving performance. I'll review what you have first so the plan fits your current setup.",
  },
  {
    question: "Do you provide backend and database development?",
    answer:
      "Yes. I work across the stack with Node.js, Express, and REST APIs, and model data with MongoDB and Mongoose. Authentication, role-based access, and realtime features with Socket.IO are available when your project needs them.",
  },
  {
    question: "Can you deploy the website?",
    answer:
      "Yes. Deployment and launch support are included in most engagements. Ongoing hosting costs and third-party services are billed separately and depend on the stack we choose together.",
  },
  {
    question: "How do we start a project?",
    answer:
      "Send a short message through the contact form or WhatsApp describing what you're building. We'll have a quick conversation to understand the goals, then I'll put together the scope, approach, and a clear quote.",
  },
];
