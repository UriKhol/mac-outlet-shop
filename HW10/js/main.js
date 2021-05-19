document.addEventListener('DOMContentLoaded', function () {

    // Task 8
    function drawingProducts(array) {
        // Clear
        document.querySelector('.products__row').innerHTML = "";

        // Push products
        for (let item of array) {
            createProduct(item);
        }
    }

    drawingProducts(items)

    function createProduct(item) {
        let wrapper = document.querySelector('.products__row'),
            product = document.createElement('div'),
            inStockImg;

        product.setAttribute('class', 'product');

        item.orderInfo.inStock > 0 ? inStockImg = "images/icons/accept.png" : inStockImg = "images/icons/empty.png";

        product.innerHTML = `
                <div class="product__amount">
                    <div class="product__amount-img">
                        <img src="${inStockImg}" alt="check">
                    </div>
                    <div class="product__amount-text">
                        <span class="product__amount-num">${item.orderInfo.inStock}</span> left in stock
                    </div>
                </div>
                <div class="product__price">Price: <span class="product__price-num">${item.price}</span> $</div>
                     <div class="product__bottom">
                <div class="product__bottom-like">
                    <img src="images/icons/red-like.png" alt="like_filled">
                </div>
                <div class="product__bottom-reviews">
                    <span class="product__bottom-percent">${item.orderInfo.reviews}</span>% Positive reviews <br> Above
                    avarage
                </div>
                <div class="product__bottom-orders">
                    <span class="product__bottom-orders-num">382</span> <br> orders
                </div>
            </div>

            <div class="product__like">
                <img src="images/icons/like_empty.svg" alt="like_empty">
            </div>
            `;

        product.prepend(createTitle(item));
        product.prepend(createImg(item));
        product.append(createButton(item));

        wrapper.append(product);
    }

    function createImg(item) {
        let imgWrap = document.createElement('div'),
            img = document.createElement('img');

        img.setAttribute('src', `images/${item.imgUrl}`);

        img.onclick = function () {
            modal(item)
        };

        imgWrap.setAttribute('class', 'product__img');
        imgWrap.appendChild(img);

        return imgWrap;
    }

    function createTitle(item) {
        let title = document.createElement('div');
        title.setAttribute('class', `product__title`);
        title.innerText = item.name;

        title.onclick = function () {
            modal(item)
        }

        return title;
    }

    function createButton(item) {
        let buttonWrap = document.createElement('div'),
            button = document.createElement('button');

        button.innerText = 'Add to cart'
        button.setAttribute('class', 'btn btn-primary');

        if (item.orderInfo.inStock == 0) button.setAttribute('disabled', 'disabled');

        button.onclick = function () {
            console.log(item)
        }

        buttonWrap.setAttribute('class', 'text-center');
        buttonWrap.appendChild(button)

        return buttonWrap;
    }

    // Task 8 END

    // Task 9

    function accordion() {
        let buttons = document.querySelectorAll('.accordion__button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', showAccordionCollapse)
        }

        function showAccordionCollapse() {
            this.classList.toggle('active');
            let accordionCollapse = this.nextElementSibling;

            if (!accordionCollapse.classList.contains('show')) {
                accordionCollapse.classList.add('show');
                accordionCollapse.style.height = 'auto';

                let height = accordionCollapse.clientHeight + 'px';

                accordionCollapse.style.height = '0px';

                setTimeout(function () {
                    accordionCollapse.style.height = height;
                }, 0);
            } else {
                accordionCollapse.style.height = '0px';

                accordionCollapse.addEventListener('transitionend',
                    function () {
                        accordionCollapse.classList.remove('show');
                    }, {
                        once: true
                    });
            }
        }
    }

    accordion()

    function modal(item) {
        let modal = document.querySelector('.modal'),
            img = document.querySelector('.modal__img'),
            title = document.querySelector('.modal__title'),
            recallPercent = document.querySelector('.modal__recall-percent'),
            optionsList = document.querySelector('.modal__options'),
            price = document.querySelector('.modal__price span'),
            amount = document.querySelector('.modal__amount span'),
            modalRightSide = document.querySelector('.modal__right'),
            modalRightSideBtn = modalRightSide.querySelector('.text-center');

        modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    modal.classList.remove('show')
                }
            }
        )

        if (modalRightSideBtn) modalRightSide.querySelector('.text-center').remove()

        img.src = `images/${item.imgUrl}`;
        title.innerHTML = item.name;
        recallPercent.innerHTML = item.orderInfo.reviews;
        price.innerHTML = item.price;
        amount.innerHTML = item.orderInfo.inStock;

        optionsList.innerHTML = `<li class="modal__options-item">Color: ${item.color.join(', ')}</li>`;
        optionsList.innerHTML += `<li class="modal__options-item">Operating System: ${item.os}</li>`;
        optionsList.innerHTML += `<li class="modal__options-item">Chip: ${item.chip.name}</li>`;
        optionsList.innerHTML += `<li class="modal__options-item">Height: ${item.size.height}</li>`;
        optionsList.innerHTML += `<li class="modal__options-item">Width: ${item.size.width}</li>`;
        optionsList.innerHTML += `<li class="modal__options-item">Depth: ${item.size.depth}</li>`;
        optionsList.innerHTML += `<li class="modal__options-item">Weight: ${item.size.weight}</li>`;

        modalRightSide.append(createButton(item))
        modal.classList.add('show');
    }

    // Task 9 END

    // Task 10
    function productsFiltration() {
        let minPrice = document.querySelector('.price-filter__input--minimum'),
            maxPrice = document.querySelector('.price-filter__input--maximum'),
            checkboxes = document.querySelectorAll('.custom-checkbox'),
            filter = {
                minPrice: '',
                maxPrice: '',
                color: [],
                memory: [],
                os: [],
                display: []
            };


        function maxPriceOfProduct() {
            let mostExpensiveProduct = items.reduce((acc, curr) => acc.price > curr.price ? acc : curr),
                cheapestProduct = items.reduce((acc, curr) => acc.price < curr.price ? acc : curr);

            if (cheapestProduct.price > this.value) {
                this.value = cheapestProduct.price;
                filter.maxPrice = cheapestProduct.price;
            }
            else if (mostExpensiveProduct.price > this.value) {
                filter.maxPrice = this.value;
            }
            else {
                this.value = mostExpensiveProduct.price;
                filter.maxPrice = mostExpensiveProduct.price;
            }

            getDataFilter()
        }

        function minPriceOfProduct() {
            let cheapestProduct = items.reduce((acc, curr) => acc.price < curr.price ? acc : curr);

            if (cheapestProduct.price < this.value) {
                filter.minPrice = this.value;
            } else {
                this.value = cheapestProduct.price;
                filter.minPrice = cheapestProduct.price;
            }
            getDataFilter()
        }

        function checkCheckboxes() {
            let name = this.getAttribute('name'),
                value = this.value;

            filter[name].includes(value) ? filter[name] = filter[name].filter(item => item !== value) : filter[name].push(value);

            getDataFilter()
        }

        function getDataFilter() {
            let newArray = items.filter(function (item) {
                let colors = item.color.filter(color => filter.color.indexOf(color) >= 0),
                    memory = filter.memory.indexOf(String(item.storage)),
                    os = filter.os.indexOf(item.os),
                    display = false;

                filter.display.forEach(sizes => {
                    let minSize = sizes.split('-')[0],
                        maxSize = sizes.split('-')[1];

                    if (item.display >= minSize && item.display <= maxSize) display = true;
                })

                // filter
                if ((filter.minPrice <= item.price || filter.minPrice.length == 0)
                    && (filter.maxPrice >= item.price || filter.maxPrice.length == 0)
                    && (colors.length != 0 || filter.color.length == 0)
                    && (memory != -1 || filter.memory.length == 0)
                    && (os != -1 || filter.os.length == 0)
                    && (display || filter.display.length == 0)
                ) return item
            })
            drawingProducts(newArray);
        }

        minPrice.addEventListener('change', minPriceOfProduct)
        maxPrice.addEventListener('change', maxPriceOfProduct)

        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('change', checkCheckboxes)
        }
    }

    productsFiltration()
    // Task 10 END
});