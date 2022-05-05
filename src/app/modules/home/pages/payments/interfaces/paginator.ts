export interface IPaginator<R> {
  page: number;
  limit: number;
  items: R;
  total: number;
}
