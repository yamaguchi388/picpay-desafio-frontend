export interface IFilters {
  page: number;
  limit: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";

  username?: string;
  name?: string;
  title?: string;
  date?: string;
  value?: number;
  isPayed?: string;
}

export interface ISearchFilters {
  searchString: string | boolean;
  searchField: string;
}
