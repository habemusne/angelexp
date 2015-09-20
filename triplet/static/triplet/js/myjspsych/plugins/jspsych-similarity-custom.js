/**
 * jspsych-similarity-custom.js
 * Josh de Leeuw
 *
 * This plugin create a trial where two images are shown sequentially, and the subject rates their similarity using a slider controlled with the mouse.
 *
 * documentation: docs.jspsych.org
 *
 */

(function($) {
  jsPsych.similarity_custom = (function() {

    var plugin = {};

    plugin.create = function(params) {

      jsPsych.pluginAPI.enforceArray(params, ['data']);

      var trials = new Array(params.stimuli.length);
      for (var i = 0; i < trials.length; i++) {
        trials[i] = {};
        trials[i].number = (i+1).toString();
        trials[i].total = trials.length.toString();
        trials[i].text = (typeof params.text === 'undefined') ? "" : params.text;
        trials[i].phase = (typeof params.phase === 'undefined') ? "" : params.phase.toString();
        trials[i].a_path = params.stimuli[i][0];
        trials[i].b_path = params.stimuli[i][1];
        trials[i].show_ticks = (typeof params.show_ticks === 'undefined') ? false : params.show_ticks;

        trials[i].show_response = params.show_response || "SECOND_STIMULUS";

        trials[i].timing_first_stim = params.timing_first_stim || 1000; // default 1000ms
        trials[i].timing_second_stim = params.timing_second_stim || -1; // -1 = inf time; positive numbers = msec to display second image.
        trials[i].timing_image_gap = params.timing_image_gap || 1000; // default 1000ms

        trials[i].is_html = (typeof params.is_html === 'undefined') ? false : params.is_html;
        trials[i].prompt = (typeof params.prompt === 'undefined') ? '' : params.prompt;
      }
      return trials;
    };

    var sim_trial_complete = false;

    plugin.trial = function(display_element, trial) {

      var setTimeoutHandlers = [];
      dotrial();

      function dotrial() {
        trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
        display_element.html(trial.text);
        if (trial.phase.length >= 1){
          display_element.append('<div> <p> <span class="emp">Phase:</span> ' + trial.phase + ' of 4 </p> <p><span class="emp">Progress:</span> '+trial.number +' of '+trial.total+'</p><br></div>');
        }
        
        // show the images
        if (!trial.is_html) {
          display_element.append($('<img>', {
            "src": trial.a_path,
            "id": 'jspsych_sim_stim1',
            "class": 'img-left'
          }));
          display_element.append($('<img>', {
            "src": trial.b_path,
            "id": 'jspsych_sim_stim2',
            "class": 'img-right',
          }));
        } else {
          display_element.append($('<div>', {
            "html": trial.a_path,
            "id": 'jspsych_sim_stim'
          }));
        }

        setTimeoutHandlers.push(setTimeout(function() {
          showSecondStim();
        }, 0));

        // setTimeoutHandlers.push(setTimeout(function(){
        //   showWarningScreen();
        // }, 5000));

      }

      function key_listener(){
        $(window).unbind('keypress', key_listener);
        $('.text-warning').html('Continuing...');
        setTimeout(function(){
          display_element.empty();
          dotrial();
        }, 1000);
      }

      function showWarningScreen() {
        display_element.empty();
        display_element.append($('<p>', {
          "class": 'text-warning',
          "html": 'You have not responded for a long time. Press any key to continue.'
        }));
        $(window).keypress(key_listener);
      }

      function showSecondStim() {

        if (!trial.is_html) {
          $('#jspsych_sim_stim2').css('visibility', 'hidden');
        } else {
          $('#jspsych_sim_stim').html(trial.b_path);
        }

        $('#jspsych_sim_stim2').css('visibility', 'visible');

        if (trial.show_response == "SECOND_STIMULUS") {
          show_response_slider(display_element, trial);
        }

      }


      function show_response_slider(display_element, trial) {

        var startTime = (new Date()).getTime();
        display_element.append('<table id="likert_scale"> <tbody> <tr> <td style="text-align: center; width: 75px;">Maximally <br>Dissimilar</td> <td class="radio_scale" > <form action="" style="text-align: center;"> <input id="scale_value" type="radio" name="scale_value" value="1"> <input id="scale_value" type="radio" name="scale_value" value="2"> <input id="scale_value" type="radio" name="scale_value" value="3"> <input id="scale_value" type="radio" name="scale_value" value="4"> <input id="scale_value" type="radio" name="scale_value" value="5"> <input id="scale_value" type="radio" name="scale_value" value="6"> <input id="scale_value" type="radio" name="scale_value" value="7"> <input id="scale_value" type="radio" name="scale_value" value="8"> <input id="scale_value" type="radio" name="scale_value" value="9"> </form> </td> <td style="text-align: center; width: 75px;">Maximally <br>Similar</td> </tr> <tr> <td style="text-align: center; width: 75px;"> </td> <td class="radio_scale"> <form action="" style="text-align: center; margin-left: 5.6%;"> <li id="scalelabels"> 1 </li> <li id="scalelabels"> 2 </li> <li id="scalelabels"> 3 </li> <li id="scalelabels"> 4 </li> <li id="scalelabels"> 5 </li> <li id="scalelabels"> 6 </li> <li id="scalelabels"> 7 </li> <li id="scalelabels"> 8 </li> <li id="scalelabels"> 9 </li> </form> </td> <td style="text-align: center; width: 75px;"> </td> </tr> </tbody> </table>');
        
        $("input[name='scale_value']").change(function(){
          // Do something interesting here
          var score = getValue('scale_value');
          var score_valid = ((parseInt(score)>=1) && (parseInt(score)<=9));
          //console.log(score_valid);
          if ( score_valid ){
            setTimeout(function(){
              wrapup_trial();
            }, 500);
          }
        });
        
        
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

        // if prompt is set, show prompt
        if (trial.prompt !== "") {
          display_element.append(trial.prompt);
        }

        function wrapup_trial(){
          //document.getElementById('pleasant').play();
          var score = getValue('scale_value');
          var endTime = (new Date()).getTime();
          var response_time = endTime - startTime;

          // kill any remaining setTimeout handlers
          for (var i = 0; i < setTimeoutHandlers.length; i++) {
            clearTimeout(setTimeoutHandlers[i]);
          }

          //console.log(score);
          jsPsych.data.write($.extend({}, {
            "sim_score": score,
            "rt": response_time,
            "stimulus": JSON.stringify([trial.a_path, trial.b_path])
          }, trial.data));
          // goto next trial in block
          display_element.html('');
          if (trial.timing_post_trial > 0) {
            setTimeout(function() {
              jsPsych.finishTrial();
            }, trial.timing_post_trial);
          } else {
            jsPsych.finishTrial();
          }
        
        }
      }
    };

    return plugin;
  })();
})(jQuery);
