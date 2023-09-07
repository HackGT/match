export const getSearchParams = (searchParams: any, param: string) => {
  return searchParams.get(param)?.split(",") as string[];
};
