// server/api/submit.post.js

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return { body };
});
