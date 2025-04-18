# Polyglot Web

Develop a Full Stack (Both Frontend/Backend) Declarative web framework in multiple languages (Rust/Go/PHP/Lua) intially and latter in F#, Lisp, Haskel

# What

Build a Declarative framework based on HTML for markup + Json for data + Js Frontend for logic + (Rust/Go/PHP/Lua) Backend for logic with the following main features

* Assemble Static Html Components on Server Side by merging HTML hierarchies using 3(Direct/Slotted/Context) basic rules organized into folders and basic configuration. 
* Assemble Static Data Components on Server Side by merging HTML + Json hierarchies using 2 (Row-Record[JsonObject]/Table-Record[JsonArray]) basic rules organized into folders and basic configuration 
* Assemble Dynamic Components on Server Side triggering the change in the client
* Assemble Dynamic Components Partially on the Server Side triggering the change in the client

# Why

The current web technologies are quite complex and britle which require high cognitive load to maintain and upgrade 

## Main Issue - Using Complex Components even for Simple Web Site

Current Web applications are developed using reactive component based development strategies when only very components require reactive capabilities.

Components can be classified as follows

* Static Components - Server side Components which markup change very infrequently
* Static Data Components - Server side Components rendered using persistent data which also markup change infrequently
* Dynamic Data Components - Client/Server side Components rendered using dynamic persistent/non-presistent data triggered from Client/passes through Server and reflected in Client
* Reactive Data Components - Client side Components rendered using client data directly in Client/directly refreshed in Client
* Realtime Data Components - Client/Server side Components rendered using persistent/non-presistent realtime data triggered from Client/Server through Server
* Peer Data Components - Client Side Components rendered using persistent/non-persistent realtime data from other Clients

Even though very few components require pure reactive capabilities, most web applications are build using reactive components

## Main Issue - Frameworks focus on Frontend Mainly or Backend Mainly and don't leverage the unique capabilities of frontent/backend.

Most Web Frameworks main focus is frontend mainly or backend mainly and hence end up creating sub optimal solutions.

For example Htmx/React are frontend focused framework and does not give a full stack solution and hence does not provide the standardization benefit in web development
Another example Elixir type of framework which are backend focused and does not provide frontend features.

A concrete example to show the issues is to build a depend combo boxes in UI.

React
When the volume of data in the combo box is less, then using a reactive component makes sense. When data changes in the primary combo box, the secondary combo box can be re-populated with update data in client

Htmx/Elixir
When the volume of data in the combo box is less, then using a dynamic component does makes sense. When data changes in the primary combo box, the secondary combo box need to be re-populated with update data for server

# How

Hire developers to port the C# Declarative framework into multiple languages using common abstraction having the same architecture and organization

Recreate the C# Declarative framework implementing the common abstraction to also have the same architecture and organization

Publish design and architecture documentation for anyone to port this into other languages

