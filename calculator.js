let buffer='0';
let runningTotal=0;
let previousOperator;

const screen=document.querySelector(".screen")

function buttonClick(value) {
  
    
    if (isNaN(parseInt(value))){
        handleSymbol(value);

    }else {
        handleNumber(value);
    }
    updateDisplay();
   
}


function handleNumber(number){
    if (buffer == '0')
    {
        buffer=number;
    }
    else {
        buffer=buffer+number;
    }
}


function handleMath(value)
{  
    if(buffer =='0')
        return;

    const intBuffer = parseInt(buffer);
    if(runningTotal==0)
    {
       runningTotal=intBuffer;
    }
    else
    {
        flushOperation(intBuffer);
    }
  previousOperator=value;
  buffer='0';


}

function flushOperation(intBuffer){
    if(previousOperator == '-')
    {
        runningTotal -= intBuffer;
    }
    if(previousOperator == '+')
        {
            runningTotal += intBuffer;
        }
        if(previousOperator == 'x')
            {
                runningTotal =runningTotal * intBuffer;
                console.log(runningTotal);
            }
            if(previousOperator == '÷')
                {
                    runningTotal /= intBuffer;
                }
}


function updateDisplay()
{
    screen.innerText=buffer;
}








function handleSymbol(symbol){

    switch(symbol)
    {
        case 'C': buffer='0'; 
        break;
        case '=': if(previousOperator==null){
            return;
        } 
            flushOperation(parseInt(buffer));
            console.log(runningTotal);
            buffer= +runningTotal;
            runningTotal=0;
            previousOperator=null;
        break;
        case '←':
            if(buffer.length==1){
                buffer='0';
            }
            else{
              buffer=buffer.substring(0,buffer.length-1); 
            } break;
        case '÷': 
        case '-':
        case 'x':  
        case '+':  
        handleMath(symbol);
        break;
    }
    }


function init()
{
    document.querySelector(".calc-buttons").addEventListener("click",function(event){
        buttonClick(event.target.innerText);
    })
}


init()