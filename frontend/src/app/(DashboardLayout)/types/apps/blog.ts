export type Profile = {
  id?: string | number;
  user?: string;
  image?: string;
  avatar?: string;
  name?: string;
  time?: string;
};

export interface BlogType {
  id?: string;
  profile?: Profile;
  time?: Date;
  comment?: string;
  replies?: any[];
}

export interface BlogPostType {
  id?: number;
  title?: any;
  content?: string;
  coverImg?: string;
  createdAt?: Date;
  view?: number;
  share?: number;
  category?: string;
  featured?: boolean;
  author?: Profile;
  author_firstname?: string;
  comments?: any[];
}

export interface BlogPostPageType {
  count: number;
  next: string;
  previous: string;
  results: BlogPostType[];
}
