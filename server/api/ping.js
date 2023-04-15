export default defineEventHandler(async (event) => {
  // Read request body
  const { data } = await readBody(event);

  // Parse JSON body
  return { data };
});
