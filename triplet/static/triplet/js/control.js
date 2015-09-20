

htmlobj = $.ajax({
url: "http://52.7.51.217/test.php",
async: false,
method: "POST",
data: { testfield: "yeah"}
});
console.log(htmlobj.responseText);
console.log(htmlobj)


//read a text file
function readTextFile(file){
    htmlobj=$.ajax({url:file,async:false,method:'GET'});
    var list = htmlobj.responseText;
    var listArray = list.split(/\n/g);
    for (a in listArray ) {
        listArray[a] = listArray[a].split(",");
        for( b in listArray[a]){
          listArray[a][b] = 'static/images/2kFemale/' + listArray[a][b];
        }
    }
    listArray = listArray.slice(0,listArray.length-1);
    return listArray;
}


var post_trial_gap = function() {
  return Math.floor( Math.random() * 750 );
}

var question_age = ["My age is"];
var welcome_survey_new_block = {
  type: "survey_new",
  questions: [question_age],
  text: "<div class='jspsych_target jspsych-display-element' style='text-align: left; width: 500px; margin-left: 30% auto; padding-top: 30px'> <div class='jspsych-survey-likert-preamble'>Please fill out this short survey </div> <div class='jspsych-survey-text-question'> <p class='jspsych-survey-text'> My gender is <br> <input type='radio' name='gender' id='Male' value='Male'> <label for='Male'> Male</label> <br> <input type='radio' name='gender' id='Female' value='Female'> <label for='female'> Female</label> <br> <input type='radio' name='gender' id='Other' value='Other'> <label for='Other_gender'> Other</label> <br> <!--<input type='radio' name='gender' id='no_say' value='No_say'><label for='No_say'> I prefer not to disclose this information</label><br>--></p> </div> <div class='jspsych-survey-text-question'> <p class='jspsych-survey-text'> My race / ethnicity is (select one or more) <br> <input type='checkbox' name='race' id='American Indian or Alaska Native' value='American Indian or Alaska Native'> <label for='American Indian or Alaska Native'> American Indian or Alaska Native</label> <br> <input type='checkbox' name='race' id='Asian' value='Asian'> <label for='Asian'> Asian</label> <br> <input type='checkbox' name='race' id='Black or African American' value='Black or African American'> <label for='Black or African American'> Black or African American </label> <br> <input type='checkbox' name='race' id='Hispanic' value='Hispanic'> <label for='Hispanic'> Hispanic </label> <br> <input type='checkbox' name='race' id='Native Hawaiian or Other Pacific Islander' value='Native Hawaiian or Other Pacific Islander'> <label for='Native Hawaiian or Other Pacific Islander'> Native Hawaiian or Other Pacific Islander </label> <br> <input type='checkbox' name='race' id='White_Not_Hispanic' value='White_Not_Hispanic'> <label for='White_Not_Hispanic'> White / Not Hispanic </label> <br> <input type='checkbox' name='race' id='Other' value='Other'> <label for='Other'> Other</label> <br> <!--<input type='checkbox' name='race' id='no_say' value='No_say'><label for='No_say'> I prefer not to disclose this information</label><br>--></p> </div> <div class='jspsych-survey-text-question'> <p class='jspsych-survey-text'> The races / ethnicities of people in the communities I've lived in are (select one or more) <br> <input type='checkbox' name='comRace' id='American Indian or Alaska Native' value='American Indian or Alaska Native'> <label for='American Indian or Alaska Native'> American Indian or Alaska Native</label> <br> <input type='checkbox' name='comRace' id='Asian' value='Asian'> <label for='Asian'> Asian</label> <br> <input type='checkbox' name='comRace' id='Black or African American' value='Black or African American'> <label for='Black or African American'> Black or African American </label> <br> <input type='checkbox' name='comRace' id='Hispanic' value='Hispanic'> <label for='Hispanic'> Hispanic </label> <br> <input type='checkbox' name='comRace' id='Native Hawaiian or Other Pacific Islander' value='Native Hawaiian or Other Pacific Islander'> <label for='Native Hawaiian or Other Pacific Islander'> Native Hawaiian or Other Pacific Islander </label> <br> <input type='checkbox' name='comRace' id='White_Not_Hispanic' value='White_Not_Hispanic'> <label for='White_Not_Hispanic'> White / Not Hispanic </label> <br> <input type='checkbox' name='comRace' id='Other' value='Other'> <label for='Other'> Other</label> <br> <!--<input type='checkbox' name='comRace' id='no_say' value='No_say'><label for='No_say'> I prefer not to disclose this information</label><br>--></p> </div> <div class='jspsych-survey-text-question'> <p class='jspsych-survey-text'> My sexual orientation is <br> <input type='radio' name='sexual_ori' id='Bisexual' value='Bisexual'> <label for='Bisexual'> Bisexual</label> <br> <input type='radio' name='sexual_ori' id='Heterosexual' value='Heterosexual'> <label for='heterosexual'> Heterosexual</label> <br> <input type='radio' name='sexual_ori' id='Homosexual' value='Homosexual'> <label for='Homosexual'> Homosexual</label> <br> <input type='radio' name='sexual_ori' id='Other' value='Other'> <label for='Other'> Other</label> <br> <input type='radio' name='comRace' id='no_say' value='No_say'> <label for='No_say'> I prefer not to disclose this information</label> </p> </div> </div>"
};

