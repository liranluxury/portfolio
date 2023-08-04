document.addEventListener("DOMContentLoaded", function () {
  //эта первая верхняя строчка должна быть всегда

  let navIcon = document.querySelector(".nav-icon");
  let nav = document.querySelector(".nav");
  let navItems = document.querySelectorAll("[data-nav]");
  let mobBg = document.querySelector(".header-menu-mobile__bg ");
  let bodyEl = document.body;

  //сама вылетающая менюшка при нажатии на кнопку
  navIcon.addEventListener("click", function () {
    this.classList.toggle("nav-icon--active");
    nav.classList.toggle("nav--active");
    mobBg.classList.toggle("open");
    bodyEl.classList.toggle("lock");
    let delay = 0;
    for (let i = 0; i < navItems.length; i++) {
      setTimeout(function () {
        navItems[i].classList.toggle("item-animate");
      }, 50 + delay);
      delay += 60;
    }
  });

  // Обходим ссылки методом forEach
  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      //для каждой ссылки добавляем прослушку по событию "клик"
      navIcon.classList.remove("nav-icon--active");
      mobBg.classList.remove("open");
      //убираем активный класс у иконки мобильной навигации
      nav.classList.remove("nav--active");
      //убираем активный класс у самой навигации
      for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("item-animate");
      }
    });
  });

  let formItems = document.querySelectorAll(".form-field");
  for (let item of formItems) {
    let thisParent = item.closest(".form-item");
    let thisPlaceholder = thisParent.querySelector(".span-placeholder");

    // если инпут в фокусе
    item.addEventListener("focus", function () {
      thisPlaceholder.classList.add("active");
    });
    // если инпут теряет фокус
    item.addEventListener("blur", function () {
      if (item.value.length > 0) {
        thisPlaceholder.classList.add("active");
      } else {
        thisPlaceholder.classList.remove("active");
      }
    });
  }
});

// ***********************************

$(".contacts__message-out").validate({
  rules: {
    email: {
      //слово email это name который я дала input в html
      required: true,
      email: true,
    },
    message: {
      //слово message это name который я дала input в html
      required: true,
    },
  },
  messages: {
    email: {
      required: "Введите email",
      email: "отсутствует символ @",
    },
    message: {
      required: "Поле не должно быть пустым",
    },
  },
  submitHandler: function (form) {
    ajaxFormSubmit();
  },
});
// ********************************************

// функция AJAX запроса на сервер

function ajaxFormSubmit() {
  let string = $(".contacts__message-out").serialize(); //сохраняет все данные введенные в форму

  //формируем ajax запрос
  $.ajax({
    type: "POST", //тип запроса - POST
    url: "php/mail.php", //куда отрпавляем запрос
    data: string, //какие данные отправляем, в данном случае отправляем переменную string

    //функция, если все прошло успешно
    success: function (html) {
      $(".contacts__message-out").slideUp(800);
      $("#answer").html(html);
    },
  });
  //ятобы по submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
  return false;
}

// паралакс движения за мышкой
let prxScene = document.querySelector(".parallax-scene");
let prxItem = document.querySelectorAll(".parallax");
if (prxScene) {
  prxScene.addEventListener("mousemove", function (e) {
    let x = (e.clientX / window.innerWidth) * 120;
    let y = (e.clientY / window.innerHeight) * 70;
    for (let item of prxItem) {
      item.style.transform = `translate(-${x}px,-${y}px)`;
    }
  });
}
