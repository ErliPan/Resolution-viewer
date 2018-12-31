var objectCount = 0;

function controlInput() {

  var width  = document.getElementById("width").value;
  var height = document.getElementById("height").value;
  var scale = document.getElementById("scale").value;

  if (width == 0 || height == 0 || scale == 0) {
    document.getElementById("buttonCreate").disabled = true;
  }
  else {
    document.getElementById("buttonCreate").disabled = false;
  }
}

function create() {

  objectCount++;

  var width  = document.getElementById("width").value;
  var height = document.getElementById("height").value;
  var scale = document.getElementById("scale").value;

  var object = document.createElement("div");

  if (width == 0 || height == 0 || scale == 0) {
    return;
  }

  object.className = "display";
  object.id = objectCount;
  document.body.appendChild(object);

  var tmp = document.getElementById(objectCount);
  tmp.style.width = width / scale + "px";
  tmp.style.height = height / scale + "px";
  tmp.style.backgroundColor = getRandomColor();
  tmp.innerHTML = width + " X " + height + "<br /> (" +
    width/mcm(width, height) + ":" + height/mcm(width, height) + ")";

  dragObject(document.getElementById(objectCount));
}

function dragObject(ob) {
  var p1 = p2 = p3 = p4 = 0;
  if (document.getElementById(ob.id))
    document.getElementById(ob.id).onmousedown = mouseDown;
  else
    ob.onmousedown = mouseDown;

  function mouseDown(e) {
    e = (e || window.event);
    e.preventDefault();
    p3 = e.clientX;
    p4 = e.clientY;
    document.onmouseup = closeDrag;
    document.onmousemove = drag;
  }

  function closeDrag() {
    document.onmouseup = document.onmousemove = null;
  }

  function drag(e) {
    e = (e || window.event);
    e.preventDefault();
    p1 = p3 - e.clientX;
    p2 = p4 - e.clientY;
    p3 = e.clientX;
    p4 = e.clientY;
    ob.style.top = ob.offsetTop - p2 + "px";
    ob.style.left = ob.offsetLeft - p1 + "px";
  }

}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10 + 6)];
  }
  return color;
}

function clean() {
  objectCount = 0;
  var elements = document.getElementsByClassName("display");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function mcm(a, b) {
  var max;
  if (a > b) max = a;
  else max = b;

  for (i = max/2;i >= 2; i--)
    if ((a % i == 0) && (b % i == 0))
      return i;
}

window.setInterval(function(){
  controlInput();
}, 500);
