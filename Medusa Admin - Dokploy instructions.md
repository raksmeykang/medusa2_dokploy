**\#\#\#\# Medusa Admin \- Dokploy**

**\#\#\# Creating** **Backend Instance**  
9- Create Instance \-\> Service type \= Application   
10- Instance name : Admin

11- **General tab** : Provider \= Github 

- Branch \= main  
- Build path= /  
- Build type \= Dockerfile  
- Dockerfile \= /backend/Dockerfile.admin  
- Docker Context Path \= /  
- Docker Build Stage \= Optional

12- **Environment:** (make sure add “sslmode=disable at the end of postgres url)
```env
MEDUSA\_ADMIN\_BACKEND\_URL=https://api.domain.com  
DATABASE\_URL=postgresql://postgres:1…:5432/postgres?sslmode=disable  
REDIS\_URL=redis://default:...:6379

MEDUSA\_ADMIN\_PATH=.medusa/admin  
DISABLE\_MEDUSA\_ADMIN=false

SESSION\_SECRET=long-secure-session-secret-raksmey  
JWT\_SECRET=strong-jwt-secret-for-medusa-backend  
COOKIE\_SECRET=strong-jwt-secret-for-medusa-backend

ADMIN\_CORS=https://admin.domain.com  
HOST=0.0.0.0
```

13- **Domain**

- Host \= admin.domain.com  
- Path \= /  
- Internal path \= /  
- Container port \= 9000  
- Https \= enable  
- Certificate provider \= Let’s encrypt

14- **Deploy**

- Go back to **General Tab**  
- Deploy Setting \-\> **Deploy**

