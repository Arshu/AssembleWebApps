# URL Speed Test App - Remote Command Execution Proxy

I want to pursue subscription freelancing as a side project and leverage my knowledge in using Usage Based Cloud and Arshu Framework for assembling web applications using declarative approach.

Towards the above objective, i have created this Self-Hostable Multi Region Testing Proxy using Fly.io Scale to Zero Infrastructure which can be further enhanced/extended using subscription freelancing.

This app can also be used to declaratively assemble Html/Json for static hosting / markdown hosting using scale to zero cloud infrastructure

Extensions to the app can be customized to also using ApacheBench to execute the speed test on the Url across regions

Another customized extension to the app may to upload K6 javascript files for testing across multiple regions

Another extension to the app may be to generate test scripts from open api definitions using LLM and execute it in multiple regions for stress testing an app.

## To Do

### Verify Stability

Need to verify the stability of Replay Header feature of Fly Proxy to transfer the request to different regions or need to create multiple apps per region with region prefix to make the app directly addressable

### Implementing Persistence
	
Current Deployment does not have any persistence of the curl data retrieved from each region. Need to implement a centralized persistence of the metrix data.

As fly does not guarantee start up of single machines, need to implement multiple metrics store machines and have a mechanism of consolidating the metrics data

* May need to implement validated connection between the Test Proxy Machines and the Centralized Metrics API Server

### Implement Updatable App

To avoid unnecessary cost, i have deployed the Testing Proxy in only 5 regions out of the 34 regions provided by fly.

Enable maximum of any 7 regions to be updated by any user of the app using fly api using the self hosting component

* May need to implement a Centralized Fly API Server to avoid sharing the API Token across all the machines
* May need to implement validated connection between the Test Proxy Machines and the Centralized Fly API Server

### Implement Clonable App for Self Hosting

Enable cloning of the web app by the user for self hosting using their own fly.io api key so that they can deploy into any 34 regions available in fly

* May need to implement a custom registry server for downloading/updating/deploying the app to another user using fly api since the user api may not have access to the deployed fly app

# Deployment Architecture

![Url Speed Test](screenshots/url-speed-test.png) "Speed Test Deployment without Persistent".

![Url Speed Test With Persistence](screenshots/url-speed-test-withpersistense.png) "Speed Test Deployment with Persistence".

![Desktop Url Speed Test With Persistence](screenshots/url-speed-test-desktop.png) "Desktop Speed Test Deployment with Persistence".

# Points of Interest

## Auto Deployment in fly

Deploying to multiple regions is automated using fly API based on the AUTO_UPDATE environment variable during machine update using flyctl

flyctl machine update 080e449c147478 --image registry.fly.io/arshubase:latest --port 443:8080/tcp:http:tls --port 80:8080/tcp:http --env AUTO_UPDATE="iad, ams, ewr, arn, bom" --app arshubase --yes --restart no --skip-health-checks --detach

* AUTO_UPDATE="false" does not update any other other machines in other regions

* AUTO_UPDATE="All" update all machines in other regions

* AUTO_UPDATE="AllDeploy" update and deploys all machines in other regions

* AUTO_UPDATE="iad, ams, ewr, arn, bom" update and deploys machines in the specified regions and destroys in other regions

# Monitization Strategy

![Monitization Strategy](screenshots/monitization-strategy.png) "Monitization Strategy for Subscription Freelance".


