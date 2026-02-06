const dotenv = require("dotenv");
const app = require("./app.js");
const connectDb = require("./config/db.js");
const User = require("./models/users.js");

dotenv.config();
connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
