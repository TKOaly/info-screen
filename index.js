require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"]
});
require("dotenv").config();
require("./server");
