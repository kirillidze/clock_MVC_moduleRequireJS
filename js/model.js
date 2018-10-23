'use strict';
define(function() {
    class Model {
        constructor(timezone) {
            this.timezone = timezone; // TODO: добавить зоны
            this.changeListener = null;
            // модель предоставляет поле date для чтения извне
            this.date = new Date();
            let timezoneHours = this.date.getUTCHours() + timezone;
            this.date.setHours(timezoneHours);
            // модель обновляет себя
            setInterval(() => {
                this.date = new Date();
                timezoneHours = this.date.getUTCHours() + timezone;
                this.date.setHours(timezoneHours);
                if (typeof(this.changeListenerCallback) === 'function') {
                    // и нотифицирует слушателя путем вызова
                    // его функции обратного вызова
                    this.changeListenerCallback();
                }
            }, 1000);
        }

        setChangeListener(changeListener) {
            this.changeListenerCallback = changeListener;
        }
    }
    return {
        Model: Model
    };
});