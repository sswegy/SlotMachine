## GET Transactions

### Get Transactions by User ID

**Route**: `transactions/user_id/:user_id`

**Description**: Fetches transactions associated with a user by their user ID.

**Parameters**:
- `user_id`: The ID of the user whose transactions are to be fetched.

**Response**:
- Status: 200 OK
- Body: Array of transaction objects.

## POST Transactions

### Create Transaction

**Route**: `transactions/`

**Description**: Creates a new transaction.

**Request Body**:
- `type`: Type of transaction (e.g., "withdraw", "game_fee").
- `user_id`: ID of the user associated with the transaction.
- `amount`: Amount of the transaction.

**Response**:
- Status: 200 OK
- Body: Success message indicating the transaction was successful.

