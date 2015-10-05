
var MAX_TRIAL = 5;
var trial_counter = 0;

$.getJSON('/triplet/first_trial', function(data, jqXHR){
    $('body').append('<div>', {
        'class': 'trial',
        'html': data.img1 + ', ' + data.img2 + ', ' + data.img3,
    });
    trial_counter += 1;
});

function next_trial(){
    question_id = $('')
};
