window.addEventListener('DOMContentLoaded', () => {

    // Tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent () {
      tabContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
      });
  }

  function showTabContent (i = 0) {
      tabContent[i].classList.add('show', 'fade');
      tabContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click',(e) => {
      const target = e.target;

      if (target && target.classList.contains('tabheader__item')) {
          tabs.forEach((item, i) => {
              if (target == item) {
                  hideTabContent();
                  showTabContent(i);
              }
          });
      }
  });

  // Timer

  const deadline = '2022-06-10';

// Функция которая будет определять разницу между deadline и текущим времини
  function getTimeRemaining (endtime) {
    let days,hours,minutes,seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

      if (t <= 0){
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      } else {
        days = Math.floor( (t / (1000 * 60 * 60 * 24)) ),
        hours = Math.floor( (t / (1000 * 60 * 60) % 24) ),
        minutes = Math.floor( (t / 1000 / 60 ) % 60),
        seconds = Math.floor( (t / 1000) % 60); 
      }
        

    return {
        t,
        days,
        hours,
        minutes,
        seconds
    };

  }

// Функция которая добавляет 0 перед числом.
  function getZero (num) {
    if (num >=0 && num < 10){
       return `0${num}`;
    }else {
      return num;
    }
  }

//Функция которая устанавлевает таймер на страницу
  function setClock (selector,endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

// Метод который убирает мигание таймера при обновлении. 
      updateClock();

// Функция которая обновляет таймер.   
      function updateClock() {
        const t = getTimeRemaining(endtime);

        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }

    }
  }

  setClock('.timer', deadline);
 
  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


  function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';  //Останавливает прокрутку страницы     
      clearInterval(modalTimerId); 
    }

  modalTrigger.forEach(btn => {
      btn.addEventListener ('click', openModal);
  
    });

  function closeModal () {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';  //Востанавливает прокрутку.
  }


  modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    
      }
  });
  //Добавляет нажатие кнопки Esc чтоб пропадало модельное окно.
   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
      }
   });

   const modalTimerId = setTimeout(openModal,50000);

// Показывать модельное окно когда до листал до конца страницу

  function showModalByScroll () {
      if (window.pageYOffset + document.documentElement.clientHeight >= document
        .documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll',showModalByScroll);
      }
    }
    window.addEventListener('scroll', showModalByScroll);

// Используем классы для карточек

    class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title =title;
          this.descr = descr;
          this.price = price;
          this.classes = classes;
          this.parent = document.querySelector(parentSelector);
          this.transfer = 27;
          this.changeToUAH();
      }

    changeToUAH() {
      this.price = this.price * this.transfer;
    } 
    
    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.element = 'menu__item';
          element.classList.add(this.element);
        } else {
          this.classes.forEach (className  => element.classList.add(className));
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div> 
        `;
      this.parent.append(element);
    }
    
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню 'Фитнес'",
    "Меню 'Фитнес' - это новый подход к приготовлению блюд:больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    9,
    '.menu .container',
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню 'Премиум'",
    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20,
    '.menu .container',
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню 'Постное'",
    "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    14,
    '.menu .container',
  ).render();
  
  new MenuCard(
    "img/tabs/hamburger.jpg",
    "hamburger",
    "Меню 'Сбалансированное'",
    "Меню 'Сбалансированное' - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.",
    17,
    '.menu .container'

  ).render();

    // Forms

  const forms = document.querySelectorAll('form');

  const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся.',
        failure: 'Что-то пошло не так...'
  };

  forms.forEach (item => {
    postData(item);
  });

// Функция отвечающая за постинг данных.
    function postData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            margin-top: 10px;
        `;

// Гибкий метод который помогает размещать элементы в разные места верстки.
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

// Отправка данных на сервер

        fetch('server.php', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          }, 
          //body: formData     //Если форма отправки через formData
          body: JSON.stringify(object)
      })
      .then(data => data.text())
      .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
      }).catch(() => {
            showThanksModal(message.failure);
      }).finally(() => {
            form.reset();
      });
    });
  }

    function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
          <div class ="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
      `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.add('hide');
        closeModal();
      }, 4000);

    }


});