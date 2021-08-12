// navigation menu 

(() => {

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect() {

        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {

            document.querySelector(".fade-out-effect").classList.remove("active");




        }, 300)


    }
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('link-item')) {
            if (event.target.hash !== "") {
                event.preventDefault();
                const hash = event.target.hash;
                console.log(hash);
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                navMenu.querySelector(".active").classList.add("outer-sadow", "hover-in-sadow");

                navMenu.querySelector(".active").classList.remove("active", "inner-sadow");


                if (navMenu.classList.contains("open")) {

                    event.target.classList.add("active", "inner-sadow");
                    event.target.classList.remove("outer-sadow", "hover-in-sadow");
                    hideNavMenu();
                    console.log("contain");
                } else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            item.classList.add("active", "inner-sadow");
                            item.classList.remove("outer-sadow", "hover-in-sadow");
                        }
                    })
                    fadeOutEffect();
                }
                window.location.hash = hash;

            }
        }
    })

})();




















// about section tabs
(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        // console.log(event.target);
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            // console.log("event.target contains 'tab-item' calss and not contains'active' calss");
            // console.log(event.target);
            const target = event.target.getAttribute("data-target");

            tabsContainer.querySelector(".active").classList.remove("outer-sadow", "active");
            event.target.classList.add("active", "outer-sadow");
            console.log(target);
            var element1 = aboutSection.querySelector(".tab-content.active");
            console.log(element1);
            element1.classList.remove("active");
            var element2 = aboutSection.querySelector(target);
            element2.classList.add("active");


        }

    })


})();

function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}




// portfolio filter and popup

(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndx, slideIndex, screenshots;
    // filter portfolio items
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            filterContainer.querySelector(".active").classList.remove("outer-sadow", "active");
            event.target.classList.add("active", "outer-sadow");

            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                // console.log(item);
                // console.log(item.getAttribute("data-category"));
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })

        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        // console.log(event.target);
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // console.log(portfolioItem);
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            console.log(itemIndex);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            console.log(screenshots);

            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                prevBtn.style.display = "block";
            }
            console.log(screenshots);
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();

        }


    })
    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        console.log(imgSrc);
        const popupImg = popup.querySelector(".pp-img");
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
    })
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails() {
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return;
        }

        projectDetailsBtn.style.display = "block";

        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const titile = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = titile;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        console.log(category);
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }



    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        // console.log("hey");
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            // console.log("true");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }
})();




// hide all section except active

(() => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");

        }


    })

})();

// email vaild

function sendMail(parms) {
    var tempParams = {
        Name: document.getElementById("Name").value,
        Subject: document.getElementById("Subject").value,
        Sender: document.getElementById("Sender").value,
        Message: document.getElementById("Message").value,
    }
    emailjs.send('gmailservice', 'template_iyhujls', tempParams).then(function(res) {
        console.log("success", res.status);
        alert("success", res.status);
    })

}






// preloader
window.addEventListener("load", () => {

    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";


    }, 600)

})





















// testomonial slider
// (() => {

//     const sliderContainer = document.querySelector(".testi-slider-container"),
//         slides = sliderContainer.querySelectorAll(".testi-item"),
//         slidewidth = sliderContainer.offsetWidth,
//         prevBtn = document.querySelector(".testi-slider-nav .prev"),
//         nextBtn = document.querySelector(".testi-slider-nav .next");
//     let slideIndex = 0;
//     slides.forEach((slide) => {
//         slide.style.width = slidewidth + "px";
//     })

//     sliderContainer.style.width = slidewidth + slides.length + "px";
//     nextBtn.addEventListener("click", () => {
//         if (slideIndex === slides.length - 1) {
//             slideIndex = 0;
//         } else {
//             slideIndex++;
//         }
//         console.log(slideIndex);
//         sliderContainer.style.marginLeft = -(slidewidth * slideIndex) + "px";
//     })

// })();