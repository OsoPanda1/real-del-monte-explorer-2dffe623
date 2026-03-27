// ============================================================================
// RDM Digital OS — Pagination Service
// Estandarización de contrato de paginación para todas las APIs
// ============================================================================

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Paginate an in-memory array with sorting support.
 * For use with the in-memory store while Prisma is not connected.
 */
export function paginateArray<T>(
  items: T[],
  params: PaginationParams = {},
  sortFn?: (a: T, b: T) => number,
): PaginatedResult<T> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));

  let sorted = [...items];
  if (sortFn) {
    sorted.sort(sortFn);
  }

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const offset = (page - 1) * pageSize;
  const data = sorted.slice(offset, offset + pageSize);

  return { data, page, pageSize, totalItems, totalPages };
}

/**
 * Extract pagination params from Express query object.
 */
export function extractPaginationParams(query: Record<string, unknown>): PaginationParams {
  return {
    page: typeof query.page === "string" ? Math.max(1, parseInt(query.page, 10) || 1) : 1,
    pageSize: typeof query.pageSize === "string" ? Math.min(100, Math.max(1, parseInt(query.pageSize, 10) || 20)) : 20,
    sortBy: typeof query.sortBy === "string" ? query.sortBy : undefined,
    sortDir: query.sortDir === "desc" ? "desc" : "asc",
  };
}
