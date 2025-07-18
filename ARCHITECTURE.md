
```mermaid
flowchart TD
    FE[Frontend]
    BE[Backend]
    DB[Database]
    AUTH[Auth Service]
    PAY[Payment Gateway]
    STORAGE[Cloud Storage]
    CDN[CDN]
    EMAIL[Email Service]

    FE -->|HTTP Request| BE
    BE -->|CRUD Ops| DB
    BE -->|Auth| AUTH
    BE -->|Payments| PAY
    BE -->|File Uploads| STORAGE
    FE -->|Static Assets| CDN
    BE -->|Notifications| EMAIL
```
