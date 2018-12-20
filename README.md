# express-and-apollo-server
Express framework for implementing the Node.js GraphQL server 

## Getting Started
- Install the Node.js version >= 8
- clone the repository `git clone https://github.com/shamrat17/express-and-apollo-server.git`
- go to the project folder and run command
```bash
    $ npm install
```
### Run Dev server
```bash
  $ npm run dev
```
It will start listening `localhost:4000`. Now if you want to go `graphql` then simply go to `localhost:4000/graphql` and type

```graphql
  {
    allCourses{
      id,
      title
    }
  }
```
Now you will see a result like 
```graphql
  {
  "data": {
    "allCourses": [
      {
        "id": 1,
        "title": "The Complete Node.js Developer Course"
      },
      {
        "id": 2,
        "title": "Node.js, Express & MongoDB Dev to Deployment"
      },
      {
        "id": 3,
        "title": "JavaScript: Understanding The Weird Parts"
      }
    ]
  }
}
```

## About Apollo Server
### What is Apollo Server?
Apollo Server is the best way to quickly build a production-ready, self-documenting API for GraphQL clients, using data from any source.
It’s open-source and works great as a stand-alone server, an addon to an existing Node.js HTTP server, or in “serverless” environments.

<img alt="Docker container" src="./apollo.svg" />

Apollo Server implements a spec-compliant GraphQL server which can be queried from any GraphQL client, including Apollo Client, enabling:

- *An easy start*, so front-end and back-end developers can start fetching data quickly.
- *Incremental adoption*, allowing advanced features to be added when they’re needed.
- *Universal compatibility* with any data source, any build tool and any GraphQL client.
- *Production readiness*, and what you build in development works great in production.