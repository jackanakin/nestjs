# NestJS
`https://www.udemy.com/course/nestjs-zero-to-hero/`

[TaskManagementApplication]()</br>

## 1. Modules
`The @Module decorator provides metadata that Nest uses to organize the application structure.`
`nest g module MODULE_NAME`

* Modules are Singletons
* Each application has at least one module - the root module, the starting point of the application.
* They are effective to organize components by closely related set of capabilities (e.g. features).
* Good practice is to have a folder per module.

Properties:<br/>
* providers:    array of providers to be available within the module via dependency injection.</br>
* controllers:  array of controllers to be instantiated within the module.</br>
* exports:      array of providers to export to other modules.</br>
* imports:      list of modules required by this module.</br>

### 1.1 Controllers
`@Controller('/tasks')`
`nest g controller CONTROLLER_NAME`

Handlers:
`@Get` `@Post` `@Delete`

### 1.2 Providers
`Can be injected into controllers if decorated with @Injectable`

A Service is defined as a Provider, but not all providers are Services.</br>
`nest g service SERVICE_NAME`
Any component within the NestJS eco can inject a provider by defining the dependency in the constructor of the class.</br>
`constructor( private taskService: TaskService ) {}`

* Can be a plain value, a class, sync/async factory etc.
* Must be provided to a module for them to be usable.

## 2. Pipes
`Operate on the arguments to be processed by the route handler, just before it's called.`

Add `app.useGlobalPipes(new ValidationPipe());` to make nestjs look up for any pipe and to use it without having to manually define them.

* Can perform data transformation/validation.
* Can return data - either the original or modified
* Can throw exceptions
* Can be asynchronous

### Default Pipes within the @nestjs/common module

* ValidationPipe:   validates the compatibility of an entire object against a class.
* ParseIntPipe:     validates and parses an argument is it's a number.

### Custom Pipes Implementation

* Pipes are classes with the @Injectable() decorator.
* Must implement the `PipeTransform` interface.

* Handler-level pipes:      Defined at the handler level, via the @UsePipe() decorator.
`
@Post()
@UsePipes( SomePipe )
createTask( @Body( 'description' ) description ) { }
`
* Parameter-level pipes:    Defined at the parameter level, via the @UsePipe() decorator.
`
@Post()
createTask( @Body( 'description', SomePipe ) description ) { }
`
* Global pipes:             Defined at the application level and applied to any incoming request.
`app.useGlobalPipes(SomePipe)`