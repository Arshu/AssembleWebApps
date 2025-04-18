# Abstraction for Assembling Static Data UI from Html + Json Components

1. Placeholder Data Composition

#### Abstraction for Composing from Html + Json Property Fragemnts

<pre>

Title.html
&lt;div&gt; 
     {{$Title}}
&lt;/div&gt;     

Title.json
    {
        "Title" : "Name"
    }

</pre>

2. Section Array Composition

#### Abstraction for Composing from Html + Json Array Fragemnts

<pre>

List.html
 &lt;div&gt; 
    {{@List}}
        {{$TaskName}}
    {{/List}}
&lt;/div&gt;     

List.json
    {
        "List" : [
            {
                "TaskName" : "Task 1"
            }
        ]
    }

</pre>

3. Data Flow Composition

#### Json Data is composed with Html Component based on the below precedence

<pre>

    Component State
        Parent Components State                
                Context State
                    Global State            
                

</pre>

#### Data Defined at the Any Data Level can be Overwriten by the Previous Precedence Data if allowed by $ Suffix to the Json Key

<pre>

    Title.json
    {
        "Title$" : "Name"           ==> Allow Override with Parent Data if Available
    }

</pre>
