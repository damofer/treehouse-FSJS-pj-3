"use strict"; // few new tricks, hu? , go to line 415 for an improvement.

// Get focus on first input with type text.
var inputList = document.getElementsByTagName("input");
for(var input in inputList){
 if (inputList.hasOwnProperty(input)) {
	if(inputList[input].type == "text"){
		inputList[input].focus();
		break;
	}
 }
}

// Add new input to the Dom in case the JobRole is Other.

// job role addition ////////////////////////////////////
var jobRole = document.getElementById("title");


jobRole.addEventListener("change",function(){

	if(jobRole.value == "other"){

		var newInput =document.createElement("input");
		newInput.id = "other-title";
		newInput.type="text";
		newInput.placeholder = "Your Title";

		jobRole.parentNode.insertBefore(newInput, jobRole.nextSibling);
	}
	else{
		try{
		document.getElementById("other-title").remove();
		}
		catch(e){

		}
	}
});

//end of job role addition //////////////////////////////


//design and color pick section /////////////////////////

var design = document.getElementById("design");
var color = document.getElementById("color");
	var colorList = color.children;
function clearColors(colorList,message){
	var newOption = document.createElement("option");
	newOption.value = "noOption";
	newOption.innerText=message;
	newOption.id ="no-option";

	for(var item in colorList){
		 if (colorList.hasOwnProperty(item)) {
				try{colorList[item].style.display ="none";}
					catch(e){
						// console.log(e);
					}
		 }
				

	}
	color.insertBefore(newOption,color.firstChild);
	color.value =newOption.value;
}
function setColors(colorList,color1,color2,color3){
	var value;

		for(var i =0; i <colorList.length; i ++){
			value = colorList[i].value;
					if(value ==color1 || value ==color2 || value ==color3){
							colorList[i].style.display="block";

					}else{
					
						try{colorList[i].style.display ="none";}
						catch(e){
							// console.log(e);
						}
					}
		}

	color.value =color1;

	}
	$("#colors-js-puns").hide();
clearColors(colorList,"select a design first");

design.addEventListener("change",function(){

	try{
	var child =document.getElementById("no-option");
		child.remove();
	}
	catch(e){ //console.log(e);
	}

	if(this.value =="js puns"){
		$("#colors-js-puns").show();
		setColors(colorList,"cornflowerblue","darkslategrey","gold");

	}else if(this.value =="heart js"){
		$("#colors-js-puns").show();
		setColors(colorList,"tomato","steelblue","dimgrey");

	}else{
		$("#colors-js-puns").hide();
		clearColors(colorList,"select a design first");
	}
});

//end of design and color section ////////////////////////

//activities section /////////////////////////////////

// Tuesday - 9am - 12pm : js-frameworks , express
// Tuesday - 1pm - 4pm : js-libs ,  node
// Wednesday 9am - 12pm : build-tools
// Wednesday 1pm - 4pm: npm
// Conclusion : the checkboxes that collide are Js-framework with express and Js-libs with node.

var jsFramework = document.getElementsByName("js-frameworks")[0];
var express = document.getElementsByName("express")[0];
var jsLibs = document.getElementsByName("js-libs")[0];
var node = document.getElementsByName("node")[0];

// method that makes checkboxes mutually exclusive
function exclude(element1 , element2){
	element1.addEventListener("change",function(){
		if(element1.checked){
			element2.disabled = true;
			element2.parentNode.style.opacity = 0.5;
		}else{
			element2.disabled = false;
			element2.parentNode.style.opacity = 1;
		} 
	
	});
}
//Adding a total
var total= 0;
//setting function that handles the activities section.
function setActivities(){

	exclude(jsFramework,express);
	exclude(express,jsFramework);
	exclude(jsLibs,node);
	exclude(node,jsLibs);



	var $activities = $(".activities");
	var $activities_checkboxes = $(".activities input");

	$.each($activities_checkboxes, function(){
		this.addEventListener("change", function(){
			if(this.checked){
				if(total === 0){
					var label_total =document.createElement("label");
					label_total.id = "total";				
					$activities.append(label_total);

				}
				total = total + parseInt(this.value);
				document.getElementById("total").innerText= "Total : $"+total;
			}else{
				total = total - parseInt(this.value);
				if(total === 0){
					document.getElementById("total").remove();
				}else{
					document.getElementById("total").innerText= "Total : $"+total;
				}
				
			}
		});
	});


}

setActivities();

//end of activity section ////////////////////////////



//payment section ////////////////////////////////////

//visual manipulation of the DOM
function hideElement ( element ){

	element.style.display =  "none";
}
function showElement(element){

	element.style.display= "block";
}
function hideAll(array){
	for(var i = 0; i< array.length; i++){
		hideElement(array[i]);
	}
}

//capture payment input into variables
var paymentMethods =[];
var creditCard =document.getElementById("credit-card");
var paypal = document.getElementById("paypal");
var bitcoin = document.getElementById("bitcoin");

paymentMethods.push(creditCard,paypal,bitcoin);
hideAll(paymentMethods);


var paymentSelector = document.getElementById("payment");

//default payment method 
paymentSelector.value = "credit card";
showElement(creditCard);
// on payment change.
paymentSelector.addEventListener("change", function(){
	hideAll(paymentMethods);
	switch (this.value)
	{
		case "credit card":
		
			showElement(creditCard);
			break;
		
		case "paypal":
		
			showElement(paypal);
			break;
		
		case "bitcoin":
		
			showElement(bitcoin);
			break;
		
		 default:
        	break;
	}
});

