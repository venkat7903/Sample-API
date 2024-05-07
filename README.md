# Steps to setup project

Clone this repo in your IDE using commad git clone https://github.com/venkat7903/Sample-API.git

First run **npm install** to install necessary dependencies in package.json file.

Run **nodemon index.js** to start the server

The server will start running at **localhost:3001**

# API URL
https://sample-api-jv77.onrender.com/

<Section id="section1" >
  
### API 1

#### Path: `/register/`

#### Method: `POST`

**Request**

```
{
    "username": "raj",
    "name": "raj",
    "password": "1234"
}
```

- **Scenario 1**

  - **Description**:

    If the username already exists

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      {
        "message": "User Already Exists"
      }
      ```
      
- **Scenario 2**

  - **Description**:

    Successful registration of the registrant

  - **Response**

    - **Status code**

      ```
      200
      ```

    - **Body**
      ```
      {
        "message": "User Created Successfully",
        "userId": 4
      }
      ```

</Section>

<Section id="section2" >
  
### API 2

#### Path: `/admin/register/`

#### Method: `POST`

**Request**

```
{
    "username": "admin",
    "name": "administrator",
    "password": "admin1234"
}
```

- **Scenario 1**

  - **Description**:

    If the username already exists

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      {
        "message": "Admin Already Exists"
      }
      ```
      
- **Scenario 2**

  - **Description**:

    Successful registration of the registrant

  - **Response**

    - **Status code**

      ```
      200
      ```

    - **Body**
      ```
      {
        "adminId": 4,
        "message": "Admin created with Id 4"
      }
      ```

</Section>

<Section id="section3">

### API 3

#### Path: `/login/`

#### Method: `POST`

**Request**

```
{
    "username": "raj",
    "password": "1234"
}
```

- **Scenario 1**

  - **Description**:

    If the user doesn't have a account

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      {
        "message": "Invalid User"
      }
      ```

- **Scenario 2**

  - **Description**:

    If the user provides an incorrect password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      {
        "message": "Invalid Password"
      }
      ```

- **Scenario 3**

  - **Description**:

    Successful login of the user

  - **Response**

    Return the JWT Token

    ```
    {
      "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyYWoiLCJuYW1lIjoicmFqIiwicGFzc3dvcmQiOiIkMmIkMTAkQjdMUkliOW9pQjREa00ueU0xOGJxLjRObnU2L3d5ak5mLlFyWEhtREdqRUdTb1BlNUUySEc",
      "message": "Login Successful"
    }
    ```

</Section>


<Section id="section4">

### API 4

#### Path: `/admin/login/`

#### Method: `POST`

**Request**

```
{
    "username": "admin",
    "password": "admin1234"
}
```

- **Scenario 1**

  - **Description**:

    If the admin doesn't have a account

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      {
        "message": "Invalid Admin"
      }
      ```

- **Scenario 2**

  - **Description**:

    If the admin provides an incorrect password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      {
        "message": "Invalid Password"
      }
      ```

- **Scenario 3**

  - **Description**:

    Successful login of the admin

  - **Response**

    Return the JWT Token

    ```
    {
      "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyYWoiLCJuYW1lIjoicmFqIiwicGFzc3dvcmQiOiIkMmIkMTAkQjdMUkliOW9pQjREa00ueU0xOGJxLjRObnU2L3d5ak5mLlFyWEhtREdqRUdTb1BlNUUySEc",
      "message": "Login Successful"
    }
    ```

</Section>


<Section id="section5">

### API 5

#### Path: `/products/`

#### Method: `GET`

- **Description**:

    Gives the list of products

- **Response**

  ```
  [
  {
    "id": 1,
    "product_name": "shirt",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZKMY8sbBdqhf2kE1swSJQla9C212DZtbTSFcYg1_4hA&s",
    "price": 200
  },
  .....
  ]
  ```

  
</Section>

<Section id="section6">

### API 6

#### Path: `/products?orderBy=price&order=DESC`

#### Method: `GET`

- **Description**:

    Gives the list of filtered products

- **Response**

  ```
  [
  {
    "id": 4,
    "product_name": "Pant",
    "image_url": "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "price": 500
  },
  .....
  ]
  ```

  
</Section>


<Section id="section7">

### API 7

#### Path: `/products/:productId`

#### Method: `GET`

- **Description**:

    Gives the details of the product

- **Response**

  ```
  [
  {
    "id": 4,
    "product_name": "Pant",
    "image_url": "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "price": 500
  } 
  .....
  ]
  ```

  
</Section><Section id="section8">

