export interface IPaginator<R> {
    page: number;
    limit: number;
    items: R;
    count: number;
  }