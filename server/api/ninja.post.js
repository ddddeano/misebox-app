export default defineEventHandler(async (event) => {
  const { message } = await readBody(event);

  // Process the message as needed here
  // ...

  return { message };
});
