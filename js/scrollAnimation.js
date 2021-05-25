const animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const item = animItems[index];
            const animItemHeight = item.offsetHeight;
            const animItemOffsetTop = offset(item).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffsetTop - animItemPoint) && (pageYOffset < animItemOffsetTop + animItemHeight))
            {
                item.classList.add('anim-active');
            } else {
                //item.classList.remove('anim-active');
            }
        }
    }//function
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }//function offset(el)

    setTimeout(() => {
        animOnScroll();
     }, 300);
}//if