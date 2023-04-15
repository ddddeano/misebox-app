const { defineEventHandler, readBody } = require("h3");

const handler = defineEventHandler(async (event) => {
  const mockEvent = {
    node: {
      req: {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: '{"name": "John", "age": 30}',
      },
    },
  };

  const body = await readBody(mockEvent);
  return { body };
});

(async () => {
  const event = {
    body: JSON.stringify({ hello: "world" }),
    headers: {},
    method: "POST",
    query: {},
    url: "/",
  };

  const response = await handler(event);
  console.log(response);
})();
