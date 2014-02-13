var attrArray = new Array();
var inputFields = 20, existingValue;
var mode = 0;
function changeMode(i) {
    activateDiv(null, 0);
    if(mode == i) return;
    mode = i;
    if (mode == 0) {
        $('#Editor').toggle();
    }
    else {
        $('#Editor').toggle();
        var editorhtml = document.getElementById('previewApp').innerHTML;
        console.log(editorhtml);
        $('#editor2').text(editorhtml);
    }
}
window.addEventListener('load', function () {
    myResize();
    $('#deleteDiv').hide();
    $('#settingsDiv').hide();
    document.getElementById('expandUp').addEventListener('click', function () { expand(-100); }, false);
    document.getElementById('expandDown').addEventListener('click', function () { expand(100); }, false);
}, false);
function myResize() {
    $('#previewApp').css('width', (window.innerWidth - 300) + 'px');
    $('#previewApp').css('height', (window.innerHeight - 120) + 'px');
}
function removeDiv() {
    $(activeDiv).remove();
    activateDiv(null, 0);
}
function validateModal() {
    if (activeDiv == "#previewApp") {
        for (var j = 0; j < attrArray.length; j++) {
            var i = attrArray[j];
            var validChild = document.getElementById("modalContent" + i);
            console.log(validChild.value + ' '+ i);
            if (i == 14) $(activeDiv).css('font-family',validChild.value);
            if (i == 20) $(activeDiv).css('background-color',validChild.value);
        }
        return;
    }

    var counter = $(activeDiv).attr('data-count');
    var dataType = $(activeDiv).attr('data-type');

    for (var j = 0; j < attrArray.length; j++) {
        var i = attrArray[j];
        var validChild = document.getElementById("modalContent" + i);
        if (i == 0) $('#' + dataType + '-' + counter + '-title').text(validChild.value);
        else if (i == 1) $('#' + dataType + '-' + counter + '-text').text(validChild.value);
        else if (i == 2) $('#' + dataType + '-a-' + counter).attr('href', validChild.value);
        else if (i == 3) $('#' + dataType + '-' + counter + '-content-' + 1).text(validChild.value);
        else if (i == 4) $('#' + dataType + '-' + counter + '-content-' + 1).attr('href', validChild.value);
        else if (i == 5) $('#' + dataType + '-' + counter + '-content-' + 2).text(validChild.value);
        else if (i == 6) $('#' + dataType + '-' + counter + '-content-' + 2).attr('href', validChild.value);
        else if (i == 7) $('#' + dataType + '-' + counter + '-content-' + 3).text(validChild.value);
        else if (i == 8) $('#' + dataType + '-' + counter + '-content-' + 3).attr('href', validChild.value);
        else if (i == 9) $('#' + dataType + '-' + counter + '-content-' + 4).text(validChild.value);
        else if (i == 10) $('#' + dataType + '-' + counter + '-content-' + 4).attr('href', validChild.value);
        else if (i == 11) $('#' + dataType + '-' + counter + '-content-' + 5).text(validChild.value);
        else if (i == 12) $('#' + dataType + '-' + counter + '-content-' + 5).attr('href', validChild.value);
        else if (i == 13) $('#' + dataType + '-' + counter + '-text').css('font-size', validChild.value);
        else if (i == 14) $('#' + dataType + '-' + counter + '-text').css('font-family', validChild.value);
        else if (i == 16) {
            if (validChild.checked) $('#' + dataType + '-' + counter + '-text').css('font-weight', "bold");
            else $('#' + dataType + '-' + counter + '-text').css('font-weight', "normal");
        }
        else if (i == 17) {
            if (validChild.checked) $('#' + dataType + '-' + counter + '-text').css('font-style', "italic");
            else $('#' + dataType + '-' + counter + '-text').css('font-style', "normal");
        }
        else if (i == 18) {
            var buttonVar = $('#' + dataType + '-' + counter);
            if (dataType == 'navigation-pills') {
                buttonVar.removeClass('mynav-' + existingValue);
                buttonVar.addClass('mynav-' + validChild.value);
            }
            else{
            buttonVar.removeClass('btn-' + existingValue);
            buttonVar.addClass('btn-' + validChild.value);
            }
        }
        else if (i == 19) {
            var buttonVar = $('#' + dataType + '-' + counter);
            buttonVar.removeClass('navbar-' + existingValue);
            buttonVar.addClass('navbar full-fit');
            buttonVar.addClass('navbar-' + validChild.value);
        }
    }
    clearModal();
}
function clearModal() {
    for (var i = 0; i <= 12; i++) {
        var validChild = document.getElementById("modalContent" + i);
        validChild.value = "";
    }
}
function validInput(att) {
   // console.log($(activeDiv).attr(att) + " " + $(activeDiv).attr('data-type'));
    if ($(activeDiv).attr(att) == undefined) return false;
    if ($(activeDiv).attr(att) == null) return false;
    return true;
}
function assignArray(type) {
    for (var i = 0; i <= inputFields; i++) {
        var allInput = $("#modalContent" + i);
        allInput.hide();
        var allLabel = $("#modalLabel" + i);
        allLabel.hide();
    }
    attrArray = [];
    switch (type) {
        case 'button': attrArray = [0, 2, 18];
            break;
        case 'navbar': attrArray = [0, 3, 4, 5, 6, 7, 8,  19];
            break;
        case 'navigation-pills': attrArray = [3, 4, 5, 6, 7, 8, 18];
            break;
        case 'navigation-tabs': attrArray = [3, 4, 5, 6, 7, 8];
            break;
        case 'dropdown': attrArray = [0, 3, 4, 5, 6, 7, 8,18];
            break;
        case 'image': attrArray = [15];
            break;
        case 'list': attrArray = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            break;
        case 'jumbotron':
        case 'panel': attrArray = [0, 1];
            break;
        case 'paragraph': attrArray = [1, 13, 14, 16, 17];
            break;
        default:
            attrArray = [14, 20];
    }
    for (var j = 0; j < attrArray.length; j++) {
        var i = attrArray[j];
        var allInput = $("#modalContent" + i);
        allInput.show();
        var allLabel = $("#modalLabel" + i);
        allLabel.show();
    }
}
function populateModal() {
    if (activeDiv == "#previewApp") {
        assignArray('none');
        for (var j = 0; j < attrArray.length; j++) {
            var i = attrArray[j];
            var validChild = document.getElementById("modalContent" + i);
            if (i == 14) validChild.value = $(activeDiv).css('font-family');
            if (i == 20) validChild.value = $(activeDiv).css('background-color');
            $('#optionsModal').modal('show');
        }
        return;
        }
    var counter = $(activeDiv).attr('data-count');
    var dataType = $(activeDiv).attr('data-type');
   // console.log(dataType);
    assignArray(dataType);

    for (var j = 0; j < attrArray.length; j++) {
        var i = attrArray[j];
        var validChild = document.getElementById("modalContent" + i);
     //   console.log(dataType + '-' + counter + '-title');
        if (i == 0) validChild.value = $('#' + dataType + '-' + counter + '-title').text();
        else if (i == 1) validChild.value = $('#' + dataType + '-' + counter + '-text').text();
        else if (i == 2) validChild.value = $('#' + dataType + '-a-' + counter).attr('href');
        else if (i == 3) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 1).text();
        else if (i == 4) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 1).attr('href');
        else if (i == 5) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 2).text();
        else if (i == 6) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 2).attr('href');
        else if (i == 7) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 3).text();
        else if (i == 8) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 3).attr('href');
        else if (i == 9) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 4).text();
        else if (i == 10) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 4).attr('href');
        else if (i == 11) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 5).text();
        else if (i == 12) validChild.value = $('#' + dataType + '-' + counter + '-content-' + 5).attr('href');
        else if (i == 18) {
            var buttonVar = $('#' + dataType + '-' + counter);
            var tag = 'btn-';
            if (dataType == 'navigation-pills') tag = 'mynav-';
            console.log(tag);
            if (buttonVar.hasClass(tag + 'primary')) validChild.value = 'primary';
            else if (buttonVar.hasClass(tag + 'default')) validChild.value = 'default';
            else if (buttonVar.hasClass(tag + 'danger')) validChild.value = 'danger';
            else if (buttonVar.hasClass(tag + 'success')) validChild.value = 'success';
            else if (buttonVar.hasClass(tag + 'warning')) validChild.value = 'warning';
            else if (buttonVar.hasClass(tag + 'info')) validChild.value = 'info';
         
            existingValue = validChild.value;
        }
        else if (i == 19) {
            var buttonVar = $('#' + dataType + '-' + counter);
            if (buttonVar.hasClass('navbar-default')) validChild.value = 'default';
            else if (buttonVar.hasClass('navbar-inverse')) validChild.value = 'inverse';
            existingValue = validChild.value;
        }
    }
    $('#optionsModal').modal('show');
}
function clickListener(data) {
    alert(data.id);
}
var contentCounter = 0, theActiveDiv = "previewApp", activeDiv = "#previewApp";
function activateDiv(div, actOrDec) {
    $('#deleteDiv').hide();
    $('#settingsDiv').hide();
    $(activeDiv).removeClass('highlight');
    if (actOrDec == 1) {
        $('#deleteDiv').show();
        $('#settingsDiv').show();
        activeDiv = "#" + div.id;
        theActiveDiv = div.id;
        $(activeDiv).addClass('highlight');
    }
    else {
        activeDiv = "#previewApp";
        theActiveDiv = "previewApp";
    }
}
function processResults(file) {
    if (file) {
       
        var imageBlob = URL.createObjectURL(file);
        return imageBlob;
    } else {
        //displayError("An image wasn't selected.");
    }
}
function displayError() {
}

function addContent(type, count) {
    if (mode == 1) return;
    var imageBlob;
    activateDiv(null, 0);
    var appendContent = '<div style="width:300px; top:0px; left:0px; height:200px; position:absolute;padding:5px;"  id="div-' + contentCounter + '" data-count="' + contentCounter + '" data-type="' + type + '" class="wrapper">';
    var endContent = '</div>'
    if (type == "button") {
        appendContent += '<button id="button-' + contentCounter + '" type="button" class="btn btn-primary full-fit"> \
		<a href="#" style="display:block; width:100%; text-decoration:none; color:white" id="button-a-'+ contentCounter +
		'"><span id="button-' + contentCounter + '-title">Button</span></a></button>';
    }
    if (type == "navbar") {
        appendContent += createNavbar();
    }
    if (type == "dropdown") {
        appendContent += createDropdownButton();
    }
    if (type == "navigation-pills") {
        appendContent += createNavigationPills();
    }
    if (type == "navigation-tabs") {
        appendContent += createNavigationTabs();
    }
    if (type == "image") {
        
        appendContent += createImage();
        

        
    }
    if (type == "list") {
        appendContent += createList();
    }
    if (type == "jumbotron") {
        appendContent += createJumbotron();
    }
    if (type == "panel") {
        appendContent += createPanel();
    }
    if (type == "paragraph") {
        appendContent += createParagraph();
    }
    appendContent += endContent;
    $(activeDiv).append(toStaticHTML(appendContent));
    if (type == "image") {

        
        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.fileTypeFilter.replaceAll([".jpg", ".bmp", ".gif", ".png"]);
        picker.pickSingleFileAsync().then(function (file) {
            if (file) {
                var localFolder = Windows.Storage.ApplicationData.current.localFolder;
                file.copyAsync(localFolder).done(function (file) {
                    document.getElementById("image-" + (contentCounter - 1)).src = file.path;
                    ;});
                
                
            } else {
                //displayError("An image wasn't selected.");
            }
        }, displayError);


    }
    //$(activeDiv).append(appendContent);
    $('#div-' + contentCounter).resizable({ containment: "parent" }).draggable({ containment: "parent" });

    document.getElementById('div-' + contentCounter).addEventListener('click', function () {
        activateDiv(this, 1);
    }, false);
    contentCounter++;
}

