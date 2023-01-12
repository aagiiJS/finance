// дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    // Олон классуудыг Index.html-ээс сонгон авахад сүүлдээ алдаа гарвал асуудал үсэх тул тусад нь авах
    var DOMstrings = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        ExpenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        containerDiv: ".container",
        expensePersentageLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    };

    var nodeListForeach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    // Тоог форматлах
    var formatMoney = function(too, type) {
        too = '' + too;
        var a = too;

    var x = a.split("").reverse().join("");

    var y = '';
    var count = 1;

    for(var i=0; i < x.length; i++)
    {
    y = y + x[i];

    if( count%3 === 0 ) y = y + ',';
    count ++;
    }

    var z = y.split("").reverse().join("");
    
    if(z[0] === ',') z = z.substring(1, z.length - 1);

    if(type === 'inc') z = '+ ' + z;
    else z = '- ' + z;

    return z;

    };

    return {
        displayDate: function() {
            var unuudur = new Date();
            document.querySelector(DOMstrings.dateLabel).textContent = unuudur.getFullYear() + " оны " + unuudur.getMonth() + " сарын ";

        },

        getInput: function() {
            return {
                //Орлого зарлага алийг сонгосныг авах
                type: document.querySelector(DOMstrings.inputType).value,
                //Орлого зарлагын нэрийг авах
                description: document.querySelector(DOMstrings.inputDesc).value,
                //Үнийн дүнг авч тэмдэгт мөрийг тоо болгох
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
            
        },

        displayPercentages: function(allPercentages) {
            // Зарлагын NodeList-ийг олох Жнь: <button>Click</button>
            var elements = document.querySelectorAll(DOMstrings.expensePersentageLabel);

            // Элемент болгоны хувьд зарлагын хувийг масиваас авч шивж оруулах
            nodeListForeach(elements, function(el, index) {
                el.textContent = allPercentages[index];
            });
        },

        // addBtn өөр контроллер дотор тул уншиж чадахгүй тул шинэ БУЦААЛТ үүсгэж уншина
        getDOMstrings: function() {
            return DOMstrings;
        },
        // Бичсэн нэр үнэ 2-г дахин бичихэд бэлэн болгох(Өгөгдлийг цэвэрлэх).нэр үнэ 2-ыг лист рүү оруулж хадгалах
        clearFields: function() {
            var fields = document.querySelectorAll(DOMstrings.inputDesc + ", " + DOMstrings.inputValue);

            // Convert list to Array
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(el, index, array)  {
                el.value = "";
            });
            
            // Курсорыг дуудах
            fieldsArr[0].focus();
            /*
            for(var i = 0; i < fieldsArr.length; i++) {
                fieldsArr[i].value = "";
            }*/

        },

        tusviigUzuuleh: function(tusuv) {
            var type;
            if(tusuv.tusuv > 0) type = 'inc';
            else type = 'exp';
            document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(tusuv.tusuv, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(tusuv.totalInc, 'inc');
            
            if(tusuv.huvi !== 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
            }
            
            document.querySelector(DOMstrings.ExpenseLabel).textContent = formatMoney(tusuv.totalExp, 'exp');
        },

        // Дэлгэцээс бичлэг устгах function
        deleteListItem: function(id) {
            var recItem = document.getElementById(id);
            recItem.parentNode.removeChild(recItem);
        },

        addListItem: function(item, type) {
            // Орлого зарлагын элементийг gгуулсан HTML-ийг бэлтгэнэ
            var html, list;
            if(type === 'inc') {
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглан өөрчилнө
            html = html.replace('%id%', item.id);
            html = html.replace('%DESCRIPTION%', item.description);
            html = html.replace('%VALUE%', formatMoney(item.value, type));
            // Бэлтгэсэн HTML-ээ DOM руу хийж өгнө
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
    };
})();

// Санхүүтэй ажиллах контроллер
var financeController = (function() {
    // private data-нууцлагдсан өгөгдлүүд
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // private data - нуугдмал өгөгдлүүд хүн хандахгүй
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    //Тухайн зардагын нийт орлогод эзлэх хувийг тооцох totalIncome нь нийт орлогыг хүлээн авна
    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome) * 100);
        else this.percentage = 0;
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.items[type].forEach(function(el) {
            sum = sum + el.value;
        });

        data.totals[type] = sum;
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
        },

        tusuv: 0,
        huvi: 0
    };

    return {
        tusuvTootsooloh: function() {
            // Нийт орлогын нийлбэр
            calculateTotal('inc');
            // Нийт зарлагын нийлбэр
            calculateTotal('exp');
            // Төсвийг шинээр тооцох
            data.tusuv = data.totals.inc - data.totals.exp;
            //Орлого, зарлагын хувийг тооцоолох
            if(data.totals.inc > 0) {
                data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.huvi = 0;
            }
            
        },
        //Тухайн зардагын нийт орлогод эзлэх хувийг тооцсон хувийг хүлээн авах
        calculatePercentages: function() {
            data.items.exp.forEach(function(el) {
                //totalIncome утга авах байсныг data.totals.inc properti-гоор дамжуулж байна 
                el.calcPercentage(data.totals.inc);
            }); 
        },

        getPercentages: function() {
            var allPercentages = data.items.exp.map(function(el) {
                return el.getPercentage();
            });

            return allPercentages;
        },

        tusviigAvah: function() {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },

        deleteItem: function(type, id) {
            var ids = data.items[type].map(function(el) {
                return el.id;
            });

            var index = ids.indexOf(id);
            if(index !== -1) {
                data.items[type].splice(index, 1);
            }
        },

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

        // Талбарууд хоосон биш байж өгөгдлүүд орно
        if(input.description !== "" && input.value !== "") {
            // 2. Олж авсан өгөгдлүүдээ Санхүүгийн контроллерт дамжуулж тэнд хадгална.
            var item = financeController.addItem(input.type, input.description, input.value);
        };
 
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        uiController.addListItem(item, input.type);
        uiController.clearFields();
        
        // Төсвийг шинээр тооцоолж дэлгэцэнд үзүүлнэ
        updateTusuv();
    };

    var updateTusuv = function() {
        // 4. Төсвийг тооцоолно.
        financeController.tusuvTootsooloh();
        
        // 5. Эцсийн үлдэгдэл, 
        var tusuv = financeController.tusviigAvah();

        // 6.тооцоог дэлгэцэнд гаргана.
        uiController.tusviigUzuuleh(tusuv);

        // 7. Зарлагуудын хувийг тооцоолно
        financeController.calculatePercentages();

        // 8. Тооцоолсон хувиудыг хүлээн авна
        var allPercentages = financeController.getPercentages();

        // 9. Хүлээж авсан хувиа дэлгэцэнд гаргана
        uiController.displayPercentages(allPercentages);
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
    // Орлого, зарлагаас бичлэг устгах
    //containerDiv=".container"-ээр лист үүгэнэ
    document.querySelector(DOM.containerDiv).addEventListener('click', function(event) {
        // устгах бичлэгийн id-гаа олж id хувьсагчид хийнэ
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //Өөр id авахаас сэргийлж id-гаа мөн бишийг шалгана
        //id-гаар нь split хийж массив үүсгээд
        // 1. arr-гийн 0 дугаар элемент inc буюу exp байна
        // 2. arr-гийн 1 дугаар элемент id нь байна
        if(id) {
            var arr = id.split('-');
            var type = arr[0];
            //авсан itemId тэмдэгт мөр тул тоо болгоно
            var itemId = parseInt(arr[1]);

            // 1. Санхүүгийн моделиус type, id ашиглаад устгана
            financeController.deleteItem(type, itemId);
            // 2. Дэлгэц дээрээс энэ бичлэгийг устгана
            uiController.deleteListItem(id);
            // 3. Үлдэгдлийн тооцоог шинэчилж харуулна
            // Төсвийг шинээр тооцоолж дэлгэцэнд үзүүлнэ
            updateTusuv();
        }
        
    });

    };

    return {
        init: function() {
            console.log("App started ..");
            uiController.displayDate();
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            });
            
            setupEventListeners();
        }
    };
})(uiController, financeController);

appController.init();