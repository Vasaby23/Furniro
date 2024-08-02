


const linkElement = document.querySelector('link[href="/loader.css"]');
if (linkElement) {
    linkElement.remove();
} else {
    console.log('Елемент <link> зі стилями не знайдено');
}


document.addEventListener('DOMContentLoaded', function() {
    function setLikeCookie(key, value) {
        document.cookie = `${key}=${value}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`;
    }
    function getLikeCookie(key) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === key) {
                return value;
            }
        }
        return null;
    }
    function updateMainLikeIcon() {
        const likeIcons = document.querySelectorAll('.like-icon');
        const mainLikeIcon = document.querySelector('.like-main');
        const isLiked = Array.from(likeIcons).some(icon => icon.classList.contains('liked'));

        mainLikeIcon.src = isLiked ? '/imgs/icon-park-solid--like.svg' : '/imgs/like.svg';
        setLikeCookie('mainLikeIconState', isLiked ? 'liked' : 'not-liked');
    }
    function updateLikeDivClasses() {
        const likeDiv = document.querySelector('.like-div');
        likeDiv.className = 'like-div';

        likes.forEach(({ linkId, cookieKey }) => {
            const likeIndex = linkId.split('-')[2];
            const likeState = getLikeCookie(cookieKey);

            if (likeState === 'liked') {
                likeDiv.classList.add(`liked-item-div-${likeIndex}`);
            } else {
                likeDiv.classList.remove(`liked-item-div-${likeIndex}`);
            }
        });
    }
    const likes = [
        { linkId: 'like-link-1', iconId: 'like-icon-1', cookieKey: 'likeState-1' },
        { linkId: 'like-link-2', iconId: 'like-icon-2', cookieKey: 'likeState-2' },
        { linkId: 'like-link-3', iconId: 'like-icon-3', cookieKey: 'likeState-3' },
        { linkId: 'like-link-4', iconId: 'like-icon-4', cookieKey: 'likeState-4' },
        { linkId: 'like-link-5', iconId: 'like-icon-5', cookieKey: 'likeState-5' },
        { linkId: 'like-link-6', iconId: 'like-icon-6', cookieKey: 'likeState-6' },
        { linkId: 'like-link-7', iconId: 'like-icon-7', cookieKey: 'likeState-7' },
        { linkId: 'like-link-8', iconId: 'like-icon-8', cookieKey: 'likeState-8' }
    ];

    function updateDisplay() {
        const likedItemDivs = document.querySelectorAll('.liked-item-div');
        likedItemDivs.forEach(likedItemDiv => {
            const likedIndex = likedItemDiv.classList[0].replace('liked-item-div-', '');
            const likeState = getLikeCookie(`likeState-${likedIndex}`);

            if (likeState === 'liked') {
                likedItemDiv.classList.remove('display-none-like');
                likedItemDiv.classList.add('display-block-like');
            } else {
                likedItemDiv.classList.remove('display-block-like');
                likedItemDiv.classList.add('display-none-like');
            }
        });
    }

    likes.forEach(({ linkId, iconId, cookieKey }) => {
        const likeLink = document.getElementById(linkId);
        const likeIcon = document.getElementById(iconId);
        likeIcon.classList.add('like-icon');
        const initialLikeState = getLikeCookie(cookieKey);
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
                setLikeCookie(cookieKey, 'not-liked');
            } else {
                likeIcon.src = '/imgs/icon-park-solid--like.svg';
                likeIcon.classList.add('liked');
                setLikeCookie(cookieKey, 'liked');
            }
            updateMainLikeIcon();
            updateLikeDivClasses();
        });
    });

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
                likeIcon.src = '/imgs/icon-park-solid--like.svg';
                likeIcon.classList.remove('liked');
            }

            const likeStateCookie = `likeState-${likedIndex}`;
            document.cookie = `${likeStateCookie}=not-liked; path=/`;

            updateDisplay();
        });
    });

    updateMainLikeIcon();
    updateLikeDivClasses();
    updateDisplay();
});
