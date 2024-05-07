# Steps to setup project

Clone this repo in your IDE using commad git clone https://github.com/venkat7903/Sample-API.git

First run npm install to install necessary dependencies in package.json file.

Run **nodemon index.js** to start the server

The server will start running at localhost:3001

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
