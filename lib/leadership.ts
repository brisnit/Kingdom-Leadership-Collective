export interface Leader {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  /** Pull line shown beneath the name. */
  tagline: string;
  /** Bio paragraphs, in order. */
  bio: string[];
}

export const LEADERS: Leader[] = [
  {
    name: "Andrew Statezny",
    role: "Pastor · Leadership Mentor · Generosity Strategist",
    image: "/images/andrew-amy.jpg",
    imageAlt: "Andrew Statezny with his wife, Amy",
    tagline:
      "Helping leaders measure success not only by what they build, but by what they steward for the Kingdom.",
    bio: [
      "Andrew Statezny is a pastor, leadership mentor, and generosity strategist with more than 35 years of full-time ministry experience. Throughout his ministry, Andrew has served some of the most influential churches and Christian organizations in America, including three of the nation's ten largest ministries.",
      "For a decade, Andrew served at Life.Church as the Pastor of Partnerships, helping strengthen relationships with churches, ministries, and marketplace leaders around the world. He has also played a key role in more than 70 church mergers and strategic ministry transitions, helping congregations maximize their Kingdom impact while navigating seasons of significant change.",
      "Andrew has had the privilege of shepherding many of the country's most influential Christian business leaders, equipping them to integrate faith, leadership, generosity, and purpose into every aspect of their lives and organizations. His passion is helping leaders discover that true success is measured not only by what they build, but by what they steward for the Kingdom of God.",
      "A lifelong learner and global communicator, Andrew has traveled to all 50 U.S. states and 73 countries, partnering with churches, nonprofits, and leaders to advance the Gospel and strengthen communities around the world.",
      "Andrew and his wife, Amy, have been married for 35 years and are the proud parents of two sons who passionately love and follow Jesus. Together, they are committed to investing in the next generation of leaders who will influence business, the Church, and culture for Christ.",
    ],
  },
  {
    name: "Doug Miller",
    role: "Business Strategist · Investor · Go-to-Market",
    image: "/images/doug.jpg",
    imageAlt: "Doug Miller",
    tagline:
      "Two decades at the intersection of innovation, technology, and strategic growth — now in service of the Church.",
    bio: [
      "Doug Miller brings over 20 years of experience in sales and business development, built at the intersection of innovation, technology, and strategic growth. As an early adopter in the cryptocurrency space, he was part of the team responsible for developing one of the top three hardware wallets in the world for Bitcoin and cold storage. He has also worked directly with Fortune 100 companies to modernize their financial operations, leading the transition from legacy Excel-based systems to scalable, enterprise-grade SaaS platforms.",
      "Among his ventures, Doug co-founded and scaled an AI-driven marketing agency from inception to a multi-million-dollar operation, with deep expertise in paid search and Google's advanced advertising tools, including Performance Max and AI Max. He has spent the past decade as an active early-stage investor in pre-IPO companies, focusing on Series A and B rounds, with a strategic interest in businesses that serve the church community and advance Kingdom growth.",
      "Today, his focus is on leveraging his expertise in accounting, finance, marketing, and go-to-market strategy to empower churches and nonprofits — helping mission-driven organizations achieve sustainable growth aligned with their values.",
      "On a personal note, Doug has been married for 26 years and is the proud father of four. Outside the boardroom, he is an avid skier, snowboarder, efoiler, wakesurf enthusiast, and golfer with a passion for the outdoors.",
    ],
  },
];
