/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PrismaFindManyArgs {
  where?: Record<string, unknown>;
  include?: Record<string, unknown>;
  select?: Record<string, boolean | Record<string, unknown>>;
  orderBy?: Record<string, unknown> | Record<string, unknown>[];
  skip?: number;
  take?: number;
  cursor?: Record<string, unknown>;
  distinct?: string[] | string;
  [key: string]: unknown;
}
export interface PrismaCountArgs {
  where?: Record<string, unknown>;
  include?: Record<string, unknown>;
  [key: string]: unknown;
}
export interface PrismaModalDelegate {
  findMany: (args: any) => Promise<any[]>;
  count: (args: any) => Promise<number>;
}
export interface IQueryPrams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  shortBy?: string;
  shortOrder?: "asc" | "desc";
  fields?: string;
  include?: string;
  [key: string]: unknown;
}

export interface IQueryConfig {
  searchableFields?: string[];
  filterAbleFields?: string[];
}
export interface PrismaStringFilter {
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  equals?: string;
  notEquals?: string;
  mode?: "default" | "insensitive";
  in?: string[];
  notIn?: string[];
  isEmpty?: boolean;
  notEmpty?: boolean;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
}
export interface PrismaNumberFilter {
  equals?: number;
  notEquals?: number;
  in?: number[];
  notIn?: number[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  isEmpty?: boolean;
  notEmpty?: boolean;
  [key: string]: unknown;
}
export interface PrismaWereCondition {
  OR?: Record<string, unknown>[];
  AND?: Record<string, unknown>[];
  NOT?: Record<string, unknown>[];
  [key: string]: unknown;
}
export interface IQueryResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
