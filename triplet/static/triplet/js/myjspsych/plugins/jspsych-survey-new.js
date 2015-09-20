/* jspsych-survey-new.js
 * Linjie Li
 *
 * This plugin display the survey page of the experiment
 *
 *
 */
(function($) {
    jsPsych.survey_new = (function() {

        var plugin = {};

        plugin.create = function(params) {

            params = jsPsych.pluginAPI.enforceArray(params, ['text','data']);

            var trials = new Array(params.text.length);
            for (var i = 0; i < trials.length; i++) {
                trials[i] = {};
                trials[i].text = params.text[i]; // text of all trials
                trials[i].cont_key = params.cont_key || []; // keycode to press to advance screen, default is all keys.
                trials[i].preamble= (typeof params.preamble == 'undefined' ? "" : params.preamble[j]),
                trials[i].questions = params.questions[i]
            }
            return trials;
        };

        plugin.trial = function(display_element, trial) {

          function getValue(name) {
            var rbs = document.getElementsByName(name);
            var iLen=rbs.length;
            var value = [];
            for (var i=0;  i < iLen; i++) {
              if (rbs[i].checked) {
                value.push(rbs[i].value);
              }
            }
            return value;
          }

          function save_data() {
            var question_data = {};
            question_data['gender'] = getValue('gender');
            question_data['race'] = getValue('race');
            question_data['comRace'] = getValue('comRace');
            question_data['sexOri'] = getValue('sexual_ori');
            return question_data;
          }
            
          function checkDemographics() {
            var pass = true;
            if (getValue('gender').length === 0  ||getValue('comRace').length === 0 ) {
              pass = false;
            } 

            if ( getValue('sexual_ori').length === 0 || getValue('race').length === 0) {
              pass = false;
            } 
            return pass;
          }

          // if any trial variables are functions
          // this evaluates the function and replaces
          // it with the output of the function
          trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

          // set the HTML of the display target to replaced_text.
          display_element.html(trial.text);

          // show preamble text
          display_element.append($('<div>', {
            "id": 'jspsych-survey-likert-preamble',
            "class": 'jspsych-survey-likert-preamble'
          }));

          $('#jspsych-survey-likert-preamble').html(trial.preamble);

          // add questions
          for (var i = 0; i < trial.questions.length; i++) {
            // create div
            display_element.append($('<div>', {
              "id": 'jspsych-survey-text-' + i,
              "class": 'jspsych-survey-text-age'
            }));

            // add question text
            $("#jspsych-survey-text-" + i).append('<p class="jspsych-survey-text">' + trial.questions[i]+ '</p>' );

            // add text box
            $("#jspsych-survey-text-" + i).append('<input type="text" name="#jspsych-survey-text-response-' + i + '"></input>');
          }
            
          // add submit button
          display_element.append($('<button>', {
            'id': 'jspsych-survey-text-next',
            'class': 'jspsych-survey-text'
          }));

          $("#jspsych-survey-text-next").html('Submit Answers');

          $("#jspsych-survey-text-next").click(function() {
            var answer = {};
            $("div.jspsych-survey-text-age").each(function(index) {
              var id = "age";
              var val = $(this).children('input').val();
              var obje = {};
              obje[id] = val;
              $.extend(answer, obje);
            });

            var pass_val = checkDemographics();
            var age_str = answer["age"];
            var age_num = parseInt(age_str);
            var age_null = (age_str.length < 1);
            var age_valid = (age_num >= 18 && age_num <= 99);
            //console.log(pass_val);
            //console.log(question_age["Q0"]);
              
            if(age_num === 999 ){
              display_element.html('');
              // next trial
              jsPsych.finishTrial();
            }
            else if( age_null || (!pass_val)){
              alert("Please fill out the form before submission!");
            }
            else if (!age_valid){
              alert("Age must be in the range of 18 to 99!");
            }
            else{
              // measure response time
              var endTime = (new Date()).getTime();
              var response_time = endTime - startTime;
              var select_data = save_data();
              $.extend(answer, select_data);
              //console.log(JSON.stringify(answer));
              //console.log(response_time);

              // save data  
              jsPsych.data.write({
                "rt": response_time,
                "answer": JSON.stringify(answer)
              });

              display_element.html('');
              // next trial
              jsPsych.finishTrial();
            }  
          });
          var startTime = (new Date()).getTime();
        };
        return plugin;
    })();
})(jQuery);
