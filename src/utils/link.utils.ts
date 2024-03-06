export const getPaginationLinks = (
  resource: string,
  page: number,
  totalPages: number,
  count: number,
) => {
  const base = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/api/v1/${resource}`;
  const next_url =
    page < totalPages ? `${base}?page=${page + 1}&count=${count}` : null;
  const prev_url = page > 1 ? `${base}?page=${page - 1}&count=${count}` : null;
  return {
    next_url,
    prev_url,
  };
};

export const getUserImageLink = (fileName: string) => {
  return `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/api/v1/images/users/${fileName}`;
};
