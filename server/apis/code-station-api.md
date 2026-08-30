# Code Station API Documentation

Covers the Auth API (`/api/auth`) and User Profile API (`/api/users`).

Authentication is handled via a `CODE_STATION_TOKEN` httpOnly cookie, issued on register/login. Protected endpoints require a valid, non-blacklisted token; requests without one receive `401 Unauthorized`.

---

# Auth API

Base URL: `/api/auth`

---

## POST /register

Register a new user account. Identifier must be a valid email (username-based registration is not supported).

**Auth required:** No

### Request Body

| Field      | Type   | Required | Notes                                |
|------------|--------|----------|----------------------------------------|
| `identifier` | string | Yes    | Must be a valid email address          |
| `password` | string | Yes      |                                         |
| `role`     | string | No       | `"student"` (default) or `"instructor"` |

```json
{
  "identifier": "test2@gmail.com",
  "password": "Secret123",
  "role": "student"
}
```

### Responses

**201 Created**
```json
{
  "message": "user created successfully",
  "new_user": {
    "_id": "6a93898638405be7ee28d8b5",
    "email": "test2@gmail.com",
    "role": "student",
    "...": "..."
  }
}
```
Also sets the `CODE_STATION_TOKEN` auth cookie.

**400 Bad Request** — identifier is not a valid email
```json
{
  "message": "valid email is required to register"
}
```

**400 Bad Request** — missing credentials (from validation middleware)
```json
{
  "message": "credentials can't be empty"
}
```

**409 Conflict** — email already registered
```json
{
  "message": "user is already registered"
}
```

**500 Internal Server Error**
```json
{
  "message": "something went wrong",
  "error": "<error message>"
}
```

---

## POST /login

Log in with either an email or a username, plus a password.

**Auth required:** No

### Request Body

| Field        | Type   | Required | Notes                          |
|--------------|--------|----------|---------------------------------|
| `identifier` | string | Yes      | Email or username               |
| `password`   | string | Yes      |                                  |

```json
{
  "identifier": "test2@gmail.com",
  "password": "Secret123"
}
```

### Responses

**200 OK**
```json
{
  "message": "user login successful"
}
```
Also sets the `CODE_STATION_TOKEN` auth cookie.

**400 Bad Request** — missing credentials
```json
{
  "message": "credentials can't be empty"
}
```

**401 Unauthorized** — no matching user
```json
{
  "message": "no user found"
}
```

**401 Unauthorized** — wrong password
```json
{
  "message": "wrong password encountered"
}
```

**500 Internal Server Error**
```json
{
  "message": "something went wrong in user login",
  "error": "<error message>"
}
```

---

## POST /logout

Log out the current session: blacklists the token's `jti` so it can no longer be used, and clears the auth cookie.

**Auth required:** Yes

### Request

No body required.

### Responses

**200 OK**
```json
{
  "message": "user logout successful"
}
```

**500 Internal Server Error**
```json
{
  "message": "something went wrong in user logout",
  "error": "<error message>"
}
```

---

# User Profile API

Base URL: `/api/users`

All endpoints below require authentication via the `CODE_STATION_TOKEN` httpOnly cookie, set at login. Requests without a valid, non-blacklisted token receive `401 Unauthorized`.

---

## GET /me

Fetch the authenticated user's own profile.

**Auth required:** Yes

### Request

No body or params required. User is identified via the verified token (`req.user.id`).

### Responses

**200 OK**
```json
{
  "message": "user profile found successfully",
  "user_profile": {
    "_id": "6a93898638405be7ee28d8b5",
    "email": "test2@gmail.com",
    "first_name": "",
    "last_name": "",
    "bio": "",
    "role": "student",
    "profile_img": "",
    "cover_img": "",
    "isActive": true,
    "createdAt": "2026-08-30T01:38:14.682Z",
    "updatedAt": "2026-08-30T01:38:14.682Z",
    "__v": 0
  }
}
```

**404 Not Found**
```json
{
  "message": "user not found"
}
```

**500 Internal Server Error**
```json
{
  "message": "something went wrong in getting user profile",
  "error": "<error message>"
}
```

---

## PATCH /me

Update basic profile fields (first name, last name, bio).

**Auth required:** Yes

### Request Body

| Field        | Type   | Required | Notes                          |
|--------------|--------|----------|---------------------------------|
| `first_name` | string | No       | At least one field must be sent |
| `last_name`  | string | No       | At least one field must be sent |
| `bio`        | string | No       | At least one field must be sent |

