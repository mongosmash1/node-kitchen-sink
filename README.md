# Node Kitchen Sink

Node.js Boilerplate with everything including the kitchen sink
[comment]: <> (tree -an --dirsfirst ... graphically print dir structure including files on Linux)

## Project Folder structure

```text
node-kitchen-sink
├───client                          # Create React App
│   ├───public                      # Production ready build files
│   └───src                         # Development dynamic files
├───docs                            # Project documentation
└───server                          # Node.js server
    ├───app                         # Express App (HTTP Logic Layer)
    │   ├───api                     # REST API endpoint routes and controllers
    │   │   └───v1                  # v1 routes and controllers
    │   │       └───users           # users routes and controllers
    │   ├───graphql                 # GraphQL API endpoint
    │   │   └───users               # users schema and resolvers
    │   └───middleware              # Express middleware
    ├───config                      # Server config variables
    ├───cron                        # Reoccuring server jobs and tasks
    ├───database                    # Misc database files
    │   ├───migrations              # Database migration files
    │   ├───seeds                   # Database seed files
    │   └───sql                     # Raw SQL (for linting advantage)
    │       └───mysql               # MySQL flavor raw SQL
    │           └───users           # Users SQL statements
    ├───loaders                     # Splits the server startup process into modules
    ├───logs                        # Server logs
    ├───models                      # Database models
    ├───services                    # All business logic goes here
    ├───subscribers                 # Event handlers for async tasks
    └───utils                       # Utility files with generic re-usable code
```

## Server Layered Architecture Explained

### HTTP Logic Layer

#### Route / GraphQL Schema

#### Controller / GraphQL Resolver

### Business Logic Layer

#### Services

#### Models

-   HTTP Logic Layer

    -   Routes Layer - _handle HTTP requests and route to appropriate controller_
        -   one controller per route
        -   authentication and authorization middleware gets called here before passing to the controller
    -   Controllers Layer - _pull out request data from request object, validate and send data to a service(s)_
        -   returns data to client with appropriate HTTP status code
        -   course-grained

-   Business Logic Layer

    -   Services Layer - _contains the business logic and calls the model(s)_
        -   contains methods to perform operations on one or more models
        -   business logic validation (user must be over 21, approved by admin, etc...)
        -   no req or res object in this layer
        -   any API calls external to the Node application go here as well
        -   contains most of the algorithmic code (create user, send welcome email, create something)
        -   emits (publishes) events to be consumed by the Event Handlers/Listeners
        -   fine-grained
    -   Models Layer (Data Access Layer) - _contains logic for accessessing persistent data_
        -   Defines fields, methods to get/set data from models, and returns and object from the persistence layer
        -   Model Validation (username is valid, password match stardards, etc...)
        -   ORM, Querie Builder, or raw SQL
        -   Databases, Redis, Elasticsearch, etc...

-   Persistence Layer

-   Pub/Sub Layer

    -   Event Handlers / Listeners - _listens for events emitted by the service layer_
        -   used for background tasks (3rd-party services, analytics service, start email sequence, etc...)
        -   can call a third-party api/service, another service, or access a model
