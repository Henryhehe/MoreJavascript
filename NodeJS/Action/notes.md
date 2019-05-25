## Chapter 1 - Basics

- Node use libuv to provide access to the operating system's nonblocking network calls.
- Node's built-in HTTP server library handles request by using a combination of streams, events and Node's HTTP request parser.
- Generators are used to give a synchronous programming style to asynchronous I/O.(Koa web application)
- Node is powered by the V8 javaScript engine, which is developed by the Chromium project for Google Chrome. It compliles directly to machine code.
- run Node with --harmony flag:
`node --v8-options | grep "in progress"`
- Node includes a debugger that supports single-stepping and a REPL(real-eval-print loop): `node debug hello.js`
- Node supports the Chrome Debuggling Protocol: `node --inspect --debug-brk`
- Node is used to write command-line tools such as process managers and Javascript transpilers.
- If you add a line to the start of the program that starts with #!, and grant it execute permissions(chmod + x cli.js), then you can make the shell use Node when it invokes the program. `#!/usr/bin/env node`
- Node is also used to write desktop application such as Electron
  
## Chapter 2. Fundamentals

- Node modules bundle up code for reuse, but they don't alter global scope.
- Node modules allow you to select which functions and variables from the included file are exposed to the application.****
- To create a new Node project:
     `npm init -y`  
     The -y flg means yes
- Modules can be either single files or directories containing one or more files. If a module is a directory, the file in the module directory that will be evaluated is typically named `index.js`
- Node's require function, takes a path to the module you wish to use as an argument. Node performs a synchronous lookup to locate the module and loads the file's contents 
- Looks for files in its core modules, then the current directory, and finally node_modules
- Avoid using require in I/O intensive parts of your application, any synchronous call will block Node from doing anything until the call has finished 
- Returning a function from require, rather than an object, will make your code more elegant if that's the only thing you need from the module
- The module.exports mechanism enables you to export a single variable, function or object. If you create a module that populates both exports and module.exports, module.exports will be returned, and exports will be ignored.
- What ultimately gets exported in your application is module.exports. exports is set up as a global reference to module.exports, which initially is defined as an empty object that you can add properties to. exports.myFunc is shorthand for module.exports.myFunc
- The `NODE_PATH` environmental variable provides a way to specify alternative locations for Node modules.
- If a module is a directory, the file in the module directory that will be evaluated must be named `index.js`
- or use `"main": "something.js"` in package.json to replace that
- If two files in an application requires the same module, the first require will store the data returned in application memory so the second require won't need to access and evaulate the module's source files
- Event listeners, are callbacks associated with a conceptual entity(an event)
- `server.on('request', handleRequest)`, the handle-Request will be called whenever a request event is emitted, by using the Event-Emitter.prototype on method to bind an event listener to the server
- A callback is a function, passed as an argument to an asynchronous function, that describes what to do after the asynchronous operation has completed
- Event emitters fire events and include the ability to handle those events when triggered. HTTP servers, TCP servers, and streams, are implemented as event emitters
- Events are handled through the use of listeners. A listeners is the association of an event with a callback function that gets triggered each time the event occurs:  
    
    `socket.on('data, handleData)`;
- Node's event loop keep track of asynchronous logic that hasn't completed processing. As long as there's uncompleted asynchronous logic, the Node process won't exit.
- Flow control is the concept of sequencing groups of asynchronous tasks. There are two types of flow control: serial and parallel
  

  ## Chapter 3 Node web application

- Gulp is a build system based on streams. You can route streams together to create build processes that do more than just transiple or minify code
- Gulp helps you achieve a high level of reuse through two techniques: using plugins and defining your own build tasks.
- ~~~~gulp.src('public/index.jsx')
  .pipe(babel({
    presets: ['es2015', 'react']
  }))
  .pipe(minify())
  .pipe(gulp.dest('build/public.js'));
- 1.Source - Gather input files  
  2. Transpile - Pipe them through a plugin that transform them
  3. Concat - pipe the files together to create a monolithic build
  4. Output - Set a file destination or move the output file

- Gulp can watch task  
   ~~~~gulp.task('watch', () => {
  watch('app/**.jsx', () => gulp.start('default'));});

- Using separate files for larger projects:

    1. Create a folder called gulp, and a subfolder called tasks;
    2. Define your tasks by using the usual gulp.task() syntax in separate files. One file per task is a good rule of thumb.
    3. Create a file called gulp/index.js to require each Gulp task file
    4. Require the gulp/index.js file in gulpfile.js


- Webpack, you write a configutation file and then bring in new functionality by using plugins and loaders
- Webpack plugins are used to change the behavior of the build process
- Loaders are transformations that are applied to resource file(convert SASS to CSS, ES2015 to ES5)
  
## Chapter 4 Server side framework

- PDF generator microservice - hapi
- Koa is based on Express, but uses the ES2015 generator syntax to define middleware. You can write middleware in an almost synchronous fashion.
- With Koa, you can use the yield keyword to exit and then reenter middleware
- 1. use generators to switch context between two middleware components. use the keyword function*, not possible to use yield keyword
  2. executuion steps down the middleware stack, then back again when the next middleware component returns 
  3. Another benefit of using generator functions is you can just set this.body
  4. 
- koa-router
- Kraken is based on Express, but adds new functionality through custom modules developed by Paypal - Lusca
- Lusca provides an application security layer 
- hapi is a server framework that focuses on web API development
- It comes with a routing API and has its own HTTP server wrapper. In hapi, you design APIs by thinking about the servers as the main abstraction.
- LOOPBACK - ORM, API user interface, WebSocket, client SDKs
- 
## Chapter 5. Connect and Express:

- In Connect, a middleware component is a Javascript function that by convention accepts three arguments: a request object, a response object, and an arugment commonly named next(which is a callback function indicating that the component is done and the subsequent middleware component can be executed)
- Connect provides a method called use for combining middleware components.
- The ordering of middleware in your application can dramatically affect the way it behaves. Execution can be stopped by omitting next(), and middleware can be combined to implement features such as authentication
- When a component doesn't call next(), no remaining middleware in the chain of command will be invoked
- Middleware commonly follows a simple convention in order to provide configuration capabilities to developers: using a funciton that returns another function(a closure)
    ~~~~
    function setup(option) {
        //setup logic
        return function(req, res, next) {
            //middleware logic
        }
    }

    app.use(setup({some : 'option'}));

- Express has a command-line tool called express-generator
- Express uses the configuration system internally, allowing you to customize the way Express bahaves.
- `app.set()` `app.get()` `app.disable()` `app.set('json spaces',2)`;
- You can use `app.locals` for application-level variables
- `res.locals` for request-level local variables that are typically set by middleware component prior to the final route-handling method where views are rendered
- The primary function of Express routes is to pair a URL pattern with response logic. But routes also can pair a URL pattern with middleware. 