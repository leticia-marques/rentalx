import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
app.use(express.json());
app.use("/categories", categoriesRoutes);

app.get("/teste", (req, res) => {
	return res.json({message:"Teste"});
})

app.listen(8080, () => console.log("Pops"))
