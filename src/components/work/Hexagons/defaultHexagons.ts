import { HexCell } from './hexTypes';

// Fallback content for experience entries saved before hexagons became
// admin-editable (no `hexagons` field in the stored data yet). Keeps the
// live site rendering exactly what it did before, until an admin opens
// the Work tab and saves — at which point the real data takes over.
export const DEFAULT_MOATABLE_HEXAGONS: HexCell[] = [
  {
    id: 'moatable-my-role',
    label: 'My Role',
    bgColor: '#F7F8FD',
    textColor: '#356D9B',
    tooltip: 'View my role',
    popupTitle: 'Moatable | My Role',
    popupContentHtml:
      '<p>Responsible for frontend development across multiple projects in the Lofty ecosystem, including Lofty and the Billing System</p><p>Worked with a range of frontend tools and libraries such as React, Vue, Material UI, Vite, Webpack, and more.</p><p>In addition to feature development, contributed to various enhancements and performance optimizations:<ul><li>Improved React application performance by applying best practices.</li><li>Boosted project quality and team collaboration by establishing coding standards and maintaining technical documentation.</li></ul></p>',
  },
  {
    id: 'moatable-moatable',
    label: 'Moatable',
    bgColor: '#0167C4',
    textColor: '#FFFFFF',
    tooltip: 'View Moatable information',
    popupTitle: 'Moatable | Information',
    popupContentHtml:
      "<p>Original name of Moatable is Renren Inc. It changed its name to Moatable on June 22, 2023.</p><p>Over the course of the last decade, Renren sold off its SNS business, divested its used car business, and shifted its business focus to a vertical SaaS model serving B2B customers. The Company's rebranding reflects its business model change from B2C internet to vertical B2B SaaS.</p>",
  },
  {
    id: 'moatable-logo',
    label: 'Moatable',
    bgColor: '',
    textColor: '',
    imageUrl: './work/moatable.jpeg',
    link: 'https://moatable.com/',
    tooltip: 'Visit Official Website',
  },
  {
    id: 'moatable-billing-system',
    label: 'Billing System',
    bgColor: '#356D9B',
    textColor: '#FFFFFF',
    tooltip: 'View Project Details',
    popupTitle: 'Moatable | Billing System',
    popupContentHtml:
      '<p>The Billing System is an internal tool that helps the sales team manage Lofty’s subscriptions.</p><p>Tech stack: <ul><li>Cloud-based infrastructure: Amazon Web Services (AWS) </li><li>Database: MySQL</li><li>Back end frameworks: Java Spring Boot.</li><li>Front end libraries: Vue, Webpack, Chime UI.</li><li>Design tool: Figma.</li><li>Tools: Gitlab, Jira.</li><li>Methodologies: Agile Scrum.</li></ul></p>',
  },
  {
    id: 'moatable-payment-sdk',
    label: 'Payment SDK',
    bgColor: '#F7F8FD',
    textColor: '#356D9B',
    tooltip: 'View Project Details',
    popupTitle: 'Moatable | Payment SDK',
    popupContentHtml:
      'The Payment SDK is a JavaScript library that enables consumer applications (such as Lofty) to integrate with the Billing service. It provides a set of APIs to manage the card binding process via a secure iframe.<p>Technical details: <ul><li>After initialization, the SDK renders an iframe containing a form that allows users to bind their card information to the Billing System.</li><li>Internally, the SDK uses various APIs from supported payment gateways, such as NP and Stripe.</li></ul></p>',
  },
  {
    id: 'moatable-lofty-crm',
    label: 'Lofty CRM',
    bgColor: '#3b5cde',
    textColor: '#FFFFFF',
    tooltip: 'View Project Details',
    popupTitle: 'Moatable | Lofty CRM',
    popupContentHtml:
      '<p>Lofty CRM is an all-in-one real estate platform that helps agents manage leads, automate marketing, and grow their business with AI-powered tools. Formerly known as Chime, it combines CRM, IDX websites, communication, and analytics into a single system.</p><p>Tech stack: <ul><li>Cloud-based infrastructure: Amazon Web Services (AWS) </li><li>Database: MySQL</li><li>Back end frameworks: Java Spring Boot.</li><li>Front end libraries: React, Vite, Material Design.</li><li>Design tool: Figma.</li><li>Tools: Github, Jira.</li><li>Methodologies: Agile Scrum.</li></ul></p>',
  },
];

