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
        },

        addListItem: function(item, type) {
            // Орлого зарлагын элементийг gгуулсан HTML-ийг бэлтгэнэ
            var html, list;
            if(type === 'inc') {
                list = '.income__list'
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = '.expenses__title'
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">- %VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглан өөрчилнө
            html = html.replace('%id%', item.id);
            html = html.replace('%DESCRIPTION%', item.description);
            html = html.replace('%VALUE%', item.value);
            // Бэлтгэсэн HTML-ээ DOM руу хийж өгнө
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
    };
})();

// Санххүтэй ажиллах контроллер
var financeController = (function() {
    // private data-нууцлагдсан өгөгдлүүд
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
        items: {
            inc: [],
            exp: []
        },

        // Орлого зарлагын нийлбэр
        totals: {
            inc: 0,
            exp: 0
        }
    };

    return {
        addItem: function(type, desc, val) {
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if(type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;
        }
    };


    //data.allItems.inc.push(i1);
    //data.allItems.inc[0];
    
})();

// Програмын холбогч контролллер
var appController = (function(uiController, financeController) {

    //Шинэ БУЦААЛТАА уншихын тулд хувьсагчид өгөдлийг түүгээрээ дамжуулж өгөгдлөө уншиж авна.
    var ctrlAddItem = function() {
       // 1. Оруулах өгөдлийг дэлгэцээс олж авна
        var input = uiController.getInput();

        // 2. Олж авсан өгөгдлүүдээ Санхүүгийн контроллерт дамжуулж тэнд хадгална.
        var item = financeController.addItem(input.type, input.description, input.value);
        
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        uiController.addListItem(item, input.type);
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