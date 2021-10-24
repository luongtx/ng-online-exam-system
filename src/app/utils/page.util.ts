export interface PageResponse {
  data: any[],
  totalPages: number,
  totalItems?: number
}

export interface PageRequest {
  page: number,
  size: number,
  pages?: number[],
  search?: string,
  sort?: string
}