export const DEFAULT_SALESHOOD_HEXAGONS: HexCell[] = [
  {
    id: 'saleshood-my-role',
    label: 'My Role',
    bgColor: '#1A569A',
    textColor: '#FFFFFF',
    tooltip: 'View my role',
    popupTitle: 'SalesHood | My Role',
    popupContentHtml:
      '<p>Focusing on Frontend development, get hands-on experience on: Typescript, React, Redux, React Query, Axios, Ant Design, Storybook, Jest, Testing Library, Playwright, Figma.</p><p>Developed and maintained Client Sites - a micro frontend project, optimized performance using code splitting, lazy loading, reducing bundle size and improving page load time.</p><p>Contribute to UI kit development.</p>',
  },
  {
    id: 'saleshood-tech',
    label: 'Tech Stack',
    bgColor: '#356D9B',
    textColor: '#FFFFFF',
    tooltip: 'View tech-stack of the product',
    popupTitle: 'SalesHood | Tech Stacks',
    popupContentHtml:
      '<ul><li>Cloud-based infrastructure: Amazon Web Services (AWS) </li><li>Database: MySQL</li><li>Back end frameworks: Ruby on Rails, Hanami (Ruby language).</li><li>Front end libraries: React, Redux, React Query, Ant Design.</li><li>Design tool: Figma.</li><li>Development environments: Docker, Nix.</li><li>Tools: Bitbucket, Jira, Jenkins.</li><li>Methodologies: Agile Scrum.</li></ul>',
  },
  {
    id: 'saleshood-logo',
    label: 'SalesHood',
    bgColor: '',
    textColor: '',
    imageUrl: './work/shlogo.png',
    link: 'https://www.saleshood.com/',
  },
  {
    id: 'saleshood-client-sites',
    label: 'Client Sites',
    bgColor: '#F7F8FD',
    textColor: '#356D9B',
    tooltip: 'View Client Sites functionalities',
    popupTitle: 'SalesHood | Client Sites',
    popupContentHtml:
      '<p>Client Sites in one of the primary features in SalesHood product, which enhances sales performance by working as digital sales rooms.</p><ul><li>Sell how buyers want to buy. </li><li>Empower your sellers to create Digital Sales Rooms, complete with mutual plans, call notes, and AI content recommendations.</li> <li>Report on which buyers are engaged and how much pipeline is influenced. </li></ul>',
  },
  {
    id: 'saleshood-saleshood',
    label: 'SalesHood',
    bgColor: '#5CD3A0',
    textColor: '#FFFFFF',
    tooltip: 'View SalesHood information',
    popupTitle: 'SalesHood | Information',
    popupContentHtml:
      '<p>SalesHood was founded in May 2013 by Elay Cohen and Arthur Do. The company is based in San Francisco, California</p><p></p><p>SalesHood platform includes these main features: </p><p><strong>Sales Content:</strong> Organize sales content in one place and measure revenue impact.</p><p><strong>Client Site-Digital Sales Rooms:</strong> Empower sellers to create Digital Sales Rooms, complete with mutual plans, and AI content recommendations</p><p><strong>Coaching:</strong> Scale pitch practice and messaging alignment with AI-powered video role-playing.</p><p><strong>Training:</strong> Create personalized Learning Paths for onboarding and ongoing training.</p>',
  },
];

export function getDefaultHexagonsByCompany(company: string): HexCell[] {
  if (company === 'Moatable') {
    return DEFAULT_MOATABLE_HEXAGONS;
  }
  if (company === 'SalesHood') {
    return DEFAULT_SALESHOOD_HEXAGONS;
  }
  return [];
}
