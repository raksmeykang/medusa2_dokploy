# Medusa Backend - Dokploy

Detailed instructions for deploying the Medusa backend using Dokploy.

---

### ### Creating PostgreSQL Databases
1. **Create Instance** -> Service type = **Database**
2. **Select**: PostgreSQL
3. **Name**: `Postgres`
4. **Copy** `database_url` to a note; we will use it in some environments.

---

### ### Creating Redis Database
5. **Create Instance** -> Service type = **Database**
6. **Select**: Redis
7. **Name**: `Redis`
8. **Copy** `database_url` to a note; we will use it in some environments.

---

### ### Creating Backend Instance
9. **Create Instance** -> Service type = **Application**
10. **Instance name**: `Backend`

11. **General tab**:
    * **Provider** = Github
    * **Branch** = `main`
    * **Build path** = `/`
    * **Build type** = `Dockerfile`
    * **Dockerfile** = `/backend/Dockerfile`
    * **Docker Context Path** = `/backend`
    * **Docker Build Stage** = Optional

12. **Environment**: 
    > **Note:** make sure add `sslmode=disable` at the end of postgres url.

    ```env
    DATABASE_URL=postgresql://postgres:...5432/postgres?sslmode=disable

    # Redis
    REDIS_URL=redis://default:...:6379
    MEDUSA_CACHE_REDIS_URL=redis://default:...:6379

    # Secrets
    SESSION_SECRET=long-secure-session-secret-123
    JWT_SECRET=strong-jwt-secret-for-medusa-backend
    COOKIE_SECRET=strong-jwt-secret-for-medusa-backend

    # CORS Settings
   STORE_CORS=https://nokor24.com,https://www.nokor24.com
   ADMIN_CORS=https://admin.nokor24.com
   AUTH_CORS=https://nokor24.com,https://www.nokor24.com,https://admin.nokor24.com

    # Admin Control (CRITICAL: Set to true for this instance)
    DISABLE_MEDUSA_ADMIN=true

    ```

13. **Domain**:
    * **Host** = `api.domain.com`
    * **Path** = `/`
    * **Internal path** = `/`
    * **Container port** = `9000`
    * **Https** = enable
    * **Certificate provider** = Let’s encrypt

14. **Deploy**:
    * Go back to **General Tab**
    * Deploy Setting -> **Deploy**

---

### ### Create Admin username and Password

15. Goto -> **General** -> **Deploy Settings** -> Terminal
16. Select backend container that **running**
17. Navigate to **bin/sh**
18. run this #
    ```
    cd /app && yarn medusa user --email Your@Email --password YourSecurePassword123!
    ```
20. Your Admin info will be 
    - Username : Your@Email
    - Password : YourSecurePassword123!
