# Component Organization 

Components should be grouped into AppSites and AppViews Folders for providing URL Context

    AppSites are like namespaces which is used to separate components into libraries

    AppSite's are created under AppSites Root Directory under the Application Root Folder 

    AppView's can be grouped into Views/ViewsDefer Root Directory under Respective AppSite Directory.

    General Components can be added to Component/Common Directory under Respective AppSite Directory 

    Page Components can be added to AppView Directory under Views/ViewsDefer Directory

    Url to access a page is https://[Hosting Domain]/[AppSite]/[AppView]