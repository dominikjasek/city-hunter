### City Hunter App
App for experimenting with Next.js + tRPC + Edge Functions + PlanetScale DB serverless driver + Clerk Authentication 

### Database
- PlanetScale [doesn't support foreign keys](https://planetscale.com/docs/learn/operating-without-foreign-key-constraints)
- DrizzleORM is cool light way to query DB, is uses mostly sql, but also provides some [relational queries](https://orm.drizzle.team/docs/rqb)
- I am using [planetscale database driver](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/mysql-core/README.md) which doesn't reate SQL connection with database, but rather uses http layer to communicate with planetscale http driver

### Development
For testing locally on phone, I can use Cloudflared tunnels:
```shell
cloudflared tunnel --url http://localhost:3400
```
