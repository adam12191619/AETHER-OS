# AetherOS Security Specification

## Data Invariants
1. A user profile (`/users/{uid}`) must be created by the authenticated user matching the UID.
2. All creative tasks (`/users/{uid}/creative_tasks/{taskId}`) must belong to the user (`uid`).
3. Chat history (`/users/{uid}/chat_history/{id}`) is private and only accessible to the owning user.
4. Timestamps (`createdAt`, `updatedAt`) must be server-validated.

## The Dirty Dozen (Attack Vectors)
1. **Identity Spoofing**: Attempt to create a user profile with `uid` 'attacker' but authenticated as 'victim'.
2. **Access Escalation**: User A attempts to read User B's `creative_tasks`.
3. **Data Poisoning**: Injecting 1MB string into the `prompt` field.
4. **ID Poisoning**: Using a 2KB string as a `taskId`.
5. **Relational Bypass**: Attempt to update a task and change its `userId` to a different user.
6. **State Shortcut**: Forcing a task status directly to `completed` without going through `processing`.
7. **Shadow Keys**: Adding an `isVerified: true` field to a user profile.
8. **PII Leak**: An unauthenticated user attempting to list the `/users` collection.
9. **Timestamp Forgery**: Providing a client-side date for `createdAt`.
10. **Resource Exhaustion**: Creating 10,000 chat messages in a single batch (rule-level protection against large writes).
11. **Type Confusion**: Sending an integer for the `email` field.
12. **Query Scraping**: Authenticated user attempts to list all tasks in the system using a blanket query without a `userId` filter.

## Test Runner Plan
- Test creating own profile: ALLOW.
- Test creating someone else's profile: DENY.
- Test reading someone else's tasks: DENY.
- Test payload with extra fields: DENY.
- Test payload with invalid types: DENY.
