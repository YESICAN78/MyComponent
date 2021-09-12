// eslint-disable-next-line import/no-anonymous-default-export
export default async (times = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, times);
  });
};