var face_images_explore_ready_block = {
  type: "text",
  text: '<div><h2 class="emp"> Face Similarities Test</h2> <hr> <div class="well"> <p style="margin-top: 30px; margin-bottom: 30px;">In this test, you will be shown a series of face images. You will then be asked rate similarities between them. </p> <p style="margin-top: 30px; margin-bottom: 30px;">There will be a short <span class="emp">practice session </span>  before the actual test to familiarize you with what you need to do. In the actual test, there will be no instructions.</p>  <p style="margin-top: 30px; margin-bottom: 30px;">First, let us have a look at some face examples, just to give you an idea how different these faces will be.</p></div></div>',
  timing_post_trial: post_trial_gap
};

var face_images_explore_block4 = {
  type: "text",
  text: "<div class='im'><h3>Face Examples (1/3)</h3> <hr> <img src='/static/images/faceExamples/femaleExp1.jpg' style='width:100%'/> <br></div> ",
  skip_button: true,
  loop_num: 0,
  on_finish: function(){
            if(this.loop_num++ > 0){
              var skip = document.getElementById('Skip').clicked;
              $('.well').remove();
              $('.jspsych-survey-text').remove();
              if(skip){
                jsPsych.endCurrentChunk();
              }
            }

          },
  timing_post_trial: post_trial_gap
};
var face_images_explore_block5 = {
  type: "text",
  text: "<div class='im'><h3>Face Examples (2/3)</h3> <hr> <img src='/static/images/faceExamples/femaleExp2.jpg' style='width:100%'/> <br> </div> ",
  skip_button: true,
  loop_num: 0,
  on_finish: function(){
            if(this.loop_num++ > 0){
              var skip = document.getElementById('Skip').clicked;
              $('.well').remove();
              $('.jspsych-survey-text').remove();
              if(skip){
                jsPsych.endCurrentChunk();
              }
            }

          },
  timing_post_trial: post_trial_gap
};
var face_images_explore_block6 = {
  type: "text",
  text: "<div class='im'><h3>Face Examples (3/3)</h3> <hr> <img src='/static/images/faceExamples/femaleExp3.jpg' style='width:100%'/> <br> </div> ",
  skip_button: true,
  loop_num: 0,
  on_finish: function(){
            if(this.loop_num++ > 0){
              var skip = document.getElementById('Skip').clicked;

              if(skip){
                $('.im').remove();
                $('.jspsych-survey-text').remove();
                jsPsych.endCurrentChunk();
              }
            }

          },
  timing_post_trial: post_trial_gap
};

