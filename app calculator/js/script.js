const keys = document.querySelectorAll('.key');
const displayInput = document.querySelectorAll('.display .input');
const displayOutput = document.querySelectorAll('.display .output');

let input = "";

for (let key of keys) {
     const value = key.dataset.key;

     key.addEventListener('click', () => {
          if (value == "clear") {
               input = "";
               displayInput.forEach(element => element.innerHTML = "");
               displayOutput.forEach(element => element.innerHTML = "");
     } else if (value == "backspace") {
               input = input.slice(0, -1);
               displayInput.forEach(element => element.innerHTML = CleanInput(input));
     } else if (value == "=") {
          try {
               let result = eval(input);
               displayOutput.forEach(element => element.innerHTML = CleanOutput(result));
          } catch (e) {
               displayOutput.forEach(element => element.innerHTML = "Error");
          }
          } else if (value == "brackets") {
               if (input.indexOf("(") == -1) {
                   input += "(";
               } else if (input.indexOf("(") != -1 && input.indexOf(")") == -1) {
                   input += ")";
               } else if (input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")")) {
                   input += "(";
               } else if (input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") > input.lastIndexOf(")")) {
                   input += ")";
               }
               displayInput.forEach(element => element.innerHTML = CleanInput(input));
     }
     else{
          if(ValidateInput(value)){
               input += value;
               displayInput.forEach(element => element.innerHTML = CleanInput(input));
          }
          
     }
               
})
}

function CleanInput(input) {
     let inputArray = input.split("");
     let inputArrayLength = inputArray.length;
     
     for(let i = 0; i < inputArrayLength; i++)
     {
          if(inputArray[i] == "*"){
               inputArray[i] = `<span class= "operator">x</span>` ;
          }
          else if(inputArray[i] == "/"){
               inputArray[i] = `<span class= "operator">÷</span>` ;
          }
          else if(inputArray[i] == "+"){
               inputArray[i] = `<span class= "operator">+</span>` ;
          }
          else if(inputArray[i] == "-"){
               inputArray[i] = `<span class= "operator">-</span>` ;
          }
          else if(inputArray[i] == "("){
               inputArray[i] = `<span class= "operator">(</span>` ;
          }
          else if(inputArray[i] == ")"){
               inputArray[i] = `<span class= "operator">)</span>` ;
          }
          else if(inputArray[i] == "%"){
               inputArray[i] = `<span class= "operator">%</span>` ;
          }
     }
     return inputArray.join("");
}

function CleanOutput(output){
     let outputString = output.toString();
     if (outputString.length > 15) {
          outputString = outputString.toExponential(10);
     } else {
          let decimal = outputString.split(".")[1];
          outputString = outputString.split(".")[0];

          let outputArray = outputString.split(".");

          if(outputArray.length > 3) {
               for(let i = outputArray.length - 3; i > 0; i -= 3){
                    outputArray.splice(i, 0, ",");
               }
          }
          if(decimal){
               outputArray.push(".");
               outputArray.push(decimal); 
          }
          outputString = outputArray.join("");
     }
     return outputString;
}
 
function ValidateInput (value){
     let lastInput = input.slice(-1);
     let operators = ["+", "-", "*","/"];

     if(value == "." && lastInput == "."){
          return false;
     }
     if(operators.includes(value)) {
          if(operators.includes(lastInput)){
               return false;
          }
          else{
               return true;
          }
     }
     return true;
}