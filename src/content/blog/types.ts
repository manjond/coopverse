export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTimeMin: number;
  tags: string[];
}

export interface Post {
  meta: PostMeta;
  Content: React.ComponentType;
}
