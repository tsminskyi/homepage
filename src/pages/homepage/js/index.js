function openMenu() {

    var checkbox_btn = document.querySelector("#toggle");
    var burger_menu = document.querySelector(".burger-menu");

    if (checkbox_btn.checked) {
        burger_menu.classList.add("burger-menu_open");
    }
    else{
        burger_menu.classList.remove("burger-menu_open");
    }
}