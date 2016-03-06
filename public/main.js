(function() {
	"use strict";
	var comp = $('.company')[0];
	console.log(comp);
	comp.onclick = function() {
		$('#createCompany').toggle('slow');
		console.log('fdfd');
	};

	var compList = $('.companycr')[0];
	console.log(compList);
	compList.onclick = function() {
		$('#companyList').toggle('slow');
	};


})();