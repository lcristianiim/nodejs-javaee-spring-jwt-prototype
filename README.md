The aim of the prototype is to demonstrate the orchestration of multiple technologies based on HTTP requests.
The prototype is not production ready and multiple adjustments can be done.
Request examples:
---
### Token request
#### POST:
http://localhost:8090/oauth/token?grant_type=password&username=client@email.com&password=client123456789

#### Headers:
- Authorization Basic YXBwOnNlY3JldA==
---
### Check Token 
#### GET: 
http://localhost:8090/oauth/check_token?token=<PUT TOKEN HERE>

#### Headers:
- Authorization Basic YXBwOnNlY3JldA==
---
### Refresh Token
#### GET:
 http://localhost:8090/oauth/token?grant_type=refresh_token&refresh_token=<PUT TOKEN HERE>

#### Headers:
- Authorization Basic YXBwOnNlY3JldA==
---
### Get Resources
#### GET: http://192-168-0-102:8080/ceremonies-1.0-SNAPSHOT/api/hello/cris

#### Headers:
- Authorization Basic YXBwOnNlY3JldA==
- AuthorizationToken Bearer <PUT TOKEN HERE>
---
