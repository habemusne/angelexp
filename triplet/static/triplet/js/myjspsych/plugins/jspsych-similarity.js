/**
 * jspsych-similarity.js
 * Josh de Leeuw
 *
 * This plugin create a trial where two images are shown sequentially, and the subject rates their similarity using a slider controlled with the mouse.
 *
 * documentation: docs.jspsych.org
 *
 */

(function($) {
  jsPsych.similarity = (function() {

    var plugin = {};

    plugin.create = function(params) {

      jsPsych.pluginAPI.enforceArray(params, ['data']);

      var trials = new Array(params.stimuli.length);
      for (var i = 0; i < trials.length; i++) {
        trials[i] = {};
        trials[i].a_path = params.stimuli[i][0];
        trials[i].b_path = params.stimuli[i][1];
        trials[i].labels = (typeof params.labels === 'undefined') ? ["1", "2"] : params.labels;
        trials[i].labelName = (typeof params.labelName === 'undefined') ? ["Not at all similar", "Identical"] : params.labelName;
        trials[i].intervals = params.intervals || 100;
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

        // create slider
        display_element.append($('<div>', {
          "id": 'slider',
          "class": 'sim'
        }));

        $("#slider").slider({
          value: 0,
          min: 1,
          max: trial.intervals,
          step: 1,
        });

        // show tick marks
        if (trial.show_ticks) {
          for (var j = 1; j < trial.intervals - 1; j++) {
            $('#slider').append('<div class="slidertickmark"></div>');
          }

          $('#slider .slidertickmark').each(function(index) {
            var left = (index + 1) * (100 / (trial.intervals - 1));
            $(this).css({
              'position': 'absolute',
              'left': left + '%',
              'width': '1px',
              'height': '100%',
              'background-color': '#222222'
            });
          });
        }

        // create labels for slider
        display_element.append($('<ul>', {
          "id": "sliderlabels",
          "class": 'sliderlabels',
          "css": {
            "width": "120%",
            "height": "3em",
            "margin": "5% 0 0% -5%",
            "display": "block",
            "position": "relative",
            "padding-left": "0px"
          }
        }));

        for (var j = 0; j < trial.labels.length; j++) {
          $("#sliderlabels").append('<li>' + trial.labels[j] + '</li>');
        }
        display_element.append($('<ul>', {
          "id": "sliderlabelName",
          "class": 'sliderlabelName',
          "css": {
            "width": "120%",
            "height": "3em",
            "margin": "0% 0 0% -10%",
            "display": "block",
            "position": "relative",
            "padding-left": "0px"
          }
        }));
        
        for (var j = 0, num= 1; j < trial.labelName.length; j++) {
          
          if(trial.labelName[j].length >1){
            $("#sliderlabelName").append('<li id="sliderlabelName' + num +'">'+ trial.labelName[j] + '</li>');
            num++;
          }
        }
        // position labels to match slider intervals
        var slider_width = $("#slider").width();
        var num_items = trial.labels.length;
        var item_width = num_items/ slider_width;
        var spacing_interval = slider_width / (num_items - 1);

        $("#sliderlabels li").each(function(index) {
          $(this).css({
          });
        });

        //  create button
        display_element.append($('<button>', {
          'id': 'next',
          'class': 'sim',
          'html': 'Submit Answer'
        }));

        // if prompt is set, show prompt
        if (trial.prompt !== "") {
          display_element.append(trial.prompt);
        }

        $("#next").click(function() {
          document.getElementById('pleasant').play();
          var endTime = (new Date()).getTime();
          var response_time = endTime - startTime;

          // kill any remaining setTimeout handlers
          for (var i = 0; i < setTimeoutHandlers.length; i++) {
            clearTimeout(setTimeoutHandlers[i]);
          }

          var score = $("#slider").slider("value");
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
        });
      }
    };

    return plugin;
  })();
})(jQuery);
