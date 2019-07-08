# DripDash API

🔒 - Indicates the API requires the HTTP token header to be set.  

## Authentication
Authentication exchanges the username and password for an token, that is
set as a HTTP header for all other transactions.

### `/api/auth/request/`
Type: POST  
Body: `{ username: xxx, password: xxx }` (JSON)  
Response: The generated token (string)

## Devices

### `/api/devices/`
Type: GET  
Response: List of device objects

### `/api/devices/[id]/`
Where `[id]` is the device ID  
Type: GET  
Response: The device object.

### `/api/devices/[id]/rename/`
Where `[id]` is the device ID  
Type: POST
Body: `{ name: xxx }` (JSON)

## Private

A development-only endpoint for checking authentication status.
`TODO: REMOVE THIS`

### `/api/private/`
Response: "Secret Stuff!" if the auth header is set correctly.