Any field not listed here (e.g. `role`, `email`, `password`) is ignored, even if present in the request body.

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "bio": "Backend developer"
}
```

### Responses

**201 Created**
```json
{
  "message": "user profile updated successfully",
  "update_profile": {
    "_id": "6a93898638405be7ee28d8b5",
    "first_name": "John",
    "last_name": "Doe",
    "bio": "Backend developer",
    "...": "..."
  }
}
```

**400 Bad Request** — no valid fields provided
```json
{
  "message": "no update happens due to no field value input"
}
```

**404 Not Found**
```json
{
  "message": "user not found"
}
```

**500 Internal Server Error**
```json
{
  "message": "something went wrong in profile update",
  "error": "<error message>"
}
```

---

## POST /me/upload-avatar

Upload or replace the authenticated user's profile picture.

**Auth required:** Yes
**Content-Type:** `multipart/form-data`

### Request

| Field    | Type | Required | Notes                                      |
|----------|------|----------|---------------------------------------------|
| `avatar` | file | Yes      | jpeg, png, or webp. Max size: 5MB           |

### Responses

**201 Created**
```json
{
  "message": "profile picture uploaded successfully",
  "update_profile": {
    "_id": "6a93898638405be7ee28d8b5",
    "profile_img": "https://res.cloudinary.com/.../avatar_6a93....webp",
    "...": "..."
  }
}
```

**400 Bad Request** — no file provided
```json
{
  "message": "profile image not provided"
}
```

**400 Bad Request** — file rejected (too large)
```json
{
  "message": "file upload issue occurred",
}
```

**500 Internal Server Error**
```json
{
  "message": "something went wrong in upload profile picture",
  "error": "<error message>"
}
```

---

## POST /me/upload-cover

Upload or replace the authenticated user's cover picture.

**Auth required:** Yes
**Content-Type:** `multipart/form-data`

### Request

| Field   | Type | Required | Notes                                      |
|---------|------|----------|---------------------------------------------|
| `cover` | file | Yes      | jpeg, png, or webp. Max size: 5MB           |

### Responses

**201 Created**
```json
{
  "message": "cover picture uploaded successfully",
  "update_profile": {
    "_id": "6a93898638405be7ee28d8b5",
    "cover_img": "https://res.cloudinary.com/.../cover_6a93....webp",
    "...": "..."
  }
}
```

**400 Bad Request** — no file provided
```json
{
  "message": "cover image not provided"
}
```

**400 Bad Request** — file rejected (wrong type or too large)
```json
{
  "message": "file upload issue occurred",
  "error": "only jpeg, png, and webp images are allowed"
}
```

**500 Internal Server Error**
```json
{
  "message": "something went wrong in upload cover picture",
  "error": "<error message>"
}
```

---

## PATCH /me/password

Change the authenticated user's password. Requires the current password for verification.

**Auth required:** Yes

### Request Body

| Field              | Type   | Required |
|--------------------|--------|----------|
| `old_password`     | string | Yes      |
| `new_password`     | string | Yes      |
| `confirm_password` | string | Yes      |

```json
{
  "old_password": "oldSecret123",
  "new_password": "newSecret456",
  "confirm_password": "newSecret456"
}
```

### Responses

**201 Created**
```json
{
  "message": "password updated successfully"
}
```

**400 Bad Request** — missing fields
```json
{
  "message": "credentials may be empty"
}
```

**400 Bad Request** — new password same as old
```json
{
  "message": "new password is same as old one"
}
```

**401 Unauthorized** — old password incorrect
```json
{
  "message": "old password is invalid"
}
```

**401 Unauthorized** — confirmation mismatch
```json
{
  "message": "incorrect password confirmation"
}
```

**404 Not Found**
```json
{
  "message": "user not found"
}
```

**500 Internal Server Error**
```json
{
  "message": "something went wrong in password change",
  "error": "<error message>"
}
```

---
<!-- 
## Notes for Frontend Integration

- All requests must include credentials (cookies) — e.g. `fetch(url, { credentials: "include" })`.
- No user ID needs to be sent in the URL or body for any `/me` route; the backend resolves the authenticated user from the verified token cookie.
- File upload endpoints (`upload-avatar`, `upload-cover`) must use `multipart/form-data`, not JSON — set the field name exactly as `avatar` or `cover` respectively.
- `500` responses include an `error` field intended for debugging; avoid displaying raw error messages directly to end users in production UI.
- Register and login both accept a single `identifier` field — the backend infers whether it's an email or username based on presence of `@`. Registration specifically requires an email; username-only registration is rejected.

## Known Improvement Items

- Status code `201 Created` is used on several update/change endpoints (`PATCH /me`, `PATCH /me/password`, avatar/cover uploads); `200 OK` is more semantically correct for updates to existing resources, since `201` conventionally denotes new resource creation.
- Login error messages ("no user found" vs "wrong password encountered") differ by failure reason, enabling user enumeration. Recommend unifying into one generic `"invalid credentials"` message. -->
