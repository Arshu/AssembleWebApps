# Abstraction for Assembling Dynamic/Realtime UI from Html + Json Components

1. Abstractions for Assembling Dynamic Components is by adding a {{ViewPlaceHolder}} where the system will auto generate a View ID for accessing from Javascript

<pre>

Center.html
    &lt;div&gt;     
        {{ViewPlaceHolder}}
    &lt;/div&gt;     

</pre>

2. Currently state flow between components is completed. State flow between global state, context state, parent state and component state where the component state overwrite all the previous state is implemented. Viewing the Metadata of the Page gives the State Flow.

<pre>

     Component State
        Parent Components State                
                Context State
                    Global State   

</pre>

