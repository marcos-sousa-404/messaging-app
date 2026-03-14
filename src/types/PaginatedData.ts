export interface PaginatedData<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
  };
}
