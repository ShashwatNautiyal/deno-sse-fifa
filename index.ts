import { Application, Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = new Application();
const router = new Router();

const SCORE = {
  argentina: 0,
  brazil: 0,
};

router.get("/sse", (ctx) => {
  const target = ctx.sendEvents();
  setInterval(() => {
    const random = Math.ceil(Math.random() * 1000);
    if (random % 2 === 0) {
      SCORE.argentina += 1;
    } else {
      SCORE.brazil += 1;
    }

    console.log(random, SCORE);
    target.dispatchMessage({
      argentina: SCORE.argentina,
      brazil: SCORE.brazil,
    });
  }, 1000);
});

app.use(oakCors({ origin: "*" }));
app.use(router.routes());
await app.listen({ port: 8000 });
