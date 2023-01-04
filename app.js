// дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    // Олон классуудыг Index.html-ээс сонгон авахад сүүлдээ алдаа гарвал асуудал үсэх тул тусад нь авах
    var DOMstrings = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    };
    return {
        getInput: function() {
            return {
                //Орлого зарлага алийг сонгосныг авах
                type: document.querySelector(DOMstrings.inputType).value,
                //Орлого зарлагын нэрийг авах
                description: document.querySelector(DOMstrings.inputDesc).value,
                //Үнийн дүнг авах
                value: document.querySelector(DOMstrings.inputValue).value
            };
            
        },

        // addBtn өөр контроллер дотор тул уншиж чадахгүй тул шинэ БУЦААЛТ үүсгэж уншина
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

// Санххүтэй ажиллах контроллер
var financeController = (function() {

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        // Орлого-Зарлагаа хадгалах
        allItems: {
            inc: [],
            exp: []
        },

        // Орлого зарлагын нийлбэр
        totals: {
            inc: 0,
            exp: 0
        }
    }

    //data.allItems.inc.push(i1);
    //data.allItems.inc[0];
    
})();

// Програмын холбогч контролллер
var appController = (function(uiController, financeController) {

    //Шинэ БУЦААЛТАА уншихын тулд хувьсагчид өгөдлийг түүгээрээ дамжуулж өгөгдлөө уншиж авна.
    

    var ctrlAddItem = function() {
        
        
        // 1. Оруулах өгөдлийг дэлгэцээс олж авна
        console.log(uiController.getInput());
        // 2. Олж авсан өгөгдлүүдээ Санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    };

    var setupEventListeners = function() {
        var DOM = uiController.getDOMstrings();

        //Товч дарахад хийх үйлдэл
    document.querySelector(DOM.addBtn).addEventListener('click', function() {
        ctrlAddItem();
    });
    // Enter дарахад хийх үйлдэл
    document.addEventListener('keypress', function(event) {
        //console.log(event);
        if(event.code === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
    };

    return {
        init: function() {
            console.log("App started ..");
            setupEventListeners();
        }
    };
})(uiController, financeController);

appController.init();