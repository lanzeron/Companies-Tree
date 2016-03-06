(function() {
    "use strict";
    var editList = document.querySelector('#editList');
    var companyTree = $('#companyTree');

    tree();
    $(editList).change(getName);
    function getName () {
   	var url = 'http://localhost:3000/data';
    var request;
    request = $.get(url);
    request.complete(callback);

    function callback(data) {
        var res = JSON.parse(data.responseText);


            for (var i = 0; i < res.length; i++) {
            
            	if (res[i].name == editList.value) {
            		document.querySelector('.editName').value = res[i].name;
            		document.querySelector('.editEstimate').value = res[i].estimated;
            	}

    }
  }
    }

    function tree () {
    var url = 'http://localhost:3000/data';
    var request;
    request = $.get(url);
    request.complete(callback);

    function callback(data) {
        var res = JSON.parse(data.responseText);
            for (var i = 0; i < res.length; i++) {
            if (!res[i].parent) {
                companyTree.append($('<li></li>').text(res[i].name + " " +"|"+" "+ res[i].estimated));
            }
        }
        $('li').hover(function click(e) {
        	var li = e.target;
        	if (!$(li).children().text()) {
            res.forEach(function(item) {
                if (item.parent == $(e.target).clone().children().remove().end().text()) {
                    $(e.target).append($('<ul></ul>').text(item.name+ " " +"|"+" "+item.estimated).hover(click));
                }
            });
        }
        });
    }
    }


})();