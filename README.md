### City Hunter App
App for experimenting with Next.js + tRPC + Edge Functions + PlanetScale DB serverless driver + Clerk Authentication 

### Database
- I am using PlanetScale MySQL database. For certain reasons, it [doesn't support foreign keys](https://planetscale.com/docs/learn/operating-without-foreign-key-constraints)
- DrizzleORM is cool light way to query DB, is uses mostly sql, but also provides some [relational queries](https://orm.drizzle.team/docs/rqb)
- I am using [planetscale database driver](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/mysql-core/README.md) which doesn't reate SQL connection with database, but rather uses http layer to communicate with planetscale http driver
- For caching [Upstash Redis](https://upstash.com/) for caching question

### Api
- Rest is cool, but lacking type support
- GraphQL is cool with great type support, but there is a lot of boilerplate and other technical challenges like [N+1 problem](https://www.youtube.com/watch?v=uCbFMZYQbxE) 
- [tRPC](https://trpc.io/) is amazing alternative taking best of both worlds. I am using it within Next.js api

### Serverless
- I am using Edge functions for serverless solution, because AWS Lambda has cold starts

### Messaging
- I am using [Upstash](https://upstash.com/)  Qstash for asynchronnous work and Kafka for messaging

### Monitoring
- Sentry for logging errors
- Vercel Analytics for web analytics
- Axiom for data querying and web traffic

### Authentication
- Clerk is nice alternative to Auth0 and works on Edge (Auth0 doesn't 😅🙈)

### Development
For testing locally on phone, I can use Cloudflared tunnels:
```shell
cloudflared tunnel --url http://localhost:3400
```