### API 8

#### Path: `/products/`

#### Method: `POST`

**Request**
  ```
    {
      "productName": "Clips",
      "imageUrl": "https://5.imimg.com/data5/PK/QK/GY/SELLER-81178992/snap-hair-clips-500x500.jpg",
      "price": 10
   }
  ```

- **Description**:

    Add the product

- **Response**

  ```
  {
    "productId": 12,
    "message": "Product is added successfully with productId 12"
  }
  ```

  
</Section>

</Section><Section id="section9">

### API 9

#### Path: `/products/:productId/`

#### Method: `PUT`

**Request**
  ```
    {
      "productName": "Hair Clip"
    }
  ```

- **Description**:

    Update the product

- **Response**

  ```
  {
    "message": "Product Details Updated Successfully"
  }
  ```

  
</Section>

<Section id="section10">

### API 10

#### Path: `/products/:productId/`

#### Method: `DELETE`

- **Description**:

    Delete the product

- **Response**

  ```
  {
    "message": "Product Deleted Successfully"
  }
  ```

  
</Section>


<Section id="section11">

### API 11

#### Path: `/users/`

#### Method: `GET`

- **Description**:
    Get the list of users

- **Response**

  ```
  [
  {
    "id": 1,
    "username": "ram",
    "name": "raj",
    "password": "$2b$10$B7LRIb9oiB4DkM.yM18bq.4Nnu6/wyjNf.QrXHmDGjEGSoPe5E2HG",
  },
  ...
  ]
  ```
  
</Section>

<Section id="section12">

### API 12

#### Path: `/admins/`

#### Method: `GET`

- **Description**:
    Get the list of admins

- **Response**

  ```
  [
  {
    "id": 1,
    "username": "admin",
    "name": "administrator",
    "password": "$2b$10$wQp5hSJxWxQJqTquPUs4z.xXQLcea/gLJgATDh4Sz2NHlqolExiHW",
    "is_admin": 1
  },
  ...
  ]
  ```
  
</Section>

<Section id="section13">

### API 13

#### Path: `/user-profile/`

#### Method: `GET`

- **Description**:
    Get the Details of the current login user

- **Response**

  ```
  {
    "id": 2,
    "username": "raj",
    "name": "raj",
    "password": "$2b$10$B7LRIb9oiB4DkM.yM18bq.4Nnu6/wyjNf.QrXHmDGjEGSoPe5E2HG",
    "iat": 1711980669
  }
  ```
  
</Section>


<Section id="section14">

### API 14

#### Path: `/cart/`

#### Method: `GET`

- **Description**:
    Get the list of cart products

- **Response**

  ```
  [
  {
    "id": 3,
    "user_id": 2,
    "product_id": 2,
    "product_name": "pant",
    "quantity": 1,
    "image_url": null,
    "price": null
  },
  ....
  ]
  ```
  
</Section>

<Section id="section15">

### API 15

#### Path: `/cart/`

#### Method: `POST`

**Request**:
```
  {
    "productId": 1,
    "productName": "pant",
    "quantity": 1,
    "imageUrl": "https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "price": 100
 }
```
 - **Scenario 1**

    - **Description**:
      
        Add Products to Cart
      
    - **Response**

          ```
          {
            "cartId": 7,
            "message": "Product is added in your cart with id 7"
          }
          ```
  - **Scenario 2**

      - **Description**:
          If the product already exists
        
      - **Response**

          ```
          {
            "message": "Quantity Updated"
          }
          ```
  
</Section>


<Section id="section16">

### API 16

#### Path: `/cart/:cartId`

#### Method: `PUT`

**Request**:
```
  {
    "quantity": 1000
  }
```
 
- **Description**:
    Update the cart product quanity
  
- **Response**

    ```
    {
      "message": "Quantity Updated"
    }
    ```
  
</Section>

<Section id="section17">

### API 17

#### Path: `/cart/:cartId`

#### Method: `DELETE`
 
- **Description**:
    Delete the cart product
  
- **Response**

    ```
    {
      "message": "Item deleted successfully"
    }
    ```
  
</Section>


# Technologies Used

Node

Express

sqlite 

sqlite3

# React Packages Used

**bcrypt** for encrypting and decrypting the password

**cors** for deploying the website in render

**jsonwebtoken** to generate and verify the JWT token

**sqlite3** to access database throught Command Line

# Description

**Backend Development**:
Used Node.js and Express.js for server-side operations.

**Admin Panel:** Created APIS for admin panel for managing products.

**Deployment:** Hosted the website on **Render** platform.

