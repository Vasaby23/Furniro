
        function setCookie(name, value) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
        }

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return decodeURIComponent(parts.pop().split(';').shift());
            }
            return null;
        }

        document.addEventListener('DOMContentLoaded', () => {
            console.log('Page Loaded');
            
            const button = document.getElementById('add-to-cart');
            const cartStatus = getCookie('item-1-cart');
            updateButtonText();
            updateQuantity();

            button.addEventListener('click', function() {
                if (button.textContent === 'Add to cart') {
                    button.textContent = 'Remove from cart';
                    localStorage.setItem('cartStatus', 'added');
                    setCookie('item-1-cart', 'item-add');
                } else {
                    button.textContent = 'Add to cart';
                    localStorage.setItem('cartStatus', 'not-added');
                    setCookie('item-1-cart', 'item-not-add');
                }
                console.log('Current cookie value:', getCookie('item-1-cart'));
                updateDisplay();
            });

            const decreaseButton = document.getElementById('decrease');
            const increaseButton = document.getElementById('increase');
            const quantitySpan = document.getElementById('quantity');

            decreaseButton.addEventListener('click', () => {
                let currentQuantity = parseInt(quantitySpan.textContent);
                if (currentQuantity > 1) {
                    quantitySpan.textContent = currentQuantity - 1;
                    setCookie('item-quantity', quantitySpan.textContent);
                }
            });

            increaseButton.addEventListener('click', () => {
                let currentQuantity = parseInt(quantitySpan.textContent);
                quantitySpan.textContent = currentQuantity + 1;
                setCookie('item-quantity', quantitySpan.textContent);
            });

  
            function updateButtonText() {
                const button = document.getElementById('add-to-cart');
                const cartStatus = localStorage.getItem('cartStatus');
                if (cartStatus === 'added') {
                    button.textContent = 'Remove from cart';
                } else {
                    button.textContent = 'Add to cart';
                }
            }

            function updateQuantity() {
                const quantitySpan = document.getElementById('quantity');
                const quantity = getCookie('item-quantity');
                if (quantity) {
                    quantitySpan.textContent = quantity;
                }
            }

            const likeIcons = document.querySelectorAll('.like-icon');
            const mainLikeIcon = document.querySelector('.like-main');
            function updateMainLikeIcon() {
                const isLiked = Array.from(likeIcons).some(icon => icon.classList.contains('liked'));
                mainLikeIcon.src = isLiked ? '/imgs/icon-park-solid--like.svg' : '/imgs/like.svg';
                setCookie('mainLikeIconState', isLiked ? 'liked' : 'not-liked');
            }

            const likes = [
                { linkId: 'like-link-1', iconId: 'like-icon-1', cookieKey: 'likeState-1' },
                { linkId: 'like-link-2', iconId: 'like-icon-2', cookieKey: 'likeState-2' },

            ];

            likes.forEach(({ linkId, iconId, cookieKey }) => {
                const likeLink = document.getElementById(linkId);
                const likeIcon = document.getElementById(iconId);
                likeIcon.classList.add('like-icon');

                const initialLikeState = getCookie(cookieKey);
                if (initialLikeState === 'liked') {
                    likeIcon.src = '/imgs/icon-park-solid--like.svg';
                    likeIcon.classList.add('liked');
                } else {
                    likeIcon.src = '/imgs/like-2.svg';
                    likeIcon.classList.remove('liked');
                }

                likeLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    if (likeIcon.classList.contains('liked')) {
                        likeIcon.src = '/imgs/like-2.svg';
                        likeIcon.classList.remove('liked');
                        setCookie(cookieKey, 'not-liked');
                    } else {
                        likeIcon.src = '/imgs/icon-park-solid--like.svg';
                        likeIcon.classList.add('liked');
                        setCookie(cookieKey, 'liked');
                    }
                    updateMainLikeIcon();
                });
            });

            function setCookie(name, value) {
                const expires = new Date();
                expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
                document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
            }
            function getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) {
                    return decodeURIComponent(parts.pop().split(';').shift());
                }
                return null;
            }
    
            function updateDisplay() {
                const cartStatus = getCookie('item-1-cart');
                const itemBasketNumber = document.querySelector('.item-basket-number');
                if (cartStatus === 'item-add') {
                    itemBasketNumber.classList.add('show-item');
                } else {
                    itemBasketNumber.classList.remove('show-item');
                }
            }
    
            document.addEventListener('DOMContentLoaded', () => {
                updateDisplay();
    
                const button = document.getElementById('add-to-cart');
                button.addEventListener('click', function() {
                    const currentStatus = getCookie('item-1-cart');
                    if (currentStatus === 'item-add') {
                        setCookie('item-1-cart', 'item-not-add');
                    } else {
                        setCookie('item-1-cart', 'item-add');
                    }
                    updateDisplay(); 
                });
            });

            updateDisplay();

            const btnLike = document.querySelector('.btn-like');
            btnLike.addEventListener('click', function(event) {
                event.preventDefault();
                const likeDiv = document.querySelector('.like-div');
                likeDiv.classList.toggle('show');
            });

            const likeDivCloseButton = document.querySelector('.like-div-close');
            likeDivCloseButton.addEventListener('click', function(event) {
                event.preventDefault();
                const likeDiv = document.querySelector('.like-div');
                likeDiv.classList.remove('show');
            });

            const dislikeButtons = document.querySelectorAll('.dislike');
            dislikeButtons.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    const parentLikedItemDiv = event.target.closest('.liked-item-div');
                    if (!parentLikedItemDiv) return;

                    parentLikedItemDiv.remove();

                    const likedIndex = parentLikedItemDiv.classList[0].replace('liked-item-div-', '');
                    const likeIcon = document.getElementById(`like-icon-${likedIndex}`);
                    if (likeIcon) {
                        likeIcon.src = '/imgs/like-2.svg';
                        likeIcon.classList.remove('liked');
                    }

                    const likeStateCookie = `likeState-${likedIndex}`;
                    setCookie(likeStateCookie, 'not-liked');

                    updateDisplay();
                });
            });
        });
        document.addEventListener('DOMContentLoaded', () => {
            const basketIcon = document.querySelector('.basket-main');
            const shoppingCart = document.querySelector('.shopping-cart');
            const closeBasketLink = document.getElementById('close-basket-a');
            const backOpacity = document.querySelector('.back-opacity');

            basketIcon.addEventListener('click', () => {
                basketIcon.classList.add('hide-basket');
                basketIcon.classList.remove('show-basket');
                shoppingCart.classList.add('show-cart');
                backOpacity.style.display = 'block';
            });

            closeBasketLink.addEventListener('click', (event) => {
                event.preventDefault();
                shoppingCart.classList.remove('show-cart');
                basketIcon.classList.remove('hide-basket');
                basketIcon.classList.add('show-basket');
                backOpacity.style.display = 'none'; 
            });
        });


        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return decodeURIComponent(parts.pop().split(';').shift());
            }
            return null;
        }

        function updateLikedItemDiv() {
            const cartStatus = getCookie('item-1-cart');
            const likedItemDiv = document.querySelector('.liked-item-div');

            if (cartStatus === 'item-add') {
                likedItemDiv.classList.add('show-item-1');
            } else if (cartStatus === 'item-not-add') {
                likedItemDiv.classList.remove('show-item-1');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateLikedItemDiv();

            const toggleButton = document.getElementById('toggle-item');
            toggleButton.addEventListener('click', () => {
                const cartStatus = getCookie('item-1-cart');
                if (cartStatus === 'item-add') {
                    setCookie('item-1-cart', 'item-not-add', 7);
                } else {
                    setCookie('item-1-cart', 'item-add', 7);
                }
                location.reload();
            });
        });
        document.getElementById('add-to-cart').addEventListener('click', function() {
            location.reload(); 
        });
        document.querySelector('.dislike-1.dislike').addEventListener('click', function() {
            setCookie('item-1-cart', 'item-not-add', 7); 
            location.reload();
        });
        function getCookie(name) {
            let cookieArr = document.cookie.split(';');
            for (let i = 0; i < cookieArr.length; i++) {
                let cookiePair = cookieArr[i].split('=');
                if (name === cookiePair[0].trim()) {
                    return decodeURIComponent(cookiePair[1]);
                }
            }
            return null;
        }
        function checkCookieAndChangeText() {
            var dislikeButton = document.querySelector('.dislike-1.dislike');
            var addToCartButton = document.getElementById('add-to-cart');
            var cookieValue = getCookie('item-1-cart');

            console.log('Cookie value:', cookieValue);

            if (dislikeButton && addToCartButton) {
                if (cookieValue === 'item-not-add') {
                    console.log('Changing button text...'); 
                    addToCartButton.innerHTML = 'Add to cart';
                } else {
                    console.log('Cookie value does not match');
                }
            } else {
                console.error('Не вдалося знайти елементи на сторінці');
            }
        }
        document.addEventListener('DOMContentLoaded', checkCookieAndChangeText);
        function getCookie(name) {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }
        let itemQuantity = getCookie('item-quantity');
        if (itemQuantity !== undefined && itemQuantity !== null) {
            let pcsLikedElement = document.querySelector('p.pcs-liked');
            if (pcsLikedElement) {

                let spanElement = pcsLikedElement.querySelector('span.gold');

                pcsLikedElement.innerHTML = itemQuantity + ' X ' + (spanElement ? spanElement.outerHTML : '');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            function getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            }
        
            function formatNumber(number) {
                return `₪ ${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
            }
            const div = document.querySelector('.liked-item-div-1.liked-item-div');
            if (div && getComputedStyle(div).display === 'block') {
                if (getCookie('item-1-cart') === 'item-add') {
                    const itemQuantity = parseInt(getCookie('item-quantity'), 10);
                    if (!isNaN(itemQuantity)) {
                        const totalPrice = itemQuantity * 1600;
                        const formattedPrice = formatNumber(totalPrice);
                        const priceElement = document.querySelector('.total-price');
                        if (priceElement) {
                            priceElement.textContent = formattedPrice;
                        }
                    }
                }
            }
        });
        