document.addEventListener('DOMContentLoaded', function () {

    // Task 1 Show Products
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
            console.log(item)
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
            console.log(item)
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

    // Task 1 Show Products END
});