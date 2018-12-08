
$(document).ready(function() {

	'use strict';

	// Set focus on the first text field
	$('#name').focus();

	$('.basic').append("<input type='text' id='other-title' placeholder='Your Title'>");
	$('#other-title').hide();

	$('#color').hide();
	$('#colors-js-puns > label').hide();

	// Job Role section of the form.
	// Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
	$('#title').change(function() {

		var selected = $(this).val();

		if (selected === 'other') {
			$('#other-title').show();
		} else {
			$('#other-title').hide();
		}

	})

	// T-Shirt Info section of the form.
	// For the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.
	$('#design').change(function() {
		var selected = $(this).val();

		if(selected === 'js puns') {
			$('#color').children().remove();
			$('#color').append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>');
			$('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>');
			$('#color').append('<option value="gold">Gold (JS Puns shirt only)</option>');
			$('#colors-js-puns > label').show();
			$('#color').show();
		} else if(selected === 'heart js') {
			$('#color').children().remove();
			$('#color').append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>');
			$('#color').append('<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>');
			$('#color').append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
			$('#colors-js-puns > label').show();
			$('#color').show();
		} else {
			$('#colors-js-puns > label').hide();
			$('#color').hide();
		}
	})

	// Register for Activities section of the form.
	var mainConf = $('input[name = "all"]');
	var jsFrameWS = $('input[name = "js-frameworks"]');
	var jsLibWS = $('input[name = "js-libs"]');
	var expressWS = $('input[name = "express"]');
	var nodeWS = $('input[name = "node"]');
	var toolWS = $('input[name = "build-tools"]');
	var npmWS = $('input[name = "npm"]');
	var total = 0 ;

	$('.activities').append('<h4 id="total"></h4>');

	function confictWorkshop(checkBox, input) {

		if (checkBox.is(':checked')) {
			input.prop('disabled', true);
		} else {
			input.prop('disabled', false);
		}

		addPrice(checkBox, 100);
		input.parent().toggleClass('conflict-label');
	}

	function addPrice(checkBox, price) {
		if (checkBox.is(':checked')) {
			updateTotal(price);
		} else {
			updateTotal(price * -1);
		}
	}

	function updateTotal(price) {
		total = total + price;
		$('#total').html('Total: $' + total);
	}

	mainConf.change(function() {
		addPrice($(this), 200);
	});

	jsFrameWS.change(function() {
		confictWorkshop($(this), expressWS);
	});

	jsLibWS.change(function() {
		confictWorkshop($(this), nodeWS);
	});

	expressWS.change(function() {
		confictWorkshop($(this), jsFrameWS);
	});

	nodeWS.change(function() {
		confictWorkshop($(this), jsLibWS);
	});

	toolWS.change(function() {
		addPrice($(this), 100);
	});

	npmWS.change(function() {
		addPrice($(this), 100);
	});


	// Payment Info section of the form. Display payment sections based on chosen payment option
	$('#paypal, #bitcoin').hide();
	$('#payment').val("credit card");

	$('#payment').change(function() {
		if($(this).val() === "paypal") {
			$('#credit-card, #bitcoin').hide();
			$('#paypal').show();
		} else if ($(this).val() === "bitcoin") {
			$('#credit-card, #paypal').hide();
			$('#bitcoin').show();
		} else {
			$('#credit-card').show();
			$('#bitcoin, #paypal').hide();
		}
	});


var regExEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var regExNumber = /^(0|[1-9][0-9]*)$/;

	// Form Validation
	$('form').submit(function(e) {
		e.preventDefault();

		$("label[id$=error]").remove();

		// Name field can't be empty
		if($('#name').val() === "") {
			$('html body').animate({scrollTop : $('.basic').offset().top});
			$('#name').prev().append('<label id="name_error">Please enter Name</label>')
			$('#name').focus();

		// Email field must be a validly formatted e-mail address
		} else if ( !regExEmail.test($('#mail').val()) ) {
			$('html body').animate({scrollTop : $('.basic').offset().top});
			$('#mail').prev().append('<label id="email_error">Please enter a valid email</label>')
			$('#mail').focus();

		// At least one activity must be checked from the list under "Register for Actitivities."
		} else if ($('.activities > label > input:checked').length === 0) {
			$('html body').animate({scrollTop : $('.activities').offset().top});
			$('.activities').prepend('<label id="activity_error">Please select at least one activity</label>');

		// Payment option must be selected.
		} else if ($('#payment').val() === "select_method") {
			$('html body').animate({scrollTop : $('#payment').offset().top});
			$('#payment').prev().append('<label id="payment_error">Please select payment method</label>');

		// If "Credit card" is the selected payment option,
		// make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.
		} else if ( $('#payment').val() === "credit card"  && !regExNumber.test($('#cc-num').val())) {
			$('html body').animate({scrollTop : $('#credit-card').offset().top});
			$('#credit-card').prepend('<label id="cc_error">Please enter valid Card number</label>');
			$('#cc-num').focus();

		// Check credit card number length
		} else if ($('#payment').val() === "credit card" && $('#cc-num').val().length < 16) {
			$('html body').animate({scrollTop : $('#credit-card').offset().top});
			$('#credit-card').prepend('<label id="cc_error">Please enter valid Card number</label>');
			$('#cc-num').focus();

		// zip code
		} else if (($('#payment').val() === "credit card") && (!regExNumber.test($('#zip').val()))) {
			$('html body').animate({scrollTop : $('#credit-card').offset().top});
			$('#credit-card').prepend('<label id="zip_error">Please enter zip code</label>');
			$('#zip').focus();

		// CVV value.
		} else if ($('#payment').val() === "credit card" && $('#cvv').val().length < 3 ) {
			$('html body').animate({scrollTop : $('#credit-card').offset().top});
			$('#credit-card').prepend('<label id="cvv_error">Please enter CVV number</label>');
			$('#cvv').focus();

		} else {

			alert('Form has been submitted succesfully');
			$('html body').animate({scrollTop : 0});

			// Clear the fields
			$("input").val("");
			$('#title').val("full-stack js developer");

			$('#size').val("medium");
			$('#design').val('Select Theme');
			$('#colors-js-puns > label').hide();
			$('#color').hide();
			$('#exp-year').val("2016");
			$('#exp-month').val("1");

			$('input[type="checkbox"]').prop('checked', false)
			$('input[type="checkbox"]').prop('disabled', false);
			$('input[type="checkbox"]').parent().removeClass('conflict-label');

			total = 0;
			$('#total').html("");

			$('#payment').val("credit card");
			$('#credit-card').show();
			$('#bitcoin, #paypal').hide();
		}

	})

})
