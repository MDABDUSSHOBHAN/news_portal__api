

var sum = function(){
    var num1= 2;
    var num2= 3;
  return function(){

    return num1+ num2;
  }  
  
}
const value= sum();
console.log(value());


// ex:-2

function bankAccount(initialBalance){

    var balance= initialBalance;
    return function(){

        return balance;
    }
}
var result= bankAccount(32);

console.log(result());
