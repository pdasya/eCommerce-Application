export interface ICategory {
  id: string;
  caption: string;
  slug: string;
  description: string;
  ancestors: { id: string }[];
}