var face_images_explore_end_block = {
  type: "text",
  text: '<div class="well"> <p>If you wish to see the face examples again, click  <span class="emp">Go Back</span>.</p> <p>Otherwise, click <span class="emp">Continue</span> to proceed to practice.</p><br></div>',
  back_button: true,
  timing_post_trial: post_trial_gap
};

var face_example_chunk = {
    chunk_type: 'while',
    timeline: [face_images_explore_block4,face_images_explore_block5,face_images_explore_block6,face_images_explore_end_block],
    continue_function: function(){
      var back_button = document.getElementById('Back').clicked;
        $('.well').remove();
        $('.jspsych-survey-text').remove();
        if( back_button){
          return true;
        }
        else{
          return false;
        }
    }
};

var prac1_end_block = {
  type: "text",
  text: '<div class="well"> <p>If you wish to read the previous instructions again, click  <span class="emp">Go Back</span>.</p> <p>Otherwise, click <span class="emp">Continue</span> to practice a few more.</p><br></div>',
  back_button: true,
  timing_post_trial: post_trial_gap
};

var prac_no_inst_ready_block = {
  type: "text",
  text: '<div class="well"> <p> Now you are half way prepared. Practice a few more.</p> <br> </div>',
  timing_post_trial: post_trial_gap
};

var test_ready_block = {
  type: "text",
  text: "<div class='well'><br><p style='text-align: center; font-weight: bold; color: #3f6479; font-size: 24px;'> Great Job! :) </p><br><p>Here come the actual trials!</p><p> Now you will be presented with 200 trials separated in four phases. It'll be the same as the practice you just took, except that you will not receive any instructions between trials. </p>  <p>The most important rule, <strong style='color: #3f6479;'><em> go with your gut!</em></strong></p> <p>When you're ready, press the button below to begin the test. </p><br></div>",
  cont: 'Start Experiment',
  timing_post_trial: post_trial_gap
};

var break1_block = {
  type: "text",
  text: '<div class="well"><p>You have finished <span class="emp">1/4</span> of the experiment. </p><br></div>',
  timing_post_trial: post_trial_gap
};

var break2_block = {
  type: "text",
  text: '<div class="well"><p class="emp">Well done!</p> <p>You have finished 1/2 of the experiment. Take a short break!</p> <p>Click <span class="emp">Continue</span> when you are ready to proceed. </p> <br></div>',
  timing_post_trial: post_trial_gap
};
var break3_block = {
  type: "text",
  text: '<div class="well"><p>You have finished <span class="emp">3/4</span> of the experiment.</p><br></div>',
  timing_post_trial: post_trial_gap
};

var complete_block = {
  type: "text",
  text: '<div class="well"><p class="emp" style="font-size: 24px;">Thank you for your participation!</p> <p>You have finished the whole experiment.</p><br></div>',
  timing_post_trial: post_trial_gap
};


/* define test block */
var prac_doublet_stim_f = readTextFile("https://raw.githubusercontent.com/amandasongmm/filesPublic/master/feDouSample.txt");
jsPsych.randomization.shuffle(prac_doublet_stim_f);
var doublet_stim_f = readTextFile("https://raw.githubusercontent.com/amandasongmm/filesPublic/master/feDouSample.txt");
var doublet_stim_f1 = doublet_stim_f.slice(0,50);
var doublet_stim_f2 = doublet_stim_f.slice(50,100);
var doublet_stim_f3 = doublet_stim_f.slice(100,150);
var doublet_stim_f4 = doublet_stim_f.slice(150,200);
var prac_doublet_stim = [prac_doublet_stim_f[0]];
var prac_no_inst_doublet_stim = prac_doublet_stim_f.slice(1,6);

