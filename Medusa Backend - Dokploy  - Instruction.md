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
   # --- CORE SETTINGS ---
PORT=9000
NODE_ENV=production
# Change this to a long random string (e.g., openssl rand -base64 32)
COOKIE_SECRET=supersecret-change-me 
# --- DATABASE & REDIS ---
DATABASE_URL=postgresql://postgres:1...8d:5432/postgres?sslmode=disable
# Required for Medusa v2 Workflows and Event Bus
REDIS_URL=redis://default:ra...x0err:6379
# --- ADMIN SETTINGS (The "Official" way) ---
# This must be false to keep the admin active
DISABLE_MEDUSA_ADMIN=true
# This tells the Admin UI where to send API calls
MEDUSA_BACKEND_URL=https://api.domain.com
# Set to "/" if you want admin.domain.com to load the dashboard immediately
MEDUSA_ADMIN_PATH=/

# --- CORS SETTINGS (CRITICAL) ---
# Allow the Admin and the Storefront to talk to the Backend
ADMIN_CORS=https://admin.domain.com
AUTH_CORS=https://admin.domain.com,https://domain.com,https://www.domain.com
STORE_CORS=https://domain.com,https://www.domain.com

# --- ONBOARDING (Optional) ---
MEDUSA_ADMIN_ONBOARDING_TYPE=nextjs

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
    npx medusa user --email your-email@example.com --password YourSecurePassword123
    ```
    or
    ```
    cd /app && npx medusa user --email your-email@example.com --password YourSecurePassword123
    ```
20. Your Admin info will be 
    - Username : Your@Email
    - Password : YourSecurePassword123!
