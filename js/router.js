'use strict';
define([
    "./model.js",
    "./view.js",
    "./controller.js"
  ],
  function(Model, View, Controller) {

    class Router {
      constructor(map, rootElement) {
        this.map = map;
        this.rootElement = rootElement;
        // Подписаться на событие hashchange
        window.addEventListener('hashchange', this.onhashchange.bind(this));
      }

      onhashchange() {
        const activeHash = document.location.hash;
        // Отрисовать страницу для нового адреса
        this._route(activeHash);
      }

      _route(route) {
        const settings = this.map[route];
        if (settings) {
          this.rootElement.innerHTML = '';
          // запустить контроллер страницы,
          // которая соответствует адресу,
          // на который нужно перейти
          settings.runController(this.rootElement);
        }
      }

      navigateTo(route) {
        // Выполнить начальную навигацию на адрес по умолчанию
        if (document.location.hash === route && this.loaded) return;
        this._route(route);
        document.location.hash = route;
        this.loaded = true;
      }
    }

    new Router({
      '#clock1': {
        pageName: 'London time',
        runController: rootElement => {
          new Controller.Controller(
            new Model.Model(0),
            new View.ClockDOMView(rootElement));
        }
      },
      '#clock2': {
        pageName: 'Minsk time',
        runController: rootElement => {
          new Controller.Controller(
            new Model.Model(3),
            new View.ClockDOMView(rootElement));
        }
      },
      '#clock3': {
        pageName: 'New York time',
        runController: rootElement => {
          new Controller.Controller(
            new Model.Model(-5),
            new View.ClockSVGView(rootElement));
        }
      }
    }, document.body).navigateTo('#clock2');

    return {
      Router: Router
    };
  });