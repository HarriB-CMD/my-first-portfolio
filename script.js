const btn = document.getElementById('mode-toggle');

btn.addEventListener('click', function() {
    // This "toggles" the dark-mode class on the body tag
    document.body.classList.toggle('dark-mode');
});
