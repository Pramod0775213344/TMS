//only - to show/hide the overlay
window.addEventListener('load',  ()=> {

    document.querySelector('.overlay').style.display = 'flex';
});

setTimeout(() => {
    document.querySelector('.overlay').style.display = 'none';
}, 1000); // hides after 1 second

// loading overlay eka load wunata passe call karanawa
colorActiveSideBarMenuItem();
