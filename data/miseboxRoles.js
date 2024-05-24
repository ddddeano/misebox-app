// miseboxRoles.js

const miseboxRoles = {
  miseboxUser: {
    doc: "misebox-user",
    collection: "misebox-users",
    appLight: "#E6E6FA", // Lavender
    appDark: "#1A1A4B", // Persian Indigo
    isAvailable: true,
    welcome: "Welcome to the MiseBox Profile app",
    motto: "Manage Your Central Account, Browse The Ecosystem",
    smallPrint: "Speak To a developer, upgrade subscription"
  },
  professional: {
    doc: "professional",
    collection: "professionals",
    appLight: "#D0E8D9", // Tea Green
    appDark: "#004225", // British Racing Green
    isAvailable: true,
    welcome: "Welcome to the Agency app",
    motto: "Post Profiles, Browse Jobs, and Manage Your Gigs",
    smallPrint: "Boost Your Earnings with Flexible Missions and Just-in-Time Assignments"
  },
  chef: {
    doc: "chef",
    collection: "chefs",
    appLight: "#FFDAB9", // Apricot
    appDark: "#9B1B30", // Chili Red
    isAvailable: true,
    welcome: "Welcome Chef",
    motto: "Create and Share Your Culinary Masterpieces",
    smallPrint: "Expand Your Culinary Network"
  },
  recruiter: {
    doc: "recruiter",
    collection: "recruiters",
    appLight: "#87CEFA", // Sky Blue
    appDark: "#000080", // Navy Blue
    isAvailable: true,
    welcome: "Welcome Recruiter",
    motto: "Find and Place Top Talent",
    smallPrint: "Expand Your Recruiting Reach"
  }
};

export default miseboxRoles;
