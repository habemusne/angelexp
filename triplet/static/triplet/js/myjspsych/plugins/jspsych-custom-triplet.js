/*  jspsych-custom-triplet.js
 *  Nan Chen
 *
 *  This plugin runs a single XAB trial, where X is an image presented in isolation, and A and B are choices, with A or B being equal to X.
 *  The subject's goal is to identify whether A or B is identical to X.
 *
 * documentation: docs.jspsych.org
 *
 */

(function($) {
  jsPsych.custom_triplet = (function() {

    var plugin = {};

    plugin.create = function(params) {

      params = jsPsych.pluginAPI.enforceArray(params, ['data']);

      // the number of trials is determined by how many entries the params.stimuli array has
      var trials = new Array(params.stimuli.length);

      for (var i = 0; i < trials.length; i++) {
        trials[i] = {};
        trials[i].number = (i+1).toString();
        trials[i].total = trials.length.toString();
        trials[i].text = (typeof params.text === 'undefined') ? "" : params.text;
        trials[i].x_path = params.stimuli[i][0];
        // if there is only a pair of stimuli, then the first is the target and is shown twice.
        // if there is a triplet, then the first is X, the second is the target, and the third is foil (useful for non-exact-match XAB).
        if (params.stimuli[i].length == 2) {
          trials[i].a_path = params.stimuli[i][0];
          trials[i].b_path = params.stimuli[i][1];
        } else {
          trials[i].a_path = params.stimuli[i][1];
          trials[i].b_path = params.stimuli[i][2];
        }
        trials[i].phase = (typeof params.phase === 'undefined') ? "" : params.phase.toString();
        trials[i].left_key = params.left_key || 81; // defaults to 'q'
        trials[i].right_key = params.right_key || 80; // defaults to 'p'
        // timing parameters
        trials[i].timing_x = params.timing_x || 1000; // defaults to 1000msec.
        trials[i].timing_xab_gap = params.timing_xab_gap || 1000; // defaults to 1000msec.
        trials[i].timing_ab = params.timing_ab || -1; // defaults to -1, meaning infinite time on AB. If a positive number is used, then AB will only be displayed for that length.
        // optional parameters
        trials[i].is_html = (typeof params.is_html === 'undefined') ? false : params.is_html;
        trials[i].prompt = (typeof params.prompt === 'undefined') ? "" : params.prompt;

      }
      return trials;
    };

    plugin.trial = function(display_element, trial) {


      var setTimeoutHandlers = [];
      var startTime = (new Date()).getTime();
      dotrial();

      function dotrial(){
        trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
        display_element.html(trial.text);
        if (trial.phase.length >= 1){
          display_element.append('<div> <p> <span class="emp">Phase:</span> ' + trial.phase + ' of 4</p> <p><span class="emp">Progress:</span> '+trial.number +' of '+trial.total+'</p><br></div>');
        }
        display_element.append($('<img>', {
          src: trial.x_path,
          "id": 'jspsych-xab-stimulus1',
          "class": 'top'
        }));
        display_element.append($('<div>', {
          "id": 'jspsych-xab-stimulus2',
          "css": {
            "min-height": "200px"
          }
        }));
        $("#jspsych-xab-stimulus2").append($('<img>', {
          "src": trial.a_path,
          "class": 'left',
        }));
        $("#jspsych-xab-stimulus2").append($('<img>', {
          "src": trial.b_path,
          "class": 'right',
        }));

        if (trial.prompt !== "") {
          display_element.append($('<p>', {
            html:trial.prompt
          }));
        }

        press_counter = 0;
        pressed_set = [];
        var report_pressed = function(pressed_img_class_name){
          if (pressed_set.indexOf(pressed_img_class_name) == -1){
            press_counter += 1;
            pressed_set.push(pressed_img_class_name);
            if (press_counter >= 2){
              wrapup_trial();
            }
          }
          //console.log(pressed_set);
        }

        $('.top').click(function(){
          $('.top').css({'border-width': '3', 'border-color': '#E74C3C', 'border-style': 'solid'});
          report_pressed('top');
        });
        $('.left').click(function(){
          $('.left').css({'border-width': '3', 'border-color': '#E74C3C', 'border-style': 'solid'});
          report_pressed('left');
        });
        $('.right').click(function(){
          $('.right').css({'border-width': '3', 'border-color': '#E74C3C', 'border-style': 'solid'});
          report_pressed('right');
        });
        
      }

      function wrapup_trial(){
        $('.top').unbind();
        $('.left').unbind();
        $('.right').unbind();
        //document.getElementById('pleasant').play();
        var endTime = (new Date()).getTime();
        var response_time = endTime - startTime;

        // kill any remaining setTimeout handlers
        for (var i = 0; i < setTimeoutHandlers.length; i++) {
          clearTimeout(setTimeoutHandlers[i]);
        }

        //var score = $("#slider").slider("value");
        jsPsych.data.write($.extend({}, {
          "pressed": JSON.stringify(pressed_set),
          "rt": response_time,
          "stimulus": JSON.stringify([trial.x_path, trial.a_path, trial.b_path])
        }, trial.data));
        // goto next trial in block
        if (trial.timing_post_trial > 0) {
          setTimeout(function() {
            display_element.html('');
            jsPsych.finishTrial();
          }, trial.timing_post_trial);
        } else {
          jsPsych.finishTrial();
        }
      }
    };
    return plugin;
  })();
})(jQuery);
