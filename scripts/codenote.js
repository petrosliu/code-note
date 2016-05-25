$(document).ready(function() {
    var pres = document.getElementsByTagName("pre");
    for (var i=0; i<pres.length; i++) {
        pres[i].innerHTML+='<button class="copy-code-button">Copy</button>';
    }
    new Clipboard('.copy-code-button', {
        target: function(trigger) {
            return trigger.previousElementSibling;
        }
    });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-71764085-1', 'auto');ga('send', 'pageview');

