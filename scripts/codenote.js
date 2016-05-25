var pres = document.querySelectorAll('pre');
for (var i = 0; i < pres.length; i++) {
    pres[i].innerHTML+='<button class="copy-code-button"><i class="fa fa-fw fa-clipboard" aria-hidden="true"></i></button>';
}
var btns = document.querySelectorAll('.copy-code-button');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseleave', function(e) {
        e.currentTarget.innerHTML='<i class="fa fa-fw fa-clipboard" aria-hidden="true"></i>';
    });
}
var clipboards = new Clipboard('.copy-code-button', {
    target: function(trigger) {
        return trigger.previousElementSibling;
    }
});
clipboards.on('success', function(e) {
    e.clearSelection();
    e.trigger.innerHTML='<i class="fa fa-fw fa-smile-o" aria-hidden="true"></i>';
});
clipboards.on('error', function(e) {
    e.trigger.innerHTML=fallbackMessage(e.action);
});

console.log("run!\n");

function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press <kbd><kbd>&#8984;</kbd>-<kbd>' + actionKey + '</kbd></kbd> to ' + action + '<i class="fa fa-fw fa-frown-o" aria-hidden="true"></i>';
    } else {
        actionMsg = 'Press <kbd><kbd>Ctrl</kbd>-<kbd>' + actionKey + '</kbd></kbd> to ' + action + '<i class="fa fa-fw fa-frown-o" aria-hidden="true"></i>';
    }
    return actionMsg;
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-71764085-1', 'auto');ga('send', 'pageview');

