**\#\#\#\# Medusa Admin \- Dokploy**

**\#\#\# Creating** **Backend Instance**  
9- Create Instance \-\> Service type \= Application   
10- Instance name : ```Admin```

11- **General tab** : Provider \= Github 

- Branch \= main  
- Build path= ```/```  
- Build type \= ```Dockerfile```  
- Dockerfile \= ```/backend/Dockerfile.admin```  
- Docker Context Path \= ```/ ```
- Docker Build Stage \= Optional

12- **Environment:** (make sure add “```sslmode=disable``` at the end of postgres url)
```env
MEDUSA_ADMIN_BACKEND_URL=https://api.domain.com  
DATABASE_URL=postgresql://postgres:1…:5432/postgres?sslmode=disable  
REDIS_URL=redis://default:...:6379

MEDUSA_ADMIN_PATH=.medusa/admin  
DISABLE_MEDUSA_ADMIN=false

SESSION_SECRET=long-secure-session-secret-raksmey  
JWT_SECRET=strong-jwt-secret-for-medusa-backend  
COOKIE_SECRET=strong-jwt-secret-for-medusa-backend

ADMIN_CORS=https://admin.domain.com  
HOST=0.0.0.0
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

Your Admin is ready at https://admin.domain.com/app

### Redirect domain (optional)

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


