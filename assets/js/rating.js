$(function() {
    var starClicked = true;

    $('.star').click(function() {
        animateStar(this);
        starClicked = true;
    });

    $('.half, .full').click(function() {
        if (starClicked) {
            if ($(this).hasClass('half')) {
                setHalfStarState(this);
            } else {
                setFullStarState(this);
            }
            updateScoreAndAverage(this);
        }
    });

    function animateStar(target) {
        $(target).children('.selected').addClass('is-animated pulse');
        setTimeout(function() {
            $(target).children('.selected').removeClass('is-animated pulse');
        }, 1000);
    }

    function updateStarState(target) {
        $(target).parent().prevAll().addClass('animate').children().addClass('star-colour');
        $(target).parent().nextAll().removeClass('animate').children().removeClass('star-colour');
    }

    function setHalfStarState(target) {
        $(target).addClass('star-colour');
        $(target).siblings('.full').removeClass('star-colour');
        updateStarState(target);
    }

    function setFullStarState(target) {
        $(target).addClass('star-colour').parent().addClass('animate');
        $(target).siblings('.half').addClass('star-colour');
        updateStarState(target);
    }

    function updateScoreAndAverage(target) {
        var $rating = $(target).closest('.rating');
        var voteValue = $(target).data('value');

        $rating.find('.js-score').text(voteValue);
        $rating.find('.js-average').text(voteValue);

        $rating.data('vote', voteValue);
        calculateAverage();
        console.log(parseInt(voteValue));
    }

    function calculateAverage() {
        var average = 0;
        $('.rating').each(function() {
            average += $(this).data('vote');
        });
        $('.js-average').text((average / $('.rating').length).toFixed(1));
    }
});
