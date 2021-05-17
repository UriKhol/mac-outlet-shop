document.addEventListener('DOMContentLoaded', function () {

    // Task 1
    for (let item of items) {
        createProduct(item);
    }

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

    // Task 1 END

    // Task 2

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

    // Task 2 END
});