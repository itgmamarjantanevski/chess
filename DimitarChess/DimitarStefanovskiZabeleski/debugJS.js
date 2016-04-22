/*
    Example 1
*/

var add = (function () {
    var counter = 0;
    return function () {
        return counter += 1;
    }
})();

function myFunction(){
    document.getElementById("demo").innerHTML = add();
    document.getElementById("demo1").innerHTML = foo();
    document.getElementById("demo2").innerHTML = foo1();

}
/*
    Example 2
*/
function foo(){
    //define bar once
    function bar() {
        return 3;
    }
    //redefine it
    function bar() {
        return 8;
    }
    //return its invocation
    return bar(); //8
}
/*
    Example 3
*/
function foo1(){
    //a declaration for each function expression
    var bar = undefined;
    var bar = undefined;
    //first Function Expression is executed
    bar = function() {
        return 3;
    };
    // Function created by first Function Expression is invoked
    return bar();
    // second Function Expression unreachable
}

//So znaci ova Object.prototype???
Object.prototype.x = 10;
 
var w = 20;
var y = 30;
 

 
//console.log(x); // 10
 
(function foo() {
 
  var w = 40;
  var x = 100;

 
  with ({z: 50}) {
    //console.log(w, x, y , z); // 40, 10, 30, 50
  }

  //console.log(x, w); // 100, 40

  //console.log(window.w); // 20
 
})();


var data = [];
 
for (var k = 0; k < 3; k++) {
  data[k] = (function (x) {
    return function () {
      console.log(x);
    };
  })(k); // pass "k" value
}
 
// now it is correct
data[0](); // 0
data[1](); // 1
data[2](); // 2