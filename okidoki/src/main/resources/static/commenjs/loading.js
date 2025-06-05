//only - to show/hide the overlay
window.addEventListener('load',  ()=> {

    document.querySelector('.overlay').style.display = 'flex';
});

setInterval(() => {
    document.querySelector('.overlay').style.display = 'none';
}, 500);

