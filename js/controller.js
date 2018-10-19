 define(function() {
     class Controller {
         constructor(model, view) {
             this.model = model;
             this.view = view;
             // контроллер при снятии флажка в представлении
             // перестает слушать изменения модели,
             // а при установке - продолжает
             this.view.setChangeHandler(
                 started => {
                     if (started) {
                         this.registerModelHandler();
                     } else {
                         this.model.setChangeListener(null);
                     }
                 }
             );
             this.registerModelHandler();
         }

         registerModelHandler() {
             this.model.setChangeListener(
                 () => this.handleModelChange());
             this.handleModelChange();
         }

         handleModelChange() {
             // при вызове функции обратного вызова
             // контроллер перерисовывает представление
             this.view.render(this.model);
         }
     }
     return {
         Controller: Controller
     };
 });