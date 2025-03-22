import express, { request } from "express";
import cors from "cors";import User from "./model/User.js";
import syncTableDatabase from "./database/sync-table-database.js";
import Product from "./model/Product.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.post("/product", async (request, response) => {
  try {
    const { name, brand, description } = request.body;
    const product = await Product.create({ name, brand, description });
    return response
      .status(200)
      .json({ message: `Produto cadastrado com sucesso`, data: product });
  } catch (error) {
    return response
      .status(500)
      .json(`Não foi possível cadastrar o produto ${error.message}`);
  }
});

app.get("/products", async (request, response) => {
  try {
    const products = await Product.findAll();
    return response.status(200).json(products);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

app.delete("/product/:id", async (request, response) => {
  try {
    const ProductId = request.params.id;
    const product = await Product.destroy({ where: { id: ProductId } });
    if (!product) {
      return response.status(422).json(`Produto deletado com sucesso`);
    }
    await Product.destroy({ where: { id: ProductId } });
    return response.status(200).json(`Produto deletado com sucesso`);
  } catch (error) {
    return response
      .status(500)
      .json(`Não foi possível deletar o produto ${error.message}`);
  }
  
});

const authMiddleware = (request, response, next) => {
  try{
    const jwtToken = request.params.token;
    if (!jwtToken) {
      return response.status(401).json("Unauthorized");
    }

    jwt.verify(jwtToken, secretKey);
    next();
  } catch (error) {
  return response.status(401).json(`Unauthorized. Error: ${error.message}`);
  }
};

app.put("/product/:id", async (request, response) => {
  const productId = request.params.id;
  const productName = request.body.name;
  const product = await Product.findOne({ where: { id: productId } });
  product.set({
    name: productName,
  });
  return response.status(200).json(product);
});



const initApp = async () => {
  await syncTableDatabase();
  app.listen(port, (error) => {
    if (error) {
      console.error(`App is down: ${error}`);
    }

    console.log("App is running");
  });
};

initApp();
