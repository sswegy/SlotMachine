## GET Games

### Get Games by User ID

**Route**: `games/user_id/:user_id`

**Description**: Fetches games associated with a user by their user ID.

**Parameters**:
- `user_id`: The ID of the user whose games are to be fetched.

**Response**:
- Status: 200 OK
- Body: Array of game objects.

## POST Games

### Create Game

**Route**: `games/`

**Description**: Creates a new game.

**Request Body**:
- `fee`: Fee for participating in the game.
- `user_id`: ID of the user participating in the game.

**Response**:
- Status: 200 OK
- Body: An object containing information about the rows.