//end of payment section //////////////////////////////

//validation section //////////////////////////////////


// if everything isnt validated then the form wont submit.
$(document).ready(function() {
	document.getElementById("other-title").remove();
	$("#myForm").submit(function(event){
			
		if(!validate()){
			event.preventDefault(); 
		}

		
		
	});
});

//validate all input fields
function validate(){
	
	
	

	var v_a = validate_name();
	var v_b = validate_mail();
	var v_c = validate_role();
	var v_d =validate_item();
	var v_e =validate_activities();
	var v_f =validate_payment();

	console.log( "name =" + v_a );
	console.log( "mail =" + v_b );
	console.log( "role =" + v_c );
	console.log( "item =" + v_d );
	console.log( "activities =" + v_e );
	console.log( "payment =" + v_f );
	console.log( "**************");


	if( v_a&&v_b&&v_c&&v_d&&v_e&&v_f) {
		console.log("ALL OK");
		return true;

	}else return false;
	
}


//  validate specific fields.
function validate_name(){
	var name = document.getElementById("name");
		var $label_name = $('label[for="name"]').get(0);
	if(name.value === "" || name.value === null ){
	
		$label_name.style.color = "red";
		$label_name.innerText = "Name : ( its required )";
		return false;
	}else{
		$label_name.style.color = "black";
		$label_name.innerText = "Name : ";
		return true;
	}
}
function validate_mail(){
	var mail =document.getElementById("mail");
	var $label_mail = $('label[for="mail"]').get(0);
	if(mail.value ==="" || mail.value === null){
		
		$label_mail.style.color = "red";
		$label_mail.innerText = "Mail : ( its required )";
		return false;
		
	}else{
		$label_mail.style.color = "black";
		$label_mail.innerText = "Mail : ";
		return true;
	} 
}
function validate_role(){

	var $x = $("#other-title");

	
	if($x.length >0){
		
			
			if($x[0].value !== "" ){
				$("#role_warning").remove();

			return true;
			}
			else{
				if($("#role_warning").length === 0) {
				createErrorMsg("role", $x,"please type your role");
			}
			return false;

			}
		

		
	}
	else{
		$("#role_warning").remove();
		return true;

	}
}

function validate_item(){

	if(color.value == "noOption"){
		
	
		var $legend = $(".shirt legend");
		if($("#color_warning").length === 0) {
			$legend.after("<p id ='color_warning'style ='color:red'>Item and color need to be selected</p>");
			
		}
		return false;
	}
	else{
		$("#color_warning").remove();
		return true;
	}
}
function validate_activities(){
	if(total === 0){
		
	
	var $legend = $(".activities legend");
		if($("#activity_warning").length === 0) {
			$legend.after("<p id ='activity_warning'style ='color:red'>At least 1 activity required</p>");
			
		}
		return false;
	}
	else{
		$("#activity_warning").remove();
		return true;
	}
}

function validate_payment(){

	if(paymentSelector.value == "select_method"){

		
		
	var $legend = $("#payment-label");
		if($("#payment_warning").length === 0) {
			$legend.after("<p id ='payment_warning'style ='color:red'>Payment method required</p>");
		}
		return false;
	}
	else{
		$("#payment_warning").remove();

		if(paymentSelector.value == "credit card"){

			return validate_creditCard();
		}
		return true;
	}
}


//IMPROVEMENT//////////////////
//this i an improvement of the last code, i made a single function for all CC fields validation.
function validate_cc_field(element,itemName, warningMsg, min, max){
		
		var warningId= "#"+itemName+"_warning";
		if(element[0].value.length < min || element[0].value.length > max ){
		
			if( !($( warningId ).length) ){
			createErrorMsg(itemName,element,warningMsg);
			
			}else{
				$(warningId).text(warningMsg);
				
			}
			return false;
		}
		else{


			try{
	       		 	if(isNaN(element[0].value)) throw itemName +" is NaN";
		        	
		        	if($( warningId ).length){
		        		document.getElementById(itemName + "_warning").remove();
		        	}
		        	return true;
	        	}
   		catch(e){
		   		
				if( !($( warningId ).length) ){
				createErrorMsg(itemName,element,e);
				}else{
					$(warningId).text(e);
				}
		       return false;
    		}
		
		}

	}

// credit card validation
function validate_creditCard(){

	var $card_Number = $("#cc-num");
	var $zip = $("#zip");
	var $cvv = $("#cvv");
	var ccOK = false;
	var zipOK = false;
	var ccvOK = false;
	

	ccOK =validate_cc_field($card_Number,"cc","cc number required, 13 to 16 digits",13,16);

	zipOK = validate_cc_field($zip,"zip","zip required 4 to 6",4,6);

	ccvOK = validate_cc_field($cvv,"cvv","cvv must be 3 digits",3,3);
	


	console.log("/////// payment ////////");
	console.log( "cc =" + ccOK );
	console.log("zip =" + zipOK);
	console.log("ccv =" + ccvOK);
	console.log("///////////////");

	return ccOK && zipOK && ccvOK;
}

// error msg generator.
function createErrorMsg(id, element,msg){
		var eMesg = document.createElement("label");
		eMesg.id = id+"_warning";
		eMesg.innerText =msg;
		eMesg.style.color ="red";
		eMesg.style.position = "absolute";
		eMesg.style.margin ="-1em auto auto auto";
		element.parent().append(eMesg);

}
	//end of validation section /////////////////////////