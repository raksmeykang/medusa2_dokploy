**\#\#\#\# Medusa StoreFront \- Dokploy**

**\#\#\# Creating** **Storefront Instance**  
9- Create Instance \-\> Service type \= Application   
10- Instance name : ```Storefront```

11- **General tab** : Provider \= Github 

- Branch \= main  
- Build path= ```/storefront```  
- Build type \= ```Dockerfile.storefront```  
- Dockerfile \= ```/Dockerfile.admin```  
- Docker Context Path \= ```/ ```
- Docker Build Stage \= Optional

12- **Environment:** (make sure add “```sslmode=disable``` at the end of postgres url)
```env
# --- RUNTIME SETTINGS ---
NODE_ENV=production
PORT=9000
# Keep this false so the build process isn't skipped
DISABLE_MEDUSA_ADMIN=false
# --- CONNECTION (CRITICAL) ---
# This is the most important one. It tells the browser where the API is.
MEDUSA_BACKEND_URL=https://api.domain.com
# --- BUILD-TIME SETTINGS ---
# Medusa sometimes looks for these specific keys during the 'build' command
BACKEND_URL=https://api.domain.com
ADMIN_PATH=/
# --- UI SETTINGS ---
# This ensures admin.domain.com loads the dashboard at the root "/"
# instead of admin.domain.com/app
MEDUSA_ADMIN_PATH=/
```

13- **Domain**

- Host \= ```admin.domain.com```  
- Path \= ```/```  
- Internal path \= ```/```  
- Container port \= ```9000```  
- Https \= ```enable```  
- Certificate provider \= ```Let’s encrypt```

14- **Deploy**

- Go back to **General Tab**  
- Deploy Setting \-\> **Deploy**

Your Admin is ready at https://admin.domain.com
                    or https://admin.domain.com/app

### Redirect domain (optional) in case your admin at http://admin.domain.com/app

15- **Advanced tab**

- Scroll down to **Redirects**  
- **Add** redirect

.Preset:
```
No preset selected
```
.Regex:
```
^https?://admin.domain.com
```
.Replacement:
```
https://admin.doamin.com/app/
```
.Permanent:
```
ON
```

. **Congratulations** now your Admin works without type /app
. **Final Admin url:** https://admin.domain.com or https://admin.domain.com/app


