# Declarative Abstraction for Assembling Prototype Static Web Apps 

## Can we Declaratively **Assemble Prototype AppWebs** from (Html + Json) Data Components?

# Goals

**Assemble** (Html + Json) Data Components

#### 1. Declaratively Build Static UI, Static Data UI from (Html + Json) Data Components

#### 2. Platform/Framework Independent Abstraction defined in Html/Json Files and Folder/File Names and Organization

# Open Source Assembler (MIT) / Closed Source Tool/Runtime 

Currently the tool consists of Assembler which implements the abstraction and also a tool/runtime for facilitating hot reloading, deployment to multiple fly.io regions/machiens, git integration, performance testing from multiple regions, client side load balancing*, proxy for multiple apps deployed in same fly.io machines etc

The Html/Json assembler will be extracted from the tool and the source will be published using MIT License.

The tool and the application using the MIT Licensed assembler/abstraction will be proprietory.

# Online Demo

Some intersting links to showcase the abstraction. View the hidden Inspect Toolbar at the top to know other features

Main Page explaining the abstraction
#### Main : https://arshuweb.fly.dev

Just add Meta to the end of the page to view the Metadata Json
#### Meta : https://arshuweb.fly.dev/meta

Test Page to show case the different abstractions for assembling Html + Json 
#### Test : https://arshuweb.fly.dev/Test/Main

# Major Features

## Serverless Deployment in fly.io Machines
Can be deployed in fly.io machines across all regions but charged based on actual usage since the runtime will auto shutdown after a idle time of 30 seconds

## View Page Performance on Cold Start/Warm Start
Can check the performance of the webpage by clicking the hidden button at the bottom left corner of any page

![WebPage Performance Tootip](screenshots/PerformanceTooltip.png) "Click Bottom Left Corner to View Page Performance tooltip".

## Inspect Toolbar for View Component Hierarchy
Can check the metadata of the assembeled components by opening the Inspect Toolbar by clicking the invisible top bar and clicking the view button

![View Inspect Toolbar](screenshots/ViewInspectToolbar.png) "Click Top Hiddent Toolbar to View Inspect Toolbar".

![Inspect Toolbar](screenshots/InspectToolbar.png) "Inspect Toolbar".

## View Component Source Hierarchy
Can view the Source Hierarchy of the Page (WIP)

![View Source Hierarchy](screenshots/ViewSourceHierarchy.png) "View Component Source Hierarchy".

## Edit Data Component Source Hierarchy
Can edit the Data Source Hierarchy of the Page after login

![Edit Data Source Hierarchy](screenshots/EditDataSourceHierarchy.png) "Edit Component Data Source Hierarchy".

# Getting Started

## Running Locally
Clone the repo and run the appropriate **Arshu.AppBaseWeb** asp.net core application for the respective platform

On first run the application will run the asp.net core kestrel server

If the source of the Html + Json is required, set the appconfig.json parameter UnPackAppSites to true for the server to extract the AppSites Html + Json to be root folder. Modifying any of the Html + Json should update the Browser UI by hot reload (WIP)

## Running from Docker

Run the Docker Image **arshucs/arshuweb** as below
#### docker run --publish 8080:8080 arshucs/appweb:latest

## Deploying to fly.io Serverless Machines

Fly.io provides free options which should be more than sufficient to host any web app for testing since the machine will auto shutdown after a idle time configured using Environment Flag

#### Prerequisite is Install the <a href=https://fly.io/docs/hands-on/install-flyctl/>Fly Command Line</a> Program from fly site and login using the fly command line program using fly auth login

# Uses Fly Machines and not Fly Apps

<pre>

Initial Step 1 : Create a Fly App for Machines
flyctl apps create --machines --name [appname] --org personal
Optional to Delete the [appname]
rem flyctl apps destroy [appname] --yes


Initial Step 2 : Allocation IPv4 and IPv6 for the App
flyctl ips allocate-v6 --app [appname]
flyctl ips allocate-v4 --app [appname]
flyctl ips list --app [appname]

Initial Step 3 : Create a Fly Machine [NOT A FLY APP]
flyctl apps create --machines --name [appname] --org personal

Initila Step 4 : Upload the Docker Image to Fly Docker Registry
Change directory to the linux64_musl Directory
flyctl deploy . --build-only --remote-only --push --image-label latest -a [appname]

Initial Step 5 : Deploy the Machine to Fly
flyctl machine run registry.fly.io/webimages:appweb --name appweb-sin-1 --port 443:8080/tcp:tls --port 80:8080/tcp:http --env INITIAL_TIME_IN_SEC="30" --env IDLE_TIME_IN_SEC="30" --config fly.toml --app [appname]

Update Step 6
After Deploy after every change in the deploy folder deploy the docker image to Fly Docker Registry
flyctl deploy . --build-only --remote-only --push --image-label latest -a [appname]
Retrive the Machine ID
flyctl machine list --app [appname]
Update the Machine
flyctl machine update [machineID] --image registry.fly.io/[appname]:latest --port 443:8080/tcp:tls --port 80:8080/tcp:http --env INITIAL_TIME_IN_SEC="150" --env IDLE_TIME_IN_SEC="150" --config fly.toml --app [appname] --skip-health-checks --yes

</pre>

# Advanced Configuration (WIP)

To Reset the Login Details delete the contents of the App_Data Directory 

Run the Server and it will prompt for the Initial Users ID which can be used to login and explore the other features of the application.








