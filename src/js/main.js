// Navigation
document.querySelectorAll('.nav-link').forEach((item, i, mass) => {
    item.addEventListener('click', function(){
        this.closest('.nav').querySelector('.nav-link.active').classList.remove('active');
        this.classList.add('active');     
    });
})

// Header make header sticky
if(document.querySelector('.header-sticky')){
    window.onscroll = function() {myFunction()};

    let header = document.querySelector('.header-sticky');
    let sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}


// Make header hide on scrolling down and show scroll up

if(document.querySelector('.header-scroll')){
    let prevScrollpos = window.pageYOffset;

    window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
            document.querySelector('.header-scroll').style.top = "0";
        } else {
            document.querySelector('.header-scroll').style.top = "-78px";
        }
        prevScrollpos = currentScrollPos;
    }
}
