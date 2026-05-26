import "dotenv/config";
import { app } from "./app.js";
import { connectMongoDB } from "./config/db.js";

const PORT = Number(process.env.PORT) || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`✅ Server is running at PORT ${PORT}`);
});
