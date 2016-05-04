var obj = {
    val: "Od objektot",
    fcn: function testFn() {
        console.log( this.val );
    }
};

var val = "Od global";

obj.fcn();

test(obj.fcn);

test2();

function test(a){
	a();
	obj.fcn();
}

function test2(){
	var val = "Od test2";
	
	var obj = {
    val: "Od objektot2",
    fcn: function testFn() {
			console.log( this.val );
		}
	};
	obj.fcn();
	
	test3(obj.fcn);
	
	function test3(a){
		a();
	}
	
}

test4(obj);

function test4(a){
	a.fcn();
}
