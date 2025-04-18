import { app } from "./app.js";
import { connectDB } from "./config/db.config.js";
import { env } from "./config/env.config.js";

const port = env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
