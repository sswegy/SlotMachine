## GET Users

### Get User by ID

**Route**: `users/id/:id`

**Description**: Fetches a user by their ID.

**Parameters**:
- `id`: The ID of the user to fetch.

**Response**:
- Status: 200 OK
- Body: The user object.

### Get User by Email

**Route**: `users/email/:email`

**Description**: Fetches a user by their email address.

**Parameters**:
- `email`: The email address of the user to fetch.

**Response**:
- Status: 200 OK
- Body: The user object.

### Get User by QR Code

**Route**: `users/qr_code/:qr_code`

**Description**: Fetches a user by their QR code.

**Parameters**:
- `qr_code`: The QR code of the user to fetch.

**Response**:
- Status: 200 OK
- Body: The user object.

### Get User Password by Email

**Route**: `users/password/:email`

**Description**: Fetches the password of a user by their email address.

**Parameters**:
- `email`: The email address of the user whose password is to be fetched.

**Response**:
- Status: 200 OK
- Body: The password string.

### Get User Balance by ID

**Route**: `users/balance/:id`

**Description**: Fetches the balance of a user by their ID.

**Parameters**:
- `id`: The ID of the user whose balance is to be fetched.

**Response**:
- Status: 200 OK
- Body: The balance amount.

## POST Users

### Register User

**Route**: `users/register`

**Description**: Registers a new user.

**Request Body**:
- `first_name`: First name of the user.
- `last_name`: Last name of the user.
- `user_name`: Username of the user.
- `email`: Email address of the user.
- `password`: Password of the user.

**Response**:
- Status: 200 OK
- Body: The registered user object.

### Login User

**Route**: `users/login`

**Description**: Logs in a user.

**Request Body**:
- `email`: Email address of the user.
- `password`: Password of the user.

**Response**:
- Status: 200 OK
- Body: The logged-in user object.