function createDropdownButton() {
    //console.log('');
    return '<div class="btn-group full-fit"> \
<button id="dropdown-' + contentCounter + '" type="button" class="btn btn-danger dropdown-toggle full-fit" data-toggle="dropdown">  \
    		<a href="#" style="display:block; width:100%; text-decoration:none; color:white" id="dropdown-a-'+ contentCounter +
            '"><span id="dropdown-' + contentCounter + '-title">Action</span><span class="caret"></a></span>  \
  </button>  \
  <ul class="dropdown-menu" role="menu">  \
    <li><a id="dropdown-' + contentCounter + '-content-1" href="#">Action 1</a></li>  \
    <li><a id="dropdown-' + contentCounter + '-content-2" href="#">Action 2</a></li>  \
    <li><a id="dropdown-' + contentCounter + '-content-3" href="#">Action 3</a></li>  \
    <li class="divider"></li>  \
 </ul> \
 </div>';
}
function createParagraph() {
    return '<p id="paragraph-' + contentCounter + '-text" style="font-family:arial; font-size: 15px;" class="full-fit"> Add Your Contents Here! </p>';
}
function createNavbar() {
    var id = 'navbar-' + contentCounter + '-';
    var cid = id + "content-";
    var lid = id + "li-";
    return '<nav id="navbar-' + contentCounter + '" class="navbar navbar-default full-fit" role="navigation">' +
      '<div class="navbar-header">' +
        '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-' + contentCounter + '" >' +
          '<span class="sr-only">Toggle navigation</span>' +
          '<span class="icon-bar"></span>' +
          '<span class="icon-bar"></span>' +
          '<span class="icon-bar"></span>' +
        '</button>' +
       '<a id="navbar-' + contentCounter + '-title" class="navbar-brand" href="#">Brand Name</a>' +
      '</div>' +
      '<div class="collapse navbar-collapse" id="navbar-collapse-' + contentCounter + '">' +
        '<ul class="nav navbar-nav">' +
          '<li id="' + lid + '1" class="active"><a id="' + cid + '1" href="#">Link 1</a></li>' +
          '<li id="' + lid + '2"><a id="' + cid + '2" href="#">Link 2</a></li>' +
         '<li id="' + lid + '3"><a id="' + cid + '3" href="#">Link 3</a></li>' +
        '</ul>' +
      '</div>' +
    '</nav>';
}
function createNavigationPills() {
    var id = 'navigation-pills-' + contentCounter + '-';
    return '<ul id="navigation-pills-' + contentCounter + '" class="nav nav-pills navbar-success mynav-warning full-fit"> \
  			<li id="' + id + 'li-1" class="active"> \
  			<a id="' + id + 'content-1" href="#">Link 1</a></li> \
 	 		<li id="' + id + 'li-2"><a id="' + id + 'content-2" href="#">Link 2</a></li> \
  			<li id="' + id + 'li-3"><a id="' + id + 'content-3" href="#">Link 3</a></li> \
		</ul>'
}
function createNavigationTabs() {
    var id = 'navigation-tabs-' + contentCounter + '-';
    return '<ul id="navigation-tabs-' + contentCounter + '"class="nav nav-tabs full-fit"> \
  			<li id="' + id + 'li-1" class="active"><a id="' + id + 'content-1" href="#">Link 1</a></li> \
 	 		<li id="' + id + 'li-2"><a id="' + id + 'content-2" href="#">Link 2</a></li> \
  			<li id="' + id + 'li-3"><a id="' + id + 'content-3" href="#">Link 3</a></li> \
		</ul>'
}
function createImage() {
    return '<img  id="image-' + contentCounter + '"  class="full-fit" />';
}
function createList() {
    var id = 'list-' + contentCounter + '-';
    var cid = id + "content-";
    var lid = id + "li-";

    return '<div class="list-group full-fit"> \
 	<a id="' + id + 'content-1" href="#" class="list-group-item active">List Element 1</a> \
  	<a id="' + id + 'content-2" href="#" class="list-group-item">List Element 2</a> \
  	<a id="' + id + 'content-3" href="#" class="list-group-item">List Element 3</a> \
  	<a id="' + id + 'content-4" href="#" class="list-group-item">List Element 4</a> \
  	<a id="' + id + 'content-5" href="#" class="list-group-item">List Element 5</a> \
	</div>'
}
function expand(dist) {
    var ele = document.getElementById('previewApp');
    var ht = ele.offsetHeight;
   // console.log('|' + ht + '|' + dist + '|');
    if (dist < 0 && ht > 1000) ele.style.height = (ht + dist) + 'px';
    else if (dist > 0) {
     //   console.log('Trying to increase the height');
        ele.style.height = (ht + dist) + 'px';
    }
}
function createJumbotron() {
    return '<div class="jumbotron full-fit"> \
  <h1 id="jumbotron-'+ contentCounter + '-title">Title</h1> \
  <p id="jumbotron-'+ contentCounter + '-text">Contents</p> \
 </div>'
}
function createPanel() {
    return '<div class="panel panel-default full-fit"> \
  <div class="panel-heading"> \
    <h3 id="panel-'+ contentCounter + '-title" class="panel-title">Panel title</h3> \
  </div> \
  <div id="panel-'+ contentCounter + '-text" class="panel-body"> Panel content \
  </div> \
</div>'
}