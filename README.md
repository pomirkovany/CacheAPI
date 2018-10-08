# CacheAPI 

Cache api powered by mongodb

## Getting Started

### Prerequisites

```
nodejs 8.0.0 or later
mongodb 3.1.6
```

### Installing

Before setting up you need to configure the app unless
you can use default settings. You can do that by setting 
environment variables. You can also do that by creating .env
file in the root and setting env variables there.

Here is the list of available env variables:

```
CACHE_COLLECTION_NAME={collection used for cache, default is dummyStrings}
MONGO_URL={mongo db url, default is mongodb://127.0.0.1:27017/cache-db}
MONGO_POOL_SIZE={size of reusable connections pool}
CACHE_MAX_SIZE={max cache size, default is 10}
CACHE_TTL_SECONDS={cache ttl in seconds, default is 30}
```

When env variables are ready, run:

```
npm install
```

And the setup the mongo collection by running:

```
node mongo_data.js
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

Now you can run the app:

```
npm start
```

You can also run it in dev mode with nodemon

```
npm run dev
```


## Structure

Project is structured by components. If you need to add a separate component please create a directory inside of src/components

## Testing

Tape-style unit tests are run with standard npm test command

```
npm test
```

You can also output coverage to your browser

```
npm run report
```