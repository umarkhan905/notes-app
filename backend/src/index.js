import { app } from "./app.js";
import { connectDB } from "./config/db.config.js";

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
