/* jspsych-text.js
 * Josh de Leeuw
 *
 * This plugin displays text (including HTML formatted strings) during the experiment.
 * Use it to show instructions, provide performance feedback, etc...
 *
 * documentation: docs.jspsych.org
 *
 *
 */

(function($) {
    jsPsych.text = (function() {

        var plugin = {};

        plugin.create = function(params) {

            params = jsPsych.pluginAPI.enforceArray(params, ['text']);//,'text_append','cont','back_button','skip_button','loop_num']);

            var trials = new Array(params.text.length);
            for (var i = 0; i < trials.length; i++) {
                trials[i] = {};
                trials[i].text = params.text[i]; // text of all trials
                trials[i].text_append = (typeof params.text_append == 'undefined' ? "" : params.text_append); // text of all trials
                trials[i].cont = (typeof params.cont == 'undefined' ? "Continue" : params.cont); // keycode to press to advance screen, default is all keys.
                trials[i].back_button = (typeof params.back_button == 'undefined' ? false : params.back_button);
                trials[i].skip_button = (typeof params.skip_button == 'undefined' ? false : params.skip_button);
                trials[i].loop_num = (typeof params.loop_num == 'undefined' ? 0 : params.loop_num);
                //console.log(trials[i].cont)
            }

            return trials;
        };

        plugin.trial = function(display_element, trial) {

            // if any trial variables are functions
            // this evaluates the function and replaces
            // it with the output of the function
            trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
            
            
            // set the HTML of the display target to replaced_text.
            
            if(trial.loop_num>0){
            trial.text = trial.text + trial.text_append;
            }

            display_element.html(trial.text);

            var after_response = function(info) {

                display_element.html(''); // clear the display

                save_data(info.key, info.rt);

                jsPsych.finishTrial();

            };

            var mouse_listener = function(e) {

                var rt = (new Date()).getTime() - start_time;

                display_element.unbind('click', mouse_listener);

                after_response({key: 'mouse', rt: rt});

            };

            // check if key is 'mouse'
            if (trial.cont_key == 'mouse') {
                display_element.click(mouse_listener);
                var start_time = (new Date()).getTime();
            } else {
                //jsPsych.pluginAPI.getKeyboardResponse(after_response, trial.cont_key);
            }
            //console.log(trial.skip_button);
            

            // add Continue button
            if(trial.back_button){
                display_element.append($('<button>', {
                    'id': 'Back',
                    'class': 'jspsych-survey-text',
                    'style': 'margin-right: 20%;',
                    'value': 'Back',
                    'clicked': false
                }));
                $("#Back").html('Go Back');

                $("#Back").click(function() {
                    //console.log('Back');
                    var endTime = (new Date()).getTime();
                    var response_time = endTime - startTime;
                    jsPsych.data.write({
                        "rt": response_time
                    });
                    this.clicked = true;
                    //display_element.html('');
                    jsPsych.finishTrial();                   
                });
                display_element.append($('<button>', {
                    'id': 'jspsych-survey-text-next',
                    'class': 'jspsych-survey-text',
                    'style': 'margin-left: 20%;',
                    'value': 'Continue',
                    'clicked': false
                }));
                $("#jspsych-survey-text-next").html(trial.cont);
                $("#jspsych-survey-text-next").click(function() {
                    // measure response time
                    var endTime = (new Date()).getTime();
                    var response_time = endTime - startTime;
                    jsPsych.data.write({
                        "rt": response_time
                    });
                    this.clicked = true;
                    //display_element.html('');
                    // next trial
                    jsPsych.finishTrial(); 
                });
            }
            else if(trial.skip_button && trial.loop_num > 0){
                display_element.append($('<button>', {
                    'id': 'jspsych-survey-text-next',
                    'class': 'jspsych-survey-text',
                    'value': 'Continue',
                    'clicked': false
                }));
                $("#jspsych-survey-text-next").html(trial.cont);
                $("#jspsych-survey-text-next").click(function() {
                    // measure response time
                    var endTime = (new Date()).getTime();
                    var response_time = endTime - startTime;
                    jsPsych.data.write({
                        "rt": response_time
                    });
                    this.clicked = true;
                    //display_element.html('');
                    // next trial
                    jsPsych.finishTrial(); 
                });

                display_element.append($('<button>', {
                    'id': 'Skip',
                    'class': 'jspsych-survey-text',
                    'style': 'margin-left: 20%;',//' visibility: hidden;',
                    'value': 'Skip',
                    'clicked': false,
                    //'number_loop': -1
                }));
                $("#Skip").html('Skip');

                $("#Skip").click(function() {
                    //console.log('Back');
                    var endTime = (new Date()).getTime();
                    var response_time = endTime - startTime;
                    jsPsych.data.write({
                        "rt": response_time
                    });
                    this.clicked = true;
                    //display_element.html('');
                    jsPsych.finishTrial();                   
                });
                
            }
            
            
            else{
                display_element.append($('<button>', {
                    'id': 'jspsych-survey-text-next',
                    'class': 'jspsych-survey-text'
                }));
                $("#jspsych-survey-text-next").html(trial.cont);
                $("#jspsych-survey-text-next").click(function() {
                    // measure response time
                    var endTime = (new Date()).getTime();
                    var response_time = endTime - startTime;
                    jsPsych.data.write({
                        "rt": response_time
                    });
                    display_element.html('');
                    // next trial
                    jsPsych.finishTrial(); 
                });
            }


            
            var startTime = (new Date()).getTime();





            function save_data(key, rt) {
                jsPsych.data.write({
                    "rt": rt,
                    "key_press": key
                });
                
            }
            
        };

        return plugin;
    })();
})(jQuery);
