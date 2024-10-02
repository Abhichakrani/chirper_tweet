# Assignment 6 (100 Points)
## Objective:
The goal of this assignment is to help you become proficient with Mongoose by extending our application.

### Step 1: Setup NoSQL instance
- Set up a mongodb instance in the cloud using the guide [here](https://webprogrammingtoolsandframeworks.sdds.ca/NoSQL-Database-MongoDB/introduction-to-mongodb).
- Use connection string to establish a connection to the DB
- Optional :
    use `load-env` package to load environment variable from `.env` file and use `process.env.CONNECTION_STRING` to establish connection



### Step 2: Create a `User` model that will be used to store user data in the `model.js`. 
The user model should have the following properties:
- username : string
- firstName: string
- lastName: string
- email: string
- password: string
- profileImage: string
- isLoggedIn: boolean

### Step 3: Export the created user model using `module.exports`

### Step 4: Import the exported user model in `server.js`

### Step 5: Update the `POST /sign-up` endpoint to create a new record in database with properties described above.
- When receiving a request you must create a new record in the database with the following information
- Request object will contain properties in following format
     ```json
    {
        "username": "testuser",
        "firstName": "Test",
        "lastName": "User",
        "email": "test@test.com",
        "password": "123456",
        "profileImage": "https://placehold.co/300?text=T",
    }
    ```

- You must set `isLoggedIn` to `false` before storing the data in the DB.



### Step 6: Update the `POST /login` endpoint to authenticate the User
- First get the record of user that matches the username provided in the request object.
- Check the password from request object against the one stored in the database
- If the passwords match then update the  entry of the same user in the DB by setting the `isLoggedIn` to `true` and redirecting to `/home`
    - Note: redirection might not work becaus auth mmiddleware uses the local DB and is not linked with mongodb database.
- If they do not match then redirect to `/login` again.



#   c h i r p e r _ t w e e t  
 