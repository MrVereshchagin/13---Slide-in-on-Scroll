function debounce(func, wait = 20, immediate = true) { /* функция была написана до задания, попробую розобрать:
  1. функция написана для того, чтобы выполнять переданную в аргументе функцию с задержкой в 20 секунд после последнего вызова, при этом при вызове immediate функция запустится сразу же после вызова, а потом через установленное время*/ 
    var timeout; // инициирует начало работы функции
    return function() { // выполняется когда событие DOM запущено
      var context = this, args = arguments; // сохраняем контекст вызова и аргументы передаваемые в функции checkSlide
      var later = function() { // объявляем функцию которая вызывается когда заканчивается setTimeout, функция обратного вызова
        timeout = null;
        if (!immediate) func.apply(context, args); //если не immediate вызов, то запускаем функцию checkSlide заново, через метод apply
      };
      var callNow = immediate && !timeout; // задаем переменную которая опредляет хотим ли мы вызвать функцию в начале - приведет к немедленному выполнению если callNow true 
      clearTimeout(timeout); // очищаем таймер
      timeout = setTimeout(later, wait); // устанавливаем таймер заново
      if (callNow) func.apply(context, args); //вызываем функцию в начале, если immediate true
    };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  sliderImages.forEach(slideImage => { // перебираем Нодлист элементов
    const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2; // определяем пиксели где мы находимся в окне  (но не понятно последнее про середину картинки)
    const imageBottom = slideImage.offsetTop + slideImage.height; //устанавливаем низ картинки
    const isHalfShown = slideInAt > slideImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom; // сложно для восприятия ))
    if (isHalfShown && isNotScrolledPast) { // добавляем или удаляем класс в зависимости от нашего положения на экране
      slideImage.classList.add('active');
    } else {
      slideImage.classList.remove('active');
    }
  })
}

window.addEventListener('scroll', debounce(checkSlide));