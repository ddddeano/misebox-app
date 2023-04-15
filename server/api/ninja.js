export default defineEventHandler(async (event) => {
  const { ninja } = await readBody(event);

  return {
    ninja,
  };
});
