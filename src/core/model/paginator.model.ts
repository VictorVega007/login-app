export interface PaginatorModel {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
