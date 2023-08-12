import express from "express";
import axios from "axios";

export const app = express();

app.get("/api/test", (_, res) => res.json({ greeting: "Hello" }));

app.get("/api/table-of-contents", async (_, res) => {
  const url = "https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json";
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (e) {
    console.log(e);
  }
});

if (!process.env["VITE"]) {
  const frontendFiles = process.cwd() + "/dist";
  app.use(express.static(frontendFiles));
  app.get("/*", (_, res) => {
    res.send(frontendFiles + "/index.html");
  });
  app.listen(process.env["PORT"]);
}
