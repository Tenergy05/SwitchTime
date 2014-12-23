var timeTick;
var time = 0;
var timerStarted = [false];

$(function(){
    $("ul").sortable({
        connectWith: "ul"
    });
    var timeStart = Date.now();
    timeTick = setTimeout(function () { timer(timeStart) }, 1000);
});

function toggleTime(tableNum) {
    button = document.getElementById("s" + tableNum);
    if (timerStarted[tableNum - 1]) {
        timerStarted[tableNum - 1] = false;
        button.innerText = "Start";
    } else {
        timerStarted[tableNum - 1] = true;
        button.innerText = "Stop";
    }
}

function timer(timeStart) {
    for(var i=0;i<timerStarted.length;i++)
        if (timerStarted[i])
            decTime(i+1)
    time += 1000;
    var timeAdjust = Date.now() - timeStart-time;
    setTimeout(function () { timer(timeStart) }, 1000 - timeAdjust);
}

function decTime(tableNum) {
    var tableHeader = document.getElementById("t"+tableNum);
    var str = tableHeader.innerText;
    var minutes = parseInt(str.substr(str.length - 5, 2));
    var seconds = parseInt(str.substr(str.length - 2, 2));
    var minStr="";
    var secStr="";
            
    if (seconds === 0) {
        if (minutes != 0) {
            minutes -= 1;
            seconds = 59;
        }
    } else {
        seconds -= 1;
    }
            
    minStr = minutes+"";
    secStr = seconds+"";
    if (minStr.length === 1)
        minStr = "0" + minStr;
    if (secStr.length === 1)
        secStr = "0" + secStr;

    tableHeader.innerText = "Table " + tableNum + " " + minStr + ":" + secStr;
}

function addPerson() {
    var listItem = document.createElement("li");

    var textArea = document.createElement("input");

    var typeAtt = document.createAttribute("type");
    typeAtt.value = "text";

    var classAtt = document.createAttribute("class");
    classAtt.value = "textarea";

    var maxlengthAtt = document.createAttribute("maxlength");
    maxlengthAtt.value = "15";

    var onclickAtt = document.createAttribute("onclick");
    onclickAtt.value = "this.focus();";

    textArea.setAttributeNode(typeAtt);
    textArea.setAttributeNode(classAtt);
    textArea.setAttributeNode(maxlengthAtt);
    textArea.setAttributeNode(onclickAtt);

    listItem.appendChild(textArea);

    var waitlist = document.getElementById("waitlist");
    waitlist.appendChild(listItem);
}

function addTable() {

    timerStarted.push(false);
    var tableNum = document.getElementsByClassName("header-content").length + 1;

    var container = document.createElement("div");
    var containerClass = document.createAttribute("class");
    containerClass.value = "container";
    container.setAttributeNode(containerClass);

    var containerHeader = document.createElement("div");
    var headerClass = document.createAttribute("class");
    headerClass.value = "container-header";
    containerHeader.setAttributeNode(headerClass);

    var headerContent = document.createElement("div");
    var contentClass = document.createAttribute("class");
    contentClass.value = "header-content";
    var headerId = document.createAttribute("id");
    headerId.value = "t" + tableNum;
    headerContent.setAttributeNode(contentClass);
    headerContent.setAttributeNode(headerId);
    headerContent.innerText = "Table "+tableNum+" "+document.getElementById("defaultTime").value+":00";

    var buttons = document.createElement("div");
    buttonClass = document.createAttribute("class");
    buttonClass.value = "buttons";
    buttons.setAttributeNode(buttonClass);

    var startButton = document.createElement("button");
    sButtonId = document.createAttribute("id");
    sButtonId.value = "s"+tableNum;
    clickAtt = document.createAttribute("onclick");
    clickAtt.value = "toggleTime(" + tableNum + ");";
    startButton.setAttributeNode(clickAtt);
    startButton.setAttributeNode(sButtonId);
    startButton.innerText = "Start";
    buttons.appendChild(startButton);

    var list = document.createElement("ul");

    containerHeader.appendChild(headerContent);
    containerHeader.appendChild(buttons);
    container.appendChild(containerHeader);
    container.appendChild(list);

    var waitlistContainer = document.getElementById("waitlist-container");
    var bodyElement = document.body;
    bodyElement.insertBefore(container, waitlistContainer);

    var removeButton = document.getElementById("remove-button");
    if (removeButton.disabled)
        removeButton.disabled = false;

    $("ul").sortable({
        connectWith: "ul"
    });
}

function removeTable() {
    var containers = document.getElementsByClassName("container");
    var lastTable = containers.item(containers.length - 2);
    document.body.removeChild(lastTable);
    var numTables = document.getElementsByClassName("buttons").length;
    if (numTables === 1) {
        removeButton = document.getElementById("remove-button");
        removeButton.disabled = true;
    }
}

function setTimers() {
    var timerContent = document.getElementsByClassName("header-content");
    for (var i = 0; i < timerContent.length; i++) {
        var s = timerContent.item(i).textContent;
        timerContent.item(i).textContent = s.substring(0, s.lastIndexOf(" ")+1) + document.getElementById("defaultTime").value + ":00";
    }
}
