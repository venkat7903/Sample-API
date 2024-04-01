const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { request } = require("http");

const app = express();

app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "sample.db");
let db = null;

const initiateDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initiateDBAndServer();

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];

  let jwtToken;

  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }

  if (jwtToken === undefined) {
    response.status(401).send("Invalid Jwt Token");
  } else {
    jwt.verify(jwtToken, "SECRET_KEY", (error, payload) => {
      if (error) {
        response.status(401).send("Invalid Jwt Token");
      } else {
        request.payload = payload;
        next();
      }
    });
  }
};

// Register API
app.post("/register/", async (request, response) => {
  const { username, name, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const getUserQuery = `
  SELECT * FROM user WHERE username='${username}';
  `;
  const dbUser = await db.get(getUserQuery);

  if (dbUser === undefined) {
    const createUserQuery = `
    INSERT INTO user (username, name, password)
    VALUES ('${username}', '${name}', '${hashedPassword}');
    `;
    const dbResponse = await db.run(createUserQuery);
    response.send({
      message: "User Created Successfully",
      userId: dbResponse.lastID,
    });
  } else {
    response.status(400);
    response.send({ message: "User Already Exists" });
  }
});

// Login API
app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const getUserQuery = `SELECT * FROM user WHERE username='${username}';`;
  const dbUser = await db.get(getUserQuery);

  if (dbUser === undefined) {
    response.status(400);
    response.send({ message: "Invalid User" });
  } else {
    const isPasswordMatch = await bcrypt.compare(password, dbUser.password);

    if (isPasswordMatch === true) {
      const jwtToken = jwt.sign(dbUser, "SECRET_KEY");
      response.send({ jwtToken, message: "Login Successful" });
    } else {
      response.status(400).send({ message: "Invalid Password" });
    }
  }
});

// Get products API
app.get("/products/", authenticateToken, async (request, response) => {
  const { search_q = "", order = "ASC", orderBy = "id" } = request.query;
  const getProductsQuery = `
  SELECT * FROM products WHERE product_name LIKE '%${search_q}%' ORDER BY ${orderBy} ${order};'
  `;
  const productsArray = await db.all(getProductsQuery);
  response.send(productsArray);
});

// Add products API
app.post("/products/", authenticateToken, async (request, response) => {
  const { productName, imageUrl, price } = request.body;
  const addProductQuery = `
  INSERT INTO products (product_name, image_url, price)
  VALUES ('${productName}', '${imageUrl}', ${price});
  `;
  const dbResponse = await db.run(addProductQuery);
  response.send({
    productId: dbResponse.lastID,
    message: `Product is added successfully with productId ${dbResponse.lastID}`,
  });
});
