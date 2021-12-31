# AppWeb Assembler (Work In Progress)

## Can we **Assemble AppWebs** from Reusable Html + Json(Data) + Json(Action) Components Declaratively

<br/>

# Goals

**Build/Assemble** Reusable Html + Json Components

    1. Declaratively Build Static UI, Static Data UI, Dynamic UI and Realtime UI from Reusable Html + Json Components

    2. Platform/Framework Independent Abstraction defined in Html/Json Files and Folder Organization.

    3. Assemble Html + Json (Data) + Json (Action) 

# Progress

### **Declarative Abstraction** (Platform/Framework Idependent)

    a) 90% completed the Declarative Abstractions for Assembly of Static (Html) and Static Data (Html + Json) UI.

    b) 90% completed the Declarative Abstraction for Assembly of Realtime UI.

    c) 60% completed the Declarative Abstractions with Imperative Coding for Creating Dynnamic UI.

### **Assembly** of Html + Json Components

    a) 90% completed for Assembly for Static/Static Data and Realtime UI

    b) 30% completed for Assembly for Dynamic UI

# Abstraction for Assembling Static UI from Html Components

<br/>

1. Abstraction for Composing from Html Fragements

<pre>
Index.html
    {{MainHeader}}    
    {{MainContent}}
    {{MainFooter}}
</pre>

    The Runtime will search the wwwroot folder and auto replace the mustache definition with the actual html component recursively. Reorganizing the Html Components has no impact to composition.

2. Abstraction for Composing where the Parent Component is composed from Child Components based on Context

    When Context is https://Gluuie.com/Index/Main vs https://Gluuie.com/Index/About

    MetaData of the Pages are    
    https://Gluuie.com/Index/Main/Meta    
    https://Gluuie.com/Index/About/Meta

    The Main Prefix of a Mustache is replaced with the AppView Context (About) to render a different page retaining the same index.html page.

<pre>
Index.html
    {{MainHeader}}      =>      {{MainHeader}}
    {{MainContent}}     =>      {{AboutContent}} 
    {{MainFooter}}      =>      {{MainFooter}}
</pre>

3. Abstractions for Assembling Components is by adding a {{HtmlPlaceHolder}} where other Components can be added

<pre>
Center.html
    {{#Center}}      
        {{HtmlPlaceHolder}}
    {{/Center}}      

</pre>

# Abstraction for Assembling Static Data UI from Html + Json Components

<br/>

1. Abstraction for Composing from Html + Json Property Fragemnts

<pre>
Title.html
    {{$Title}}

Title.json
    {
        "Title" : "Name"
    }
</pre>

2. Abstraction for Composing from Html + Json Array Fragemnts

<pre>
List.html
    {{@List}}
        {{$TaskName}}
    {{/List}}

List.json
    {
        "List" : [
            {
                "TaskName" : "Task 1"
            }
        ]
    }
</pre>

# Abstraction for Assembling Dynamic/Realtime UI from Html + Json Components

<br/>

1. Abstractions for Assembling Dynamic Components is by adding a {{ViewPlaceHolder}} where the system will auto generate a View ID for accessing from Javascript

<pre>
Center.html
    &lt;div&gt;     
        {{ViewPlaceHolder}}
    &lt;/div&gt;     
</pre>

2. Currently state flow between components is completed. State flow between global state, context state, parent state and component state where the component state overwrite all the previous state is implemented. Viewing the Metadata of the Page gives the State Flow.

<pre>
    Global State
        Context State
            Parent Components State
                Component State
</pre>

# Component Organization 

<br/>

Components should be grouped into AppSites and AppViews Folders for providing URL Context

    Pages Components can be grouped into a AppSites Directory under Root Directory and Views/ViewsDefer Directory under AppSites Directory.

    Url to access a page is https://Domain/AppSite/AppView

    Standalone Components can be grouped under a Common/Component folder under Respective AppSite Directory.
