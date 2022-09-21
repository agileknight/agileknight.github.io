jQuery(document).ready(function($) {
	/* === Handles palceholder values for input and textareas in older browsers === */
	$('input, textarea').placeholder();
	
	/* === Pretty Photo === */
	$("a[rel^='prettyPhoto']").prettyPhoto();
	
	/* === Fit Videos === */
	//$(".scale-video").fitVids();
	
	/* === Portfolio Filter Menu === */
	$('ul.filter li a').click(function(e) {
		e.preventDefault();
		
		$('ul.filter li.active').removeClass('active');
		$(this).parent().addClass('active');
		
		var filterVal = $(this).text().toLowerCase().replace(new RegExp(" ", "g"), "-");
		
		if(filterVal == 'all') {
			$('.work').removeClass('item-hidden');
			$('.work a').attr('rel', 'prettyPhoto[biopic_works_gal]');
		}
		else {
			$('.work').each(function(index, element) {
				if(!$(this).hasClass(filterVal)) {
					$(this).addClass('item-hidden');
					$('a', this).attr('rel', '');
				}
				else {
					$(this).removeClass('item-hidden');
					$('a', this).attr('rel', 'prettyPhoto[biopic_works_gal]');
				}
			});
		}
	});
	
	/* === Accordion === */
	var accordionTabs = $('.accordion > .atab');
	$('.accordion > .atitle > a').click(function(e) {
		e.preventDefault();
		
		var currenttab = $(this);
		var targetTab =  currenttab.parent().next();
		
		// if same tab clicked then close it
		if (currenttab.parent().hasClass('active')) {
			accordionTabs.slideUp(300, 'easeOutExpo');
			currenttab.parent().parent().find('.atitle').removeClass('active');
		}
		else if(!targetTab.hasClass('active'))	{
			accordionTabs.slideUp(300, 'easeOutExpo');
			targetTab.slideDown(300, 'easeOutExpo');
			currenttab.parent().parent().find('.atitle').removeClass('active');
			currenttab.parent().addClass('active');
		}
	});
	
	
	/* === Toggle === */
	$(".toggle > .ttitle > a").click(function(e) {
		e.preventDefault();
		
		if($(this).parent().hasClass('active'))	{
			$(this).parent().removeClass("active").closest('.toggle').find('.ttab').slideUp(300, 'easeOutExpo');
		}
		else {
			$(this).parent().addClass("active").closest('.toggle').find('.ttab').slideDown(300, 'easeOutExpo');
		}
	});
	
	/* === Closes alert boxes e.g. warning, success etc. === */
	$('.alert-box .close-btn').click(function(e) {
		e.preventDefault();
		$(this).parent().slideUp();
	});
	
	/* === contact form validation === */
	$('#fc-contact-btn').click(function(e) {
		e.preventDefault();
		$('#fc-contact-form').submit();
	});
	
	$('#fc-contact-form').submit(function(e) {
		var isValid = true;
		
		if ($('#uname').val() == '') {
			isValid = false;
			$('#fc-contact-form .uname-error').text(site_data.name_field_error);
			$("#fc-contact-form .uname-error").slideDown(500);
		}
		else {
			$("#fc-contact-form .uname-error").slideUp(500);
		}
		
		if ($('#uemail').val() == '') {
			isValid = false;
			$('#fc-contact-form .uemail-error').text(site_data.email_field_error);
			$("#fc-contact-form .uemail-error").slideDown(500);
		}
		else if (!validateEmail($('#uemail').val())) {
			isValid = false;
			$('#fc-contact-form .uemail-error').text(site_data.email_invalid_field_error);
			$("#fc-contact-form .uemail-error").slideDown(500);
		}
		else {
			$("#fc-contact-form .uemail-error").slideUp(500);
		}
		
		if ($('#umessage').val() == '') {
			isValid = false;
			$('#fc-contact-form .umessage-error').text(site_data.message_field_error);
			$("#fc-contact-form .umessage-error").slideDown(500);
		}
		else {
			$("#fc-contact-form .umessage-error").slideUp(500);
		}
		
		if (isValid) {
			$.post("<?php echo site_url(); ?>/wp-admin/admin-ajax.php",
			{action:'fc_contact_form_handler', uname:$('#uname').val(), uemail:$('#uemail').val(), usubject:$('#usubject').val(), umessage:$('#umessage').val()},
			function(data) {
				if (data.status == "success") {
					$('#fc-contact-form .msg-box').removeClass('error');
					$('#fc-contact-form .msg-box').addClass('success');
					$('#fc-contact-form .msg-box span').text(site_data.email_success_text);
					$("#fc-contact-form .msg-box").slideDown(500);
				}
				else {
					$('#fc-contact-form .msg-box').removeClass('success');
					$('#fc-contact-form .msg-box').addClass('error');
					$('#fc-contact-form .msg-box span').text(site_data.email_failure_text);
					$("#fc-contact-form .msg-box").slideDown(500);
				}
			}, "json");
		}
		
		return false;
	});

});