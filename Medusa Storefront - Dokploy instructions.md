**\#\#\#\# Medusa StoreFront \- Dokploy \#\#\#**

**Creating Storefront Instance**  
1- Create Instance \-\> Service type \= Application   
2- Instance name : ```Storefront```

3- **General tab** : Provider \= Github 

- Branch \= main  
- Build path= ```/storefront```  
- Build type \= ```Dockerfile```  
- Dockerfile \= ```/Dockerfile.storefront```  
- Docker Context Path \= ```/ ```
- Docker Build Stage \= Optional

4- **Go to Admin** https://admin.domain.com
- Setting -> Regions -> Create a region example : `us` or `kh`
- Setting -> Developer(Publishable API Keys) -> Create a key -> Save **publishable key** in a note

5- **Environment:** (make sure add “```sslmode=disable``` at the end of postgres url)
```env
# Your Medusa backend
MEDUSA_BACKEND_URL=https://api.nokor24.com
# Your publishable key
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_3e6dee758ccab21e5cce41cd098921e7840a9b23cbbb5a23c3ebf780a13dd7b4
# Your store URL, should be updated to where you are hosting your storefront.
NEXT_PUBLIC_BASE_URL=https://nokor24.com
## Your preferred default region.
NEXT_PUBLIC_DEFAULT_REGION=kh
## Your Stripe public key. See – https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe
#NEXT_PUBLIC_STRIPE_KEY=
## Your Medusa payments publishable key. You can find it in your Medusa dashbard.
#NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY=
## Your Medusa payments external account ID. You can find it in your Medusa dashbard.
#NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID=
## Your Next.js revalidation secret. See – https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
REVALIDATE_SECRET=supersecret
## For Cloud users: add your Medusa Cloud S3 hostname and pathname to enable image optimization.
#MEDUSA_CLOUD_S3_HOSTNAME=
#MEDUSA_CLOUD_S3_PATHNAME=
```
6- **Build-time Arguments:** (make sure add “```sslmode=disable``` at the end of postgres url)
```env
MEDUSA_BACKEND_URL=https://api.nokor24.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_3e6dee758ccab21e5cce41cd098921e7840a9b23cbbb5a23c3ebf780a13dd7b4
NEXT_PUBLIC_BASE_URL=https://nokor24.com
NEXT_PUBLIC_DEFAULT_REGION=kh
```

6- **Domain**

- Host \= ```domain.com```  
- Path \= ```/```  
- Internal path \= ```/```  
- Container port \= ```8000```  
- Https \= ```enable```  
- Certificate provider \= ```Let’s encrypt```

6- **Deploy**

- Go back to **General Tab**  
- Deploy Setting \-\> **Deploy**

**Congratulations** Your Store is ready at https://domain.com


