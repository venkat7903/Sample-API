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
    app.listen(3001, () => {
      console.log("Server is running at http://localhost:3001");
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
    response.status(401).send({ message: "Invalid Jwt Token" });
  } else {
    jwt.verify(jwtToken, "SECRET_KEY", (error, payload) => {
      if (error) {
        response.status(401).send({ message: "Invalid Jwt Token" });
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

// Admin Register API
app.post("/admin/register/", async (request, response) => {
  const { username, name, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const getAdminQuery = `
  SELECT * FROM admin WHERE username='${username}';
  `;
  const dbUser = await db.get(getAdminQuery);

  if (dbUser === undefined) {
    const createAdminQuery = `
      INSERT INTO admin (username, name, password, is_admin)
      VALUES ('${username}', '${name}', '${hashedPassword}', true);
      `;
    const dbResponse = await db.run(createAdminQuery);
    response.send({
      adminId: dbResponse.lastID,
      message: `Admin created with Id ${dbResponse.lastID}`,
    });
  } else {
    response.status(400).send({ message: "Admin Already Exists" });
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

// Admin Login API
app.post("/admin/login/", async (request, response) => {
  const { username, password } = request.body;
  const getAdminQuery = `
  SELECT * FROM admin WHERE username='${username}';
  `;
  const dbuser = await db.get(getAdminQuery);

  if (dbuser === undefined) {
    response.status(400).send({ message: "Invalid Admin" });
  } else {
    const isPasswordMatch = await bcrypt.compare(password, dbuser.password);

    if (isPasswordMatch === true) {
      const jwtToken = jwt.sign(dbuser, "SECRET_KEY");
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

// Get Product API
app.get(
  "/products/:productId",
  authenticateToken,
  async (request, response) => {
    const { productId } = request.params;
    const getProductQuery = `
    SELECT * FROM products WHERE id=${productId};
    `;
    const product = await db.get(getProductQuery);

    if (product === undefined) {
      response.send({ message: `No Such Product with Id ${productId}` });
    } else {
      response.send(product);
    }
  }
);

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

//Update product API
app.put(
  "/products/:productId/",
  authenticateToken,
  async (request, response) => {
    const { productId } = request.params;
    const selectProduct = `SELECT * FROM products WHERE id=${productId};`;
    const dbProduct = await db.get(selectProduct);
    const {
      productName = dbProduct.product_name,
      imageUrl = dbProduct.image_url,
      price = dbProduct.price,
    } = request.body;

    const updateQuery = `
      UPDATE products 
      SET 
        product_name='${productName}',
        image_url='${imageUrl}',
        price=${price}
      WHERE
        id=${productId};
`;
    await db.run(updateQuery);
    response.send({ message: "Product Details Updated Successfully" });
  }
);

// Delete Product API
app.delete(
  "/products/:productId/",
  authenticateToken,
  async (request, response) => {
    const { productId } = request.params;
    const getProductQuery = `SELECT * FROM products WHERE id=${productId};`;
    const dbProduct = await db.get(getProductQuery);

    if (dbProduct === undefined) {
      response.send({ message: "No Such Product to delete" });
    } else {
      const deleteQuery = `
      DELETE FROM products WHERE id=${productId};
      `;
      await db.run(deleteQuery);
      response.send({ message: "Product Deleted Successfully" });
    }
  }
);

// Get Users
app.get("/users/", async (request, response) => {
  const getUsersQuery = `
  SELECT * FROM user;
  `;
  const userArray = await db.all(getUsersQuery);
  response.send(userArray);
});

// Get Admins
app.get("/admins/", async (request, response) => {
  const getAdminsQuery = `
  SELECT * FROM admin;
  `;
  const adminArray = await db.all(getAdminsQuery);
  response.send(adminArray);
});

// Userprofile API
app.get("/user-profile/", authenticateToken, async (request, response) => {
  const { payload } = request;
  response.send(payload);
});

// Add products to Cart
app.post("/cart/", authenticateToken, async (request, response) => {
  const { payload } = request;
  const { productId, productName, quantity } = request.body;

  const getCartProductQuery = `
  SELECT * FROM cart
  WHERE product_id=${productId} and user_id=${payload.id};
  `;
  const product = await db.get(getCartProductQuery);

  if (product === undefined) {
    const addProductQuery = `
    INSERT INTO cart (user_id, product_id, product_name, quantity)
    VALUES (${payload.id}, ${productId}, '${productName}', ${quantity});
  `;
    const dbResponse = await db.run(addProductQuery);
    response.send({
      cartId: dbResponse.lastID,
      message: `Product is added in your cart with id ${dbResponse.lastID}`,
    });
  } else {
    const updateQuantityQuery = `
    UPDATE cart 
    SET quantity=${product.quantity + quantity}
    WHERE product_id=${productId} and user_id=${payload.id}
    `;
    await db.run(updateQuantityQuery);
    response.send({ message: "Quantity Updated" });
  }
});

// Get Cart Products
app.get("/cart/", authenticateToken, async (request, response) => {
  const { payload } = request;
  const getCartProducts = `
  SELECT * FROM cart WHERE user_id=${payload.id};
  `;
  const cartProductsArray = await db.all(getCartProducts);
  response.send(cartProductsArray);
});

// Delete Cart Products
app.delete("/cart/:id", authenticateToken, async (request, response) => {
  const { id } = request.params;
  const deleteProductQuery = `
  DELETE FROM cart 
  WHERE id=${id};
  `;
  await db.run(deleteProductQuery);
  response.send({ message: "Item deleted successfully" });
});

//update cart item quantity
app.put("/cart/:id", authenticateToken, async (request, response) => {
  const { id } = request.params;
  const selectCartProduct = `
  SELECT * FROM cart WHERE id=${id};
  `;

  const cartProduct = await db.get(selectCartProduct);

  const { quantity = cartProduct.quantity } = request.body;

  if (quantity >= 1) {
    const updateQuantityQuery = `
    UPDATE cart 
    SET 
      quantity=${quantity}
    WHERE 
      id=${id};
  `;
    await db.run(updateQuantityQuery);
    response.send({ message: "Quantity Updated" });
  } else {
    const deleteProductQuery = `
      DELETE FROM cart 
      WHERE id=${id};
  `;
    await db.run(deleteProductQuery);
    response.send({ message: "Item deleted successfully" });
  }
});
