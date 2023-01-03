// дэлгэцтэй ажиллах контроллер
var uiController = (function() {

})();

// Санххүтэй ажиллах контроллер
var financeController = (function() {

})();

// Програмын холбогч контролллер
var appController = (function(uiController, financeController) {

    var ctrlAddItem = function() {
        console.log('Дэлгэцээс өгөдлөө авах хэсэг.');
        // 1. Оруулах өгөдлийг дэлгэцээс олж авна
        // 2. Олж авсан өгөгдлүүдээ Санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    }

    document.querySelector(".add__btn").addEventListener('click', function() {
        ctrlAddItem();
    });

    document.addEventListener('keypress', function(event) {
        //console.log(event);
        if(event.code === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(uiController, financeController);