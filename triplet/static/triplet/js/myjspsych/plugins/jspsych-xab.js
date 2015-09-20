/*  jspsych-xab.js
 *	Josh de Leeuw
 *
 *  This plugin runs a single XAB trial, where X is an image presented in isolation, and A and B are choices, with A or B being equal to X.
 *	The subject's goal is to identify whether A or B is identical to X.
 *
 * documentation: docs.jspsych.org
 *
 */

(function($) {
	jsPsych.xab = (function() {

		var plugin = {};

		plugin.create = function(params) {

			params = jsPsych.pluginAPI.enforceArray(params, ['data']);

			// the number of trials is determined by how many entries the params.stimuli array has
			var trials = new Array(params.stimuli.length);

			for (var i = 0; i < trials.length; i++) {
				trials[i] = {};
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
            dotrial();

			function dotrial(){
				console.log(trial.x_path + ' ' + trial.a_path + ' ' + trial.b_path);
				trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
				if (!trial.is_html) {
					display_element.append($('<img>', {
						src: trial.x_path,
						"id": 'jspsych-xab-stimulus1'
					}));
					display_element.append($('<div>', {
						"id": 'jspsych-xab-stimulus2',
						"css": {
							"min-height": "200px"
						}
					}));
				} else {
					display_element.append($('<div>', {
						"id": 'jspsych-xab-stimulus',
						html: trial.x_path
					}));
				}

				setTimeout(function() {
					showSecondStimulus();
				}, 0);

                // setTimeoutHandlers.push(setTimeout(function(){
                //   showWarningScreen();
                // }, 5000));
			}

          function key_listener(){
            $(window).unbind('keypress', key_listener);
            $('.text-warning').html('Continuing...');

            setTimeoutHandlers.push(setTimeout(function(){
              display_element.empty();
              dotrial();
				for (var i = 0; i < setTimeoutHandlers.length; i++) {
					clearTimeout(setTimeoutHandlers[i]);
				}
            }, 1000));
          }

          function showWarningScreen() {
            $("#jspsych-xab-stimulus2").empty()
            display_element.empty();
            display_element.append($('<p>', {
              "class": 'text-warning',
              "html": 'You have not responded for a long time. Press any key to continue.'
            }));
            $(window).keypress(key_listener);
          }


			function showSecondStimulus() {

				// randomize whether the target is on the left or the right
				var images = [trial.a_path, trial.b_path];
				var target_left = (Math.floor(Math.random() * 2) === 0); // 50% chance target is on left.
				if (!target_left) {
					images = [trial.b_path, trial.a_path];
				}

				// show the options
				if (!trial.is_html) {
					$("#jspsych-xab-stimulus2").append($('<img>', {
						"src": images[0],
						"class": 'left',
					}));
					$("#jspsych-xab-stimulus2").append($('<img>', {
						"src": images[1],
						"class": 'right',
					}));
				} else {
					display_element.append($('<div>', {
						"class": 'jspsych-xab-stimulus left',
						html: images[0]
					}));
					display_element.append($('<div>', {
						"class": 'jspsych-xab-stimulus right',
						html: images[1]
					}));
				}

				if (trial.prompt !== "") {
					display_element.append($('<p>', {
						html:trial.prompt
					}));
				}

				var press_listener = function(e){
					if (e.keyCode == 108) {
						$('.left').css({'border-width': '3', 'border-color': '#E74C3C', 'border-style': 'solid'});
						$(window).unbind('keypress', press_listener);
					}
					if (e.keyCode == 114) {
						$('.right').css({'border-width': '3', 'border-color': '#E74C3C', 'border-style': 'solid'});
						$(window).unbind('keypress', press_listener);
					}
				};

				$(window).keypress(press_listener);

				// if timing_ab is > 0, then we hide the stimuli after timing_ab milliseconds
				// if (trial.timing_ab > 0) {
				// 	setTimeoutHandlers.push(setTimeout(function() {
				// 		$('.jspsych-xab-stimulus').css('visibility', 'hidden');
				// 	}, trial.timing_ab));
				// }

				// create the function that triggers when a key is pressed.
				var after_response = function(info) {

					document.getElementById('pleasant').play();

					// kill any remaining setTimeout handlers
					for (var i = 0; i < setTimeoutHandlers.length; i++) {
						clearTimeout(setTimeoutHandlers[i]);
					}

					var correct = false; // true when the correct response is chosen

					if (info.key == trial.left_key) // 'q' key by default
					{
						if (target_left) {
							correct = true;
						}
					} else if (info.key == trial.right_key) // 'p' key by default
					{
						if (!target_left) {
							correct = true;
						}
					}


					// create object to store data from trial
					var trial_data = {
						"rt": info.rt,
						"correct": correct,
						"stimulus": JSON.stringify([trial.x_path,trial.a_path,trial.b_path]),
						"key_press": info.key
					};
					jsPsych.data.write($.extend({}, trial_data, trial.data));

					xab_trial_complete = true;

					// move on to the next trial after timing_post_trial milliseconds
					if (trial.timing_post_trial > 0) {
						setTimeout(function() {
							display_element.html('')
							jsPsych.finishTrial();
						}, trial.timing_post_trial);
					} else {
						jsPsych.finishTrial();
					}

				};

				jsPsych.pluginAPI.getKeyboardResponse(after_response, [trial.left_key, trial.right_key], 'date', false);

			}
		};

		return plugin;
	})();
})(jQuery);
