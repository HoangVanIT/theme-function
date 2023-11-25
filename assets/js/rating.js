let starClicked = false;

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.star').forEach(function (star) {
        star.addEventListener('click', function () {
            this.querySelector('.selected').classList.add('is-animated', 'pulse');
            let target = this;

            setTimeout(function () {
                target.querySelector('.selected').classList.remove('is-animated', 'pulse');
            }, 1000);

            starClicked = true;
        });
    });

    document.querySelectorAll('.half').forEach(function (halfStar) {
        halfStar.addEventListener('click', function () {
            if (starClicked) {
                setHalfStarState(this);
            }

            this.closest('.rating').querySelector('.js-score').textContent = this.dataset.value;
            this.closest('.rating').dataset.vote = this.dataset.value;
            calculateAverage();
            console.log(parseInt(this.dataset.value));
        });

        halfStar.addEventListener('mouseenter', function () {
            if (!starClicked) {
                setHalfStarState(this);
            }
        });
    });

    document.querySelectorAll('.full').forEach(function (fullStar) {
        fullStar.addEventListener('click', function () {
            if (starClicked) {
                setFullStarState(this);
            }

            this.closest('.rating').querySelector('.js-score').textContent = this.dataset.value;
            this.closest('.rating').dataset.vote = this.dataset.value;
            calculateAverage();
            console.log(parseInt(this.dataset.value));
        });

        fullStar.addEventListener('mouseenter', function () {
            if (!starClicked) {
                setFullStarState(this);
            }
        });
    });
});

function updateStarState(target) {
    target.parentNode.querySelectorAll('.star').forEach(function (star) {
        star.classList.add('animate');
        star.querySelector('.selected').classList.add('star-colour');
    });

    target.parentNode.querySelectorAll('.star').forEach(function (star) {
        star.classList.remove('animate');
        star.querySelector('.selected').classList.remove('star-colour');
    });
}

function setHalfStarState(target) {
    target.classList.add('star-colour');
    if (target.nextElementSibling) {
        target.nextElementSibling.classList.remove('star-colour');
    }
    updateStarState(target);
}


function setFullStarState(target) {
    target.classList.add('star-colour');
    target.parentNode.classList.add('animate');
    target.previousElementSibling.classList.add('star-colour');
    updateStarState(target);
}

function calculateAverage() {
    let average = 0;

    document.querySelectorAll('.rating').forEach(function (rating) {
        average += parseFloat(rating.dataset.vote);
    });

    document.querySelector('.js-average').textContent = (average / document.querySelectorAll('.rating').length).toFixed(1);
}
