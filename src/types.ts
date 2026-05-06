export interface Notice {
  id: string;
  title: string;
  date: string;
  isNew: boolean;
  type: string;
}

export interface Leader {
  id: string;
  role: string;
  name: string;
  title: string;
  image: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  date: string;
  author?: string;
  image?: string;
}

export interface SiteContent {
  siteTitle: string;
  siteSubtitle: string;
  logoText: string;
  aboutText: string;
  contactEmail: string;
  notices: Notice[];
  newsText: string;
  latestNews: string[];
  leaders: Leader[];
  newsArticles?: NewsArticle[];
  heroImage?: string;
}
