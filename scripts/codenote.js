$(document).ready(function() {
    var pres = document.getElementsByTagName("pre");
    for (var i=0; i<pres.length; i++) {
        pres[i].innerHTML+='<button class="copy-code-button"><i class="fa fa-clipboard" aria-hidden="true"></i></button>';
    }
});

var clipboards = new Clipboard('.copy-code-button', {
    target: function(trigger) {
        return trigger.previousElementSibling;
    }
});
clipboards.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, 'Copied!');
});
clipboards.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});

var btns = document.querySelectorAll('.copy-code-button');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseleave', function(e) {
        e.currentTarget.setAttribute('class', 'btn');
        e.currentTarget.removeAttribute('aria-label');
    });
}
function showTooltip(elem, msg) {
    elem.setAttribute('class', 'btn tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}
function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }
    return actionMsg;
}
hljs.initHighlightingOnLoad();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-71764085-1', 'auto');ga('send', 'pageview');

