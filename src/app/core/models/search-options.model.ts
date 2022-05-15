type Order = "asc" | "desc";

export class SearchOptions {
  page: number = 1;
  limit: number = 5;
  order: Order = "asc";
  search: string = "";

  constructor(public sortBy: string) {}

  getQuery() {
    return `?_page=${this.page}&_limit=${this.limit}&_sort=${this.sortBy}&_order=${this.order}&q=${this.search}`;
  }
}
