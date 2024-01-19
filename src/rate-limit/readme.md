# Rate Limit

A common technique to protect applications from brute-force attacks is **rate-limiting**

```ts
npm install --save @nestjs/throttler

// usage
app.module.ts
@Module({
  imports: [
    ThrottlerModule.forRoot({
      tttl: 60000,  // milliseconds
      limit: 10 // maximum number of requests within the ttl
    })
  ]
})
```

## Multiple Throttler Definitions

There may come upon times where you want to set up multiple throttling definitions.

```ts
@Module({
  imports: [
    ThrottleModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ])
  ]
})

/**
 * no more than 3 calls in a second, 20 calls in 10 seconds, and 100 calls in a minute.
*/
```
