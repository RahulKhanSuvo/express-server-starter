import {
  IQueryConfig,
  IQueryPrams,
  IQueryResult,
  PrismaCountArgs,
  PrismaFindManyArgs,
  PrismaModalDelegate,
  PrismaNumberFilter,
  PrismaStringFilter,
  PrismaWereCondition,
} from "../interfaces/query.interface";

export class QueryBuilder<
  T,
  TWhereInput = Record<string, unknown>,
  TInclude = Record<string, unknown>,
> {
  private query: PrismaFindManyArgs;
  private countQuery: PrismaCountArgs;
  private page: number = 1;
  private limit: number = 10;
  private skip: number = 0;
  private shortBy: string = "createdAt";
  private shortOrder: string = "desc";
  private searchTerm: string = "";
  private selectField: Record<string, boolean | Record<string, unknown>> = {};

  constructor(
    private modal: PrismaModalDelegate,
    private queryParams: IQueryPrams,
    private config: IQueryConfig,
  ) {
    this.query = {
      where: {},
      orderBy: {},
      skip: 0,
      take: 10,
    };
    this.countQuery = {
      where: {},
    };
  }
  search(): this {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchCondition: Record<string, unknown>[] = searchableFields.map(
        (field) => {
          if (field.includes(".")) {
            const parts = field.split(".");
            if (parts.length == 2) {
              const [relation, fieldName] = parts;
              const searchFilter: PrismaStringFilter = {
                contains: searchTerm,
                mode: "insensitive",
              };
              return {
                [relation]: {
                  [fieldName]: searchFilter,
                },
              };
            } else if (parts.length == 3) {
              const [relation1, relation2, fieldName] = parts;
              return {
                [relation1]: {
                  some: {
                    [relation2]: {
                      [fieldName]: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              };
            }
          }
          const searchFilter: PrismaStringFilter = {
            contains: searchTerm,
            mode: "insensitive",
          };
          return {
            [field]: searchFilter,
          };
        },
      );
      const whereConditions = this.query.where as PrismaWereCondition;
      whereConditions.OR = [...searchCondition];
      const countWhereConditions = this.countQuery.where as PrismaWereCondition;
      countWhereConditions.OR = [...searchCondition];
    }
    return this;
  }
  filter(): this {
    const { filterAbleFields } = this.config;
    const exclude = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "select",
      "includes",
    ];
    const filterParams: Record<string, unknown> = {};
    Object.keys(this.queryParams).forEach((key) => {
      if (!exclude.includes(key)) {
        filterParams[key] = this.queryParams[key];
      }
    });
    const queryWhere = this.query.where as Record<string, unknown>;
    const countWhere = this.countQuery.where as Record<string, unknown>;
    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];
      if (value === undefined || value === "") {
        return;
      }
      const isAllowedField =
        !filterAbleFields ||
        filterAbleFields.includes(key) ||
        filterAbleFields.length == 0;
      if (!isAllowedField) {
        return;
      }
      if (key.includes(".")) {
        const parts = key.split(".");
        if (filterAbleFields && !filterAbleFields.includes(key)) {
          return;
        }
        if (parts.length == 2) {
          const [relation, fieldName] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {};
            countWhere[relation] = {};
          }
          queryWhere[relation] = {
            [fieldName]: this.parseFilterValue(value),
          };
          countWhere[relation] = {
            [fieldName]: this.parseFilterValue(value),
          };
        }
        if (parts.length == 3) {
          const [relation1, relation2, fieldName] = parts;
          if (!queryWhere[relation1]) {
            queryWhere[relation1] = {};
            countWhere[relation1] = {};
          }
          queryWhere[relation1] = {
            some: {
              [relation2]: {
                [fieldName]: this.parseFilterValue(value),
              },
            },
          };
          countWhere[relation1] = {
            some: {
              [relation2]: {
                [fieldName]: this.parseFilterValue(value),
              },
            },
          };
        }
      } else {
        queryWhere[key] = this.parseFilterValue(value);
        countWhere[key] = this.parseFilterValue(value);
        return;
      }
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        queryWhere[key] = this.parseRangeFilter(
          value as Record<string, string | number>,
        );
        countWhere[key] = this.parseRangeFilter(
          value as Record<string, string | number>,
        );
        return;
      }
      queryWhere[key] = this.parseFilterValue(value);
      countWhere[key] = this.parseFilterValue(value);
    });
    return this;
  }
  paginate(): this {
    const page = Number(this.queryParams.page || 1);
    const limit = Number(this.queryParams.limit || 10);
    this.page = page;
    this.limit = limit;
    this.skip = (page - 1) * limit;
    this.query.take = limit;
    this.query.skip = this.skip;
    return this;
  }
  sort(): this {
    const sortBy = this.queryParams.shortBy || "createdAt";
    const sortOrder = this.queryParams.sortOrder === "asc" ? "asc" : "desc";
    this.shortBy = sortBy;
    this.shortOrder = sortOrder;
    // doctor?sortBy=user.name&shortOrder=asc =>
    // ["user", "name"] => { user: { name: "asc" } }
    const parts = sortBy.split(".");
    if (parts.length > 1) {
      if (parts.length == 2) {
        const [relation, fieldName] = parts;
        this.query.orderBy = {
          [relation]: {
            [fieldName]: sortOrder,
          },
        };
        this.countQuery.orderBy = {
          [relation]: {
            [fieldName]: sortOrder,
          },
        };
      }
      if (parts.length == 3) {
        const [relation1, relation2, fieldName] = parts;
        this.query.orderBy = {
          [relation1]: {
            some: {
              [relation2]: {
                [fieldName]: sortOrder,
              },
            },
          },
        };
        this.countQuery.orderBy = {
          [relation1]: {
            some: {
              [relation2]: {
                [fieldName]: sortOrder,
              },
            },
          },
        };
      }
    } else {
      this.query.orderBy = {
        [sortBy]: sortOrder,
      };
      this.countQuery.orderBy = {
        [sortBy]: sortOrder,
      };
    }
    return this;
  }
  fields(): this {
    const fieldsParams = this.queryParams.fields;
    const fieldsArray = fieldsParams?.split(",").map((field) => field.trim());
    fieldsArray?.forEach((field) => {
      if (this.selectField) {
        this.selectField[field] = true;
      }
    });

    if (Object.keys(this.selectField).length > 0) {
      this.query.select = this.selectField;
      // When select is used, include must be removed
      delete this.query.include;
    }

    return this;
  }
  include(relation: TInclude): this {
    if (this.query.select && Object.keys(this.query.select).length > 0) {
      return this;
    }
    this.query.include = {
      ...(this.query.include as Record<string, unknown>),
      ...(relation as Record<string, unknown>),
    };
    return this;
  }
  dynamicInclude(
    includesConfig: Record<string, unknown>,
    defaultIncludes?: string[],
  ): this {
    if (this.query.select && Object.keys(this.query.select).length > 0) {
      return this;
    }
    const result: Record<string, unknown> = {};
    defaultIncludes?.forEach((field) => {
      if (includesConfig[field]) {
        result[field] = includesConfig[field];
      }
    });
    const includeParam = this.queryParams.includes as string | undefined;
    if (includeParam && typeof includeParam === "string") {
      const requestRelation = includeParam.split(",").map((rel) => rel.trim());
      requestRelation.forEach((relation) => {
        if (includesConfig[relation]) {
          result[relation] = includesConfig[relation];
        }
      });
    }
    this.query.include = {
      ...(this.query.include as Record<string, unknown>),
      ...result,
    };
    return this;
  }
  where(conditions: TWhereInput): this {
    this.query.where = this.deepMerge(
      (this.query.where as Record<string, unknown>) || {},
      conditions as Record<string, unknown>,
    );
    this.countQuery.where = this.deepMerge(
      (this.countQuery.where as Record<string, unknown>) || {},
      conditions as Record<string, unknown>,
    );
    return this;
  }
  async execute(): Promise<IQueryResult<T>> {
    const [total, data] = await Promise.all([
      this.modal.count(
        this.countQuery as Parameters<typeof this.modal.count>[0],
      ),
      this.modal.findMany(
        this.query as Parameters<typeof this.modal.findMany>[0],
      ),
    ]);
    const totalPages = Math.ceil(total / this.limit);
    return {
      data: data as T[],
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages,
      },
    };
  }
  async count(): Promise<number> {
    const total = await this.modal.count(
      this.countQuery as Parameters<typeof this.modal.count>[0],
    );
    return total;
  }
  getQuery(): PrismaFindManyArgs {
    return this.query;
  }
  getCountQuery(): PrismaFindManyArgs {
    return this.countQuery;
  }
  private deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    const result = { ...target };
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (
          result[key] &&
          typeof result[key] === "object" &&
          !Array.isArray(result[key])
        ) {
          result[key] = this.deepMerge(
            result[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  private parseFilterValue(value: unknown): unknown {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }

    if (typeof value === "string" && !isNaN(Number(value)) && value != "") {
      return Number(value);
    }

    if (Array.isArray(value)) {
      return { in: value.map((item) => this.parseFilterValue(item)) };
    }

    return value;
  }
  private parseRangeFilter(
    value: Record<string, string | number>,
  ): PrismaNumberFilter | PrismaStringFilter | Record<string, unknown> {
    const rangeQuery: Record<string, string | number | (string | number)[]> =
      {};

    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];

      const parsedValue: string | number =
        typeof operatorValue === "string" && !isNaN(Number(operatorValue))
          ? Number(operatorValue)
          : operatorValue;

      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith":
          rangeQuery[operator] = parsedValue;
          break;

        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            rangeQuery[operator] = [parsedValue];
          }
          break;
        default:
          break;
      }
    });

    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
}
