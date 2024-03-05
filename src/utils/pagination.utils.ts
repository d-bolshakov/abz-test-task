export const getPaginationOffset = (page: number, count: number) =>
  (page - 1) * count;

export const getTotalPages = (totalItems: number, count: number) =>
  Math.ceil(totalItems / count);

export const getPageNumberByOffsetAndCount = (offset: number, count: number) =>
  (offset % count) + 1;