function getAllImages() {
  var images = []
  images = images.concat(prac_doublet_stim_f);
  images = images.concat(doublet_stim_f);
  return images;
}

var test_doublet1_stim = doublet_stim_f1;//.slice(0,2);
var test_doublet2_stim = doublet_stim_f2;//.slice(0,2);
var test_doublet3_stim = doublet_stim_f3;//.slice(0,2);
var test_doublet4_stim = doublet_stim_f4;//.slice(0,2);

//practice with instruction blocks
var prac_doublet_block = {
  type: 'similarity_custom',
  stimuli: prac_doublet_stim,
  text: '<div style="text-align: left; margin-top:30px;"> <p>In the first example, your task is to rate how similar a face pair is from <span class="emp">1</span> to <span class="emp">9</sapn>.</p> <p><span class="emp">1</span> indicates <span class="emp">Maximally Dissimilar</span>, <span class="emp">9</span> indicates <span class="emp">Maximally Similar</span></p> <p> <em class="emp">Try to focus on the face features and ignore the pose, expression and lighting influence.</em></p></div><br><br>',
  timing_post_trial: post_trial_gap
};
var instruction_doublet_chunk = {
    chunk_type: 'while',
    timeline: [prac_doublet_block,prac1_end_block],
    continue_function: function(){
      var back_button = document.getElementById('Back').clicked;
        $('.well').remove();
        $('.jspsych-survey-text').remove();
        if( back_button){
          return true;
        }
        else{
          return false;
        }
    }
};
//practice with no instruction blocks
var prac_no_inst_doublet_block = {
  type: 'similarity_custom',
  stimuli: prac_no_inst_doublet_stim,
  timing_post_trial: post_trial_gap
};

//test blocks
var test_doublet1_block = {
  type: 'similarity_custom',
  stimuli: test_doublet1_stim,
  timing_post_trial: post_trial_gap
};
var test_doublet2_block = {
  type: 'similarity_custom',
  stimuli: test_doublet2_stim,
  timing_post_trial: post_trial_gap
};
var test_doublet3_block = {
  type: 'similarity_custom',
  stimuli: test_doublet3_stim,
  timing_post_trial: post_trial_gap
};
var test_doublet4_block = {
  type: 'similarity_custom',
  stimuli: test_doublet4_stim,
  timing_post_trial: post_trial_gap
};

/* create experiment definition array */
var experiment = [];
experiment.push(face_images_explore_ready_block);
experiment.push(face_example_chunk);
experiment.push(instruction_doublet_chunk);
experiment.push(prac_no_inst_doublet_block);
experiment.push(test_ready_block);

var douTriShuffle = [1,2,3,4];
jsPsych.randomization.shuffle(douTriShuffle);
for (var i = 0; i < douTriShuffle.length; i++){
  switch(douTriShuffle[i]){
    case 1:
      test_doublet1_block.phase = i+1;
      experiment.push(test_doublet1_block);
      break;
    case 2:
      test_doublet2_block.phase = i+1;
      experiment.push(test_doublet2_block);
      break;
    case 3:
      test_doublet3_block.phase = i+1;
      experiment.push(test_doublet3_block);
      break;
    case 4:
      test_doublet4_block.phase = i+1;
      experiment.push(test_doublet4_block);
      break;
    default:
    ;
  }
  switch(i){
    case 0:
      //experiment.push(break1_block);
      break;
    case 1:
      experiment.push(break2_block);
      break;
    case 2:
      //experiment.push(break3_block);
      break;
    default:
    ;
  }
}
experiment.push(welcome_survey_new_block);
experiment.push(complete_block);


//start();
jsPsych.preloadImages(getAllImages(), start)

/* start the experiment */
function start() {
  jsPsych.init({
    display_element: $('#jspsych_target'),
    experiment_structure: experiment,
    show_progress_bar: true,
    on_finish: function() {

    },
    on_data_update: function(data) {

    }
  });
}
