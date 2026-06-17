import Nav from "../components/Nav";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import PolicyPage from "../components/PolicyPage";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Privacy & Cookie Policy",
  description: `How ${BRAND.name} collects, uses, stores and protects your information.`,
};

const SECTIONS = [
  {
    heading: "Introduction",
    blocks: [
      {
        type: "p",
        text:
          'Welcome to Revlient Intercontinental LLP ("Revlient", "we", "our", or "us").',
      },
      {
        type: "p",
        text:
          "We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy & Cookie Policy explains how we collect, use, store, process, and protect your information when you visit our website, use our software products, mobile applications, CRM platforms, AI-powered solutions, or interact with our services.",
      },
      {
        type: "p",
        text:
          "By accessing or using our website, products, or services, you agree to the practices described in this Privacy Policy.",
      },
    ],
  },
  {
    heading: "Information We Collect",
    blocks: [
      { type: "p", text: "We may collect the following categories of information:" },
      { type: "h3", text: "a) Personal Information" },
      {
        type: "p",
        text:
          "When you contact us, submit forms, request quotations, book consultations, or use our services, we may collect:",
      },
      {
        type: "ul",
        items: [
          "Full Name",
          "Email Address",
          "Phone Number",
          "Company Name",
          "Job Title",
          "Business Address",
          "Country/Location",
        ],
      },
      { type: "h3", text: "b) Account Information" },
      {
        type: "p",
        text:
          "When you create an account on any of our platforms or products, we may collect:",
      },
      {
        type: "ul",
        items: [
          "Username",
          "Password (encrypted)",
          "Account Preferences",
          "User Settings",
        ],
      },
      { type: "h3", text: "c) Usage & Technical Information" },
      { type: "p", text: "We may automatically collect:" },
      {
        type: "ul",
        items: [
          "IP Address",
          "Device Information",
          "Browser Type",
          "Operating System",
          "Referring URLs",
          "Pages Visited",
          "Session Duration",
          "Clickstream Data",
          "Date and Time of Access",
        ],
      },
      { type: "h3", text: "d) Business & Project Information" },
      {
        type: "p",
        text:
          "For service delivery and software implementation, we may collect:",
      },
      {
        type: "ul",
        items: [
          "Project Requirements",
          "Documents Shared by Clients",
          "Business Information",
          "Communication Records",
          "Uploaded Files and Media",
        ],
      },
      { type: "h3", text: "e) AI & CRM Data" },
      {
        type: "p",
        text:
          "For users of our CRM, ERP, AI Chatbot, and SaaS products, we may process:",
      },
      {
        type: "ul",
        items: [
          "Lead Information",
          "Student Data",
          "Customer Records",
          "Uploaded Documents",
          "Communication Logs",
          "User Interactions",
        ],
      },
      {
        type: "p",
        text: "Such information is processed solely for providing the requested services.",
      },
    ],
  },
  {
    heading: "How We Use Your Information",
    blocks: [
      { type: "p", text: "We use collected information for the following purposes:" },
      { type: "h3", text: "Service Delivery" },
      {
        type: "ul",
        items: [
          "Providing software development services",
          "Delivering websites, applications, and digital products",
          "Managing customer accounts",
          "Providing customer support",
        ],
      },
      { type: "h3", text: "Product Improvement" },
      {
        type: "ul",
        items: [
          "Enhancing platform functionality",
          "Improving user experience",
          "Monitoring system performance",
          "Developing new features and services",
        ],
      },
      { type: "h3", text: "Communication" },
      { type: "p", text: "We may use your contact information to:" },
      {
        type: "ul",
        items: [
          "Respond to enquiries",
          "Send project updates",
          "Provide service notifications",
          "Deliver newsletters and marketing communications (where permitted)",
        ],
      },
      {
        type: "p",
        text: "You may unsubscribe from promotional communications at any time.",
      },
      { type: "h3", text: "Security & Fraud Prevention" },
      { type: "p", text: "We use collected information to:" },
      {
        type: "ul",
        items: [
          "Detect unauthorized access",
          "Prevent fraud and abuse",
          "Protect our infrastructure and users",
        ],
      },
      { type: "h3", text: "Legal Compliance" },
      { type: "p", text: "We may process data to comply with:" },
      {
        type: "ul",
        items: [
          "Applicable laws and regulations",
          "Court orders",
          "Government requests",
          "Legal obligations",
        ],
      },
    ],
  },
  {
    heading: "Cookies & Tracking Technologies",
    blocks: [
      {
        type: "p",
        text:
          "Our website uses cookies and similar technologies to improve user experience.",
      },
      { type: "p", text: "Cookies may be used to:" },
      {
        type: "ul",
        items: [
          "Remember user preferences",
          "Maintain login sessions",
          "Analyze website traffic",
          "Improve website performance",
          "Understand visitor behavior",
        ],
      },
      {
        type: "p",
        text:
          "You may disable cookies through your browser settings; however, some website features may not function properly.",
      },
    ],
  },
  {
    heading: "Use of Analytics Services",
    blocks: [
      { type: "p", text: "We may use analytics services such as:" },
      {
        type: "ul",
        items: [
          "Google Analytics",
          "Search Console",
          "Performance Monitoring Tools",
          "User Behavior Analytics Tools",
        ],
      },
      { type: "p", text: "These services may collect information such as:" },
      {
        type: "ul",
        items: [
          "IP address",
          "Browser information",
          "Device information",
          "Pages visited",
          "Session duration",
        ],
      },
      { type: "p", text: "This information helps us improve our products and services." },
    ],
  },
  {
    heading: "Use of Google reCAPTCHA",
    blocks: [
      {
        type: "p",
        text:
          "Our website may use Google reCAPTCHA to protect against spam, automated abuse, and malicious activities.",
      },
      { type: "p", text: "Google reCAPTCHA may collect:" },
      {
        type: "ul",
        items: [
          "IP Address",
          "Browser Information",
          "User Agent",
          "Device Information",
          "User Interaction Data",
        ],
      },
      {
        type: "p",
        text:
          "This information is processed by Google in accordance with their privacy policies and terms of service.",
      },
      {
        type: "p",
        text:
          "By using our website, you acknowledge and consent to Google's processing of this information.",
      },
    ],
  },
  {
    heading: "Data Security",
    blocks: [
      { type: "p", text: "We implement industry-standard security measures including:" },
      {
        type: "ul",
        items: [
          "SSL/TLS Encryption",
          "Secure Cloud Infrastructure",
          "Access Controls",
          "Password Protection",
          "Role-Based Permissions",
          "Data Backup Procedures",
        ],
      },
      {
        type: "p",
        text:
          "While we strive to protect your information, no internet transmission or electronic storage system can be guaranteed to be 100% secure.",
      },
    ],
  },
  {
    heading: "Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain personal information only for as long as necessary to:",
      },
      {
        type: "ul",
        items: [
          "Provide services",
          "Fulfill contractual obligations",
          "Comply with legal requirements",
          "Resolve disputes",
          "Enforce agreements",
        ],
      },
      {
        type: "p",
        text: "When data is no longer required, it is securely deleted or anonymized.",
      },
    ],
  },
  {
    heading: "Third-Party Services",
    blocks: [
      { type: "p", text: "We may engage trusted third-party providers for:" },
      {
        type: "ul",
        items: [
          "Hosting Services",
          "Email Services",
          "Payment Processing",
          "Analytics",
          "Cloud Storage",
          "Communication Platforms",
        ],
      },
      {
        type: "p",
        text:
          "These providers are permitted to access information only as necessary to perform services on our behalf and are obligated to protect such information.",
      },
    ],
  },
  {
    heading: "Sharing of Information",
    blocks: [
      { type: "p", text: "We do not sell, rent, or trade your personal information." },
      {
        type: "p",
        text: "We may share information only under the following circumstances:",
      },
      { type: "h3", text: "Service Providers" },
      { type: "p", text: "Trusted partners assisting in delivering our services." },
      { type: "h3", text: "Legal Requirements" },
      {
        type: "p",
        text: "When required by law, regulation, legal process, or governmental request.",
      },
      { type: "h3", text: "Business Protection" },
      {
        type: "p",
        text:
          "To protect the rights, property, security, and safety of Revlient, our clients, employees, or the public.",
      },
    ],
  },
  {
    heading: "International Data Transfers",
    blocks: [
      {
        type: "p",
        text:
          "As part of our global operations, information may be processed and stored on servers located in different countries.",
      },
      {
        type: "p",
        text:
          "We take reasonable measures to ensure appropriate safeguards are in place when transferring personal information internationally.",
      },
    ],
  },
  {
    heading: "Your Rights",
    blocks: [
      {
        type: "p",
        text: "Depending on applicable laws, you may have the right to:",
      },
      {
        type: "ul",
        items: [
          "Access your personal information",
          "Correct inaccurate information",
          "Request deletion of information",
          "Restrict processing",
          "Withdraw consent",
          "Object to certain processing activities",
          "Request a copy of your data",
        ],
      },
      {
        type: "p",
        text: "Requests may be submitted using the contact information below.",
      },
    ],
  },
  {
    heading: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Our services are not intended for children under the age of 13.",
      },
      {
        type: "p",
        text:
          "We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete the information promptly.",
      },
    ],
  },
  {
    heading: "Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text:
          "We may update this Privacy Policy from time to time to reflect changes in:",
      },
      {
        type: "ul",
        items: [
          "Legal requirements",
          "Business practices",
          "Technology",
          "Services offered",
        ],
      },
      {
        type: "p",
        text:
          "The updated version will be posted on this page with the revised effective date.",
      },
    ],
  },
  {
    heading: "Contact Us",
    blocks: [
      {
        type: "p",
        text:
          "If you have any questions, concerns, or requests regarding this Privacy & Cookie Policy, please contact us:",
      },
      { type: "p", text: "Revlient Intercontinental LLP" },
      { type: "p", text: "Website: https://www.revlient.com" },
      { type: "p", text: "Email: connect@revlient.com" },
      {
        type: "p",
        text: "For privacy-related requests, please email: connect@revlient.com",
      },
    ],
  },
];

export default function PrivacyRoute() {
  return (
    <>
      <Nav />
      <PolicyPage
        title="Privacy & Cookie Policy"
        updated="18 June 2026"
        intro="We are committed to protecting your privacy and ensuring the security of your personal information."
        sections={SECTIONS}
      />
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
