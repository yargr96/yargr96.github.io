var products = [],
    template = document.getElementById('products_section').innerHTML,
    productArea = document.querySelector('.product__area');

function Product(count) {
    this.count = count || 1;
    this.activeUnitSelect = 0;
}

Product.prototype.render = function(parent) {
    var product = document.createElement('div'),
        self = this;

    product.classList = "product_item";
    product.innerHTML = template;

    product.querySelector('.product_description > .product__link').innerHTML = this.properties.title;
    product.querySelector('.product_code').innerHTML = "Код: " + this.properties.code;
    product.querySelector('.product_photo img').setAttribute('src', this.properties.primaryImageUrl);

    var productTags = product.querySelector('.product_tags');
    productTags.innerHTML = "<p>Могут понадобиться:</p> ";
    var assocProducts = this.properties.assocProducts.split(';');
    for (var i = 0; i < assocProducts.length - 1; i++) {
        var assocProduct = document.createElement('a');
        assocProduct.classList = "url--link";
        assocProduct.setAttribute('href', '#');
        assocProduct.innerHTML = assocProducts[i].trim();

        if (i == (assocProducts.length - 2)) {
            assocProduct.innerHTML += '.';
        }
        else {
            assocProduct.innerHTML += ',';
        }

        productTags.appendChild(assocProduct);

        if (i < (assocProducts.length - 2)) {
            productTags.appendChild(document.createTextNode(' '));
        }
    }

    product.querySelector('.btn_cart').setAttribute('data-product-id', this.properties.productId);
    product.querySelector('.goldPrice').innerHTML = (this.properties.priceGoldAlt * this.count).toFixed(2);
    product.querySelector('.retailPrice').innerHTML = (this.properties.priceRetailAlt * this.count).toFixed(2);
    product.querySelector('.product_price_points > .ng-binding').innerHTML = "Можно купить за " + (Math.random() * 100 + 200).toFixed(2) + " балла";
    if (this.properties.unit == "шт.") {
        var initDesk = product.querySelector('.list--unit-desc');
        initDesk.parentNode.removeChild(initDesk);
    }
    else {
        product.querySelector('.unit--infoInn').innerHTML = this.properties.unitRatio 
                                                            + " " 
                                                            + this.properties.unit 
                                                            + " = " 
                                                            + this.properties.unitRatioAlt.toFixed(2)
                                                            + " "
                                                            + this.properties.unitAlt;
    }

    if (this.properties.unit == "м/п") {
        product.querySelector('.unit--info .ng-binding').innerHTML = "Продается м. погонными:"
    }

    var unitSelects = product.querySelectorAll('.unit--select');
    if (this.properties.unit == "шт.") {
        unitSelects[1].parentNode.removeChild(unitSelects[1]);
        unitSelects[0].querySelector('.ng-binding').innerHTML = "За шт.";
    }
    else {
        unitSelects[0].querySelector('.ng-binding').innerHTML = "За " + this.properties.unit;
        unitSelects[1].querySelector('.ng-binding').innerHTML = "За " + this.properties.unitAlt;
    }

    for (var i = 0; i < unitSelects.length; i++) {
        unitSelects[i].onclick = function(e) {
            for (var i = 0; i < unitSelects.length; i++) {
                unitSelects[i].classList.remove('unit--active');
            }

            if (unitSelects[0] == this) {
                product.querySelector('.goldPrice').innerHTML = (self.properties.priceGoldAlt * self.count).toFixed(2);
                product.querySelector('.retailPrice').innerHTML = (self.properties.priceRetailAlt * self.count).toFixed(2);
                self.activeUnitSelect = 0;
            }
            else if (unitSelects[1] == this) {
                product.querySelector('.goldPrice').innerHTML = (self.properties.priceGold * self.count).toFixed(2);
                product.querySelector('.retailPrice').innerHTML = (self.properties.priceRetail * self.count).toFixed(2);
                self.activeUnitSelect = 1;
            }

            this.classList.add('unit--active');
        }
    }

    var stepperInput = product.querySelector('.stepper-input');
    product.querySelector('.stepper').addEventListener('click', function(e) {
        if (e.target.classList.contains('up')) {
            stepperInput.value++;
            self.count++;
        }
        else if (e.target.classList.contains('down')) {
            if (stepperInput.value <= 1) {
                return;
            }
            stepperInput.value--;
            self.count--;
        }

        if (self.activeUnitSelect == 0) {
            product.querySelector('.goldPrice').innerHTML = (self.properties.priceGoldAlt * self.count).toFixed(2);
            product.querySelector('.retailPrice').innerHTML = (self.properties.priceRetailAlt * self.count).toFixed(2);
        }
        else if (self.activeUnitSelect == 1) {
            product.querySelector('.goldPrice').innerHTML = (self.properties.priceGold * self.count).toFixed(2);
            product.querySelector('.retailPrice').innerHTML = (self.properties.priceRetail * self.count).toFixed(2);
        }
        
    });

    stepperInput.addEventListener('input', function() {
        product.querySelector('.goldPrice').innerHTML = (self.properties.priceGoldAlt * self.count).toFixed(2);
        product.querySelector('.retailPrice').innerHTML = (self.properties.priceRetailAlt * self.count).toFixed(2);
    })

    parent.appendChild(product);
}



function renderProducts() {
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    readTextFile("../products.json", function(text){
        var data = JSON.parse(text);
        for (var i = 0; i < data.length; i++) {
            var product = new Product();
            product.properties = data[i];
            products.push(product);
        }

        for (var i = 0; i < products.length; i++) {
            products[i].render(productArea);
        }
    });

}

window.addEventListener('load', renderProducts);