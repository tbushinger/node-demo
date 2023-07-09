# node-demo
Node responsive API demo

## Instructions

### Start up
```bash

npm install

npm start

```

### Demo

In a separate terminal run this command

```bash
npm run demo

```

## Design considerations

 * `SQLLite` was used for the persistence layer for simplicity.  A better solution would be to preload the data into a Redis cache.
 * The project doesn't have unit tests which should be normally included.
 * I don't prefer node clustering over an intra-structure solutions.  AWS, Azure, and Kubernetes provide such solutions.