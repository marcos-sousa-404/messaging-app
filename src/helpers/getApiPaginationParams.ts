import type { InfiniteQueryFnParams } from '@/types/InfiniteQueryFnParams.ts';

const getApiPaginationParams = (
  infiniteQueryFnParams: InfiniteQueryFnParams & {
    limit?: number;
  },
) => ({ page: infiniteQueryFnParams.pageParam, limit: infiniteQueryFnParams.limit ?? 15 });

export default getApiPaginationParams;
