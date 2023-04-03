// import { Calc } from './Calc';
class Calc {
    // variables which are used for calculations or a refrences
    private publicAPI = {
        PS: document.getElementById("primary") as HTMLInputElement,
        SC: document.getElementById("secoundary") as HTMLInputElement,
        Clear: document.getElementById("Clear") as HTMLElement,
        BracketCounter: document.getElementById("Open-Bracket-Count") as HTMLElement,
        SecoundButtons: document.getElementsByClassName("secoundStream") as HTMLCollectionOf<HTMLElement>,
        FirstButtons: document.getElementsByClassName("firstButtons") as HTMLCollectionOf<HTMLElement>,
        SecoundMarkButton: document.getElementById("second-nd") as HTMLElement,
        MemorySection: document.getElementById("memory-show") as HTMLElement,
        DegBtn: document.getElementById("DegBtn") as HTMLElement,

        // trigno extra buttons
        TrignoNormal: document.getElementsByClassName("normal") as HTMLCollectionOf<HTMLElement>,
        TrignoInverse: document.getElementsByClassName("inverse") as HTMLCollectionOf<HTMLElement>,
        TrignoHyper: document.getElementsByClassName("hyper") as HTMLCollectionOf<HTMLElement>,
    }


    private OPERATOR:string[] = ["+", "-", "*", "/"];
    private secoundActivated : boolean = true;
    private secoundInTrignoActivated:boolean = false;
    private hyperInTrignoActivated:boolean = false;
    private isDegree:boolean = true;
    private Memory:any[]= [];

    // getter and setter method for primary screen
    GetPrimaryScreenValue() : string {
        return this.publicAPI.PS.value;
    }
    
    SetPrimaryScreenValue(x : string) : void {
        this.publicAPI.PS.value = x.toString();
    }
    
    GetSecoundaryScreenValue() : string{
        return this.publicAPI.SC.value;
    }
    
    SetSecoundaryScreenValue(x : string) : void {
        this.publicAPI.SC.value = x;
    }

    // functions for various buttons.
    AddNumber(number : string) {
        if (this.publicAPI.PS?.value == "0") {
            this.SetPrimaryScreenValue(number);
        } else {
            this.SetPrimaryScreenValue(this.GetPrimaryScreenValue() + number);
        }
        this.ChangeTextOfClearButton(true);
    }

    //backspacing in primary screen!
    RemoveFromBack() {
        if (this.GetPrimaryScreenValue() != "0" && this.GetPrimaryScreenValue().length >= 2) {
            this.SetPrimaryScreenValue(this.GetPrimaryScreenValue().substring(0, this.GetPrimaryScreenValue().length - 1));
        } else {
            this.SetPrimaryScreenValue("0");
        }
    }

    // Baisc calulation like multiplication or divison
    BasicFunctions(symbol : string) {
        if (this.GetSecoundaryScreenValue() == "") {
            this.SetSecoundaryScreenValue(this.GetPrimaryScreenValue() + symbol);
    
        } else {
            const x:string = this.GetSecoundaryScreenValue();
            if (x[x.length - 1] == "=") {
                this.SetSecoundaryScreenValue(this.publicAPI.PS.value + symbol)
            } else {
                this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + this.publicAPI.PS.value + symbol);
            }
        }
        this.SetPrimaryScreenValue("0");
    }
    
    // Equal operation
    EqualOperator() {
        let x:string = this.GetSecoundaryScreenValue();
        if (x != "") {
            if (x[x.length - 1] == ")") {
                this.EvailFunction(x);
            } else if (x[x.length - 1] == "=") {
                // if multiple equal clicked do nothig  
            } else {
                x += this.GetPrimaryScreenValue();
                this.EvailFunction(x);
            }
        } else {
            if (this.publicAPI.PS.value != "0") {
                this.publicAPI.SC.value = this.publicAPI.PS.value + "=";
            }
        }
        this.ClearBracketCounter();
    }

    EvailFunction(str : string) {
        try {
            const result = eval(str);
            this.SetSecoundaryScreenValue(str + "=");
            this.SetPrimaryScreenValue(result);
        }
        catch (err) {
            this.SetPrimaryScreenValue("Invalid Expression!");
        }
    }

    // Clear button 
    ClearScreen() {
        if (this.GetPrimaryScreenValue() != "0") {
            this.SetPrimaryScreenValue("0");
        } else if (this.GetSecoundaryScreenValue() != "") {
            this.SetSecoundaryScreenValue("");
        }
        if (this.GetPrimaryScreenValue() == "0" && this.GetSecoundaryScreenValue() == "") {
            this.ChangeTextOfClearButton(false);
            this.ClearBracketCounter();
        }
    }

    // changing text of clear button!
    ChangeTextOfClearButton(bool : boolean) : void{
        if (bool) {
            this.publicAPI.Clear.innerHTML = "CE";
        } else {
            this.publicAPI.Clear.innerHTML = "C";
        }
    }

    // Bracket functions 
    OpenBracketFunction() {
        const x:string = this.GetSecoundaryScreenValue();
        if (x == "" && x[x.length - 1] == "=") {
            this.SetSecoundaryScreenValue("(");
        } else {
            this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + "(");
        }
        this.IncrementBracketCounter();
    }

    CloseBracketFunction() {
        if (this.GetBracketCount() > 0) {
            this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + this.GetPrimaryScreenValue() + ")");
            this.DecrementBracketCounter();
        }
    }
    
    //Bracket counter function
    IncrementBracketCounter() {

        if (this.publicAPI.BracketCounter.textContent == "") {
            this.publicAPI.BracketCounter.innerHTML = "1";
        } else {
            this.publicAPI.BracketCounter.innerHTML = (parseInt(this.publicAPI.BracketCounter.textContent as string) + 1).toString();
        }
    }
    
    DecrementBracketCounter() {
        if (this.publicAPI.BracketCounter.toString() == "1") {
            this.publicAPI.BracketCounter.innerHTML = "";
        } else {
            this.publicAPI.BracketCounter.innerHTML = (parseInt(this.publicAPI.BracketCounter.textContent as string) - 1).toString();
        }
    }
    
    GetBracketCount() {
        if (this.publicAPI.BracketCounter.textContent == "") {
            return 0;
        } else {
            return Number(this.publicAPI.BracketCounter.textContent);
        }
    }
    
    ClearBracketCounter() {
        if (this.publicAPI.BracketCounter.textContent != "") {
            this.publicAPI.BracketCounter.innerHTML = "";
        }
    }

    // Factorial function
    DoFactorial() {
        const num: number = Number(this.GetPrimaryScreenValue());
        if (num > 100) {
            this.SetPrimaryScreenValue("Infinity");
        } else {
            let ans = 1;
            if (num != 0) {
                for (let i = 1; i <= num; i++) {
                    ans *= i;
                }
            }
            this.SetPrimaryScreenValue(ans.toString());
        }
    }

    //log Function
    DoLog(str : string) {
        if (str == "Natural") {
            this.SetPrimaryScreenValue((Math.log(Number(this.GetPrimaryScreenValue()))).toString());
        } else if (str == "Base10") {
            this.SetPrimaryScreenValue((Math.log10(Number(this.GetPrimaryScreenValue()))).toString())
        }
    }

    // any ** x function
    ResToX(num : number) {
        this.SetPrimaryScreenValue((num ** Number(this.GetPrimaryScreenValue())).toString());
    }
    
    //Pow of x 
    PowOfX(num : number) {
        this.SetPrimaryScreenValue((Number(this.GetPrimaryScreenValue()) ** (num)).toString());
    }
    
    // 1/x function
    OneUponX() {
        this.SetPrimaryScreenValue((1 / Number(this.GetPrimaryScreenValue())).toString());
    }
    
    // Mod function
    DoMod() {
        let x:string = this.GetPrimaryScreenValue();
        if (x[0] == "(") {
            x = x.substring(1, x.length - 1);
        }
        this.SetPrimaryScreenValue((Math.abs(Number(x))).toString());
    }

    //E value
    WriteEValue() {
        this.SetPrimaryScreenValue((Math.E).toString());
    }

    // PI value
    WritePIValue() {
        this.SetPrimaryScreenValue((Math.PI).toString());
    }

    //Putting point 
    PutPoint() {
        let pointFound:boolean = false;
        const x:string = this.GetPrimaryScreenValue();
        for (let i = 0; i < x.length; i++) {
            if (x[i] == ".") {
                pointFound = true;
            }
        }
        if (!pointFound) {
            this.SetPrimaryScreenValue(this.GetPrimaryScreenValue() + ".");
        }
    }
    
    //Negate Function
    NegateFunction() {
        const x:string = this.GetPrimaryScreenValue();
        if (x[0] == "(") {
            if (x[1] == "-") {
                const y = "(+" + x.substring(2);
                this.SetPrimaryScreenValue(y);
            } else {
                const y:string = "(-" + x.substring(2);
                this.SetPrimaryScreenValue(y);
            }
        } else {
            if (x[0] == "+") {
                const y:string = "(-" + x.substring(1);
                this.SetPrimaryScreenValue(y + ")");
            } else if (x[0] == "-") {
                const y:string = "(+" + x.substring(1);
                this.SetPrimaryScreenValue(y + ")");
            } else {
                this.SetPrimaryScreenValue("(-" + x + ")");
            }
        }
    }

    //2nd button function for showing extra button
    SecoundaryButoonFunction() {
        if (this.secoundActivated) {
            for (let i = 0, len = this.publicAPI.SecoundButtons.length; i < len; i++) {
                this.publicAPI.SecoundButtons[i].style.display = "none";
                this.publicAPI.FirstButtons[i].style.display = "inline";
            }
            this.secoundActivated = false;
            this.publicAPI.SecoundMarkButton.classList.remove("equal");
        } else {
            for (let i = 0, len = this.publicAPI.SecoundButtons.length; i < len; i++) {
                this.publicAPI.SecoundButtons[i].style.display = "inline";
                this.publicAPI.FirstButtons[i].style.display = "none";
            }
            this.publicAPI.SecoundMarkButton.classList.add("equal");
            this.secoundActivated = true;
        }
    }
    
    // function for trigno and hyper button
    Trigno2nd() {
        if (this.secoundInTrignoActivated) {
            this.HideNormal();
            this.ShowInverse();
            this.HideHyper();
            this.secoundInTrignoActivated = false;
        } else {
            this.ShowNormal();
            this.HideHyper();
            this.HideInverse();
            this.secoundInTrignoActivated = true;
        }
    }
    
    TrignoHyper() {
        if (this.hyperInTrignoActivated) {
            this.HideHyper();
            this.ShowNormal();
            this.HideInverse();
            this.hyperInTrignoActivated = false;
        } else {
            this.ShowHyper();
            this.HideNormal();
            this.HideInverse();
            this.hyperInTrignoActivated = true;
        }
    }

    // show and hide buttons in html and trigno
    ShowNormal() {
        for (let i = 0, len = this.publicAPI.TrignoNormal.length; i < len; i++) {
            this.publicAPI.TrignoNormal[i].style.display = "block";
        }
    }
    
    HideNormal() {
        for (let i = 0, len = this.publicAPI.TrignoNormal.length; i < len; i++) {
            this.publicAPI.TrignoNormal[i].style.display = "none";
        }
    }
    
    ShowInverse() {
        for (let i = 0, len = this.publicAPI.TrignoInverse.length; i < len; i++) {
            this.publicAPI.TrignoInverse[i].style.display = "block";
        }
    }
    
    HideInverse() {
        for (let i = 0, len = this.publicAPI.TrignoInverse.length; i < len; i++) {
            this.publicAPI.TrignoInverse[i].style.display = "none";
        }
    }
    
    ShowHyper() {
        for (let i = 0, len = this.publicAPI.TrignoHyper.length; i < len; i++) {
            this.publicAPI.TrignoHyper[i].style.display = "block";
        }
    }
    
    HideHyper() {
        for (let i = 0, len = this.publicAPI.TrignoHyper.length; i < len; i++) {
            this.publicAPI.TrignoHyper[i].style.display = "none";
        }
    }

    // Trigno computation
    DoTrignoCalculation(str : string) {
        let x:number = Number(this.GetPrimaryScreenValue());
        let y:number = 0;
        if (this.isDegree) {
            y = this.toRadians(x);
        }
        switch (str) {
            //normal
            case "sin":
                this.SetPrimaryScreenValue((Math.sin(y)).toString());
                break;
            case "cos":
                this.SetPrimaryScreenValue((Math.cos(y)).toString());
                break;
            case "tan":
                this.SetPrimaryScreenValue((Math.tan(y)).toString());
                break;
            case "cot":
                this.SetPrimaryScreenValue((1 / Math.tan(y)).toString());
                break;
            case "cosec":
                this.SetPrimaryScreenValue((1 / Math.sin(y)).toString());
                break;
            case "sec":
                this.SetPrimaryScreenValue((1 / Math.cos(y)).toString());
                break;
    
            //inverse
            case "sin-1":
                if (x > 1 && x < -1) {
                    this.SetPrimaryScreenValue("Invalid Value!");
                } else {
                    if (this.isDegree) {
                        this.SetPrimaryScreenValue((this.toDegrees(Math.asin(x))).toString());
                    } else {
                        this.SetPrimaryScreenValue((Math.asin(x)).toString());
                    }
                }
                break;
            case "cos-1":
                if (x > 1 && x < -1)
                    this.SetPrimaryScreenValue("Invalid Value!");
                else
                    if (this.isDegree) {
                        this.SetPrimaryScreenValue((this.toDegrees(Math.acos(x))).toString());
                    } else {
                        this.SetPrimaryScreenValue((Math.acos(x)).toString());
                    }
                break;
            case "tan-1":
                if (x > 1 && x < -1)
                    this.SetPrimaryScreenValue("Invalid Value!");
                else
                    if (this.isDegree) {
                        this.SetPrimaryScreenValue((this.toDegrees(Math.atan(x))).toString());
                    } else {
                        this.SetPrimaryScreenValue((Math.atan(x)).toString());
                    }
                break;
            case "cot-1":
                if (this.isDegree) {
                    this.SetPrimaryScreenValue((this.toDegrees(1 / Math.atan(x))).toString());
                } else {
                    this.SetPrimaryScreenValue((1 / Math.atan(x)).toString());
                }
                break;
            case "cosec-1":
                if (this.isDegree) {
                    this.SetPrimaryScreenValue((this.toDegrees(1 / Math.asin(x))).toString());
                } else {
                    this.SetPrimaryScreenValue((1 / Math.asin(x)).toString());
                }
                break;
            case "sec-1":
                if (this.isDegree) {
                    this.SetPrimaryScreenValue((this.toDegrees(1 / Math.acos(x))).toString());
                } else {
                    this.SetPrimaryScreenValue((1 / Math.acos(x)).toString());
                }
                break;
    
            // hyp functions
            case "sinh":
                this.SetPrimaryScreenValue((Math.sinh(x)).toString());
                break;
            case "cosh":
                this.SetPrimaryScreenValue((Math.cosh(x)).toString());
                break;
            case "tanh":
                this.SetPrimaryScreenValue((Math.tanh(x)).toString());
                break;
            case "coth":
                this.SetPrimaryScreenValue((1 / Math.tanh(x)).toString());
                break;
            case "cosech":
                this.SetPrimaryScreenValue((1 / Math.sinh(x)).toString());
                break;
            case "sech":
                this.SetPrimaryScreenValue((1 / Math.cosh(x)).toString());
                break;
    
            // default do nothing
            default:
                break;
        }
    }

    // changing in angles
    toRadians(angle:number):number {
        return angle * (Math.PI / 180);
    }

    toDegrees(angle:number):number {
        return angle * (180 / Math.PI);
    }
    
    //floor and ceil values
    FloorAndCeilVal(x:boolean) {
        if (x) {
            this.SetPrimaryScreenValue((Math.floor(Number(this.GetPrimaryScreenValue()))).toString());
        } else {
            this.SetPrimaryScreenValue((Math.ceil(Number(this.GetPrimaryScreenValue()))).toString());
        }
    }

    // Memory functions
    MemoryClear() {
        if (this.Memory.length != 0) {
            this.Memory.length = 0;
            this.publicAPI.MemorySection.innerHTML = "Nothing to Show.";
        }
        this.DisbleButton();
    }
    
    MemoryStore() {
        if (this.Memory[this.Memory.length - 1] != Number(this.GetPrimaryScreenValue())) {
            this.Memory.push(Number(this.GetPrimaryScreenValue()));
        }
        this.EnableButton();
    }
    
    MemoryRead() {
        if (this.Memory.length != 0) {
            this.SetPrimaryScreenValue((this.Memory[this.Memory.length - 1]).toString());
        }
    }
    
    MemoryAdd() {
        if (this.Memory.length != 0) {
            this.Memory[this.Memory.length - 1] += Number(this.GetPrimaryScreenValue());
        } else {
            this.Memory[0] = Number(this.GetPrimaryScreenValue());
        }
        this.EnableButton();
    }
    
    MemorySub() {
        if (this.Memory.length != 0) {
            this.Memory[this.Memory.length - 1] -= Number(this.GetPrimaryScreenValue());
        }
        else {
            this.Memory[0] = Number(this.GetPrimaryScreenValue());
        }
        this.EnableButton()
    }
    
    ShowMemory() {
        if (this.Memory.length != 0) {
            let html = "";
            for (let i = this.Memory.length - 1, len = 0; i >= len; i--) {
                html += `<div>${this.Memory[i]}</div>`
            }
            this.publicAPI.MemorySection.innerHTML = html;
        } else {
            this.publicAPI.MemorySection.innerHTML = "Nothing to Show.";
        }
    }

    // memory buttons enable and disable
    EnableButton() {
        let x =  document.getElementById("memoryClear") as HTMLButtonElement
        x.removeAttribute("disabled");
        let y = document.getElementById("memoryRecall") as HTMLButtonElement
        y.removeAttribute("disabled");
    }
    
    DisbleButton() {
        let x = document.getElementById("memoryClear") as HTMLButtonElement
        x.disabled = true;
        let y = document.getElementById("memoryRecall")as HTMLButtonElement
        y.disabled = true;
    }

    // Exp function
    Exponational() {
        const x:string = this.GetPrimaryScreenValue();
        let isFound:boolean = false;
        for (let i = 0, len = x.length; i < len; i++) {
            if (x[i] == "e") {
                isFound = true;
                break;
            }
        }
        if (!isFound) {
            this.SetPrimaryScreenValue((Number(this.GetPrimaryScreenValue()).toExponential()).toString());
        }
    }

    // DEG to RAD function
    DegToRad() {
        if (this.isDegree) {
            this.isDegree = false;
            this.publicAPI.DegBtn.innerHTML = "RAD";
        } else {
            this.isDegree = true;
            this.publicAPI.DegBtn.innerHTML = "DEG";
        }
    }

    // Rand Function
    PutRandom() {
        this.SetPrimaryScreenValue((Math.random()).toString());
    }

    // DMS function
    DMS() {
        const x:number = Number(this.GetPrimaryScreenValue());
        let degree = Math.floor(x);
        let minutes = ((x - Math.floor(x)) * 60.0);
        let seconds = (minutes - Math.floor(minutes)) * 60.0;
        this.SetPrimaryScreenValue((degree + "." + Math.floor(minutes) + seconds.toFixed(0)).toString());
    }
}   




const calculator = new Calc();

calculator.SecoundaryButoonFunction();
calculator.Trigno2nd();


//first row event listner
document.getElementById("DegBtn")?.addEventListener("click",calculator.DegToRad);
document.getElementById("exp-extra")?.addEventListener("click",calculator.Exponational);

//memory function
document.getElementById("memoryClear")?.addEventListener("click",calculator.MemoryClear);
document.getElementById("memoryRecall")?.addEventListener("click",calculator.MemoryRead);
document.getElementById("memoryPlus")?.addEventListener("click",calculator.MemoryAdd);
document.getElementById("memoryMinus")?.addEventListener("click",calculator.MemorySub);
document.getElementById("memoryStore")?.addEventListener("click",calculator.MemoryStore);
document.getElementById("memoryShow")?.addEventListener("click",calculator.ShowMemory);

// extra tigno and function button in trigno

document.getElementById("trignoSecound")?.addEventListener("click",calculator.Trigno2nd);
document.getElementById("trignohyperextra")?.addEventListener("click",calculator.TrignoHyper);

document.getElementById("sin")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("sin");});
document.getElementById("cos")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("cos");})
document.getElementById("tan")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("tan");})
document.getElementById("cot")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("cot");})
document.getElementById("sec")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("sec");})
document.getElementById("csc")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("cosec");})
document.getElementById("sin-1")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("sin-1");})
document.getElementById("cos-1")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("cos-1");})
document.getElementById("tan-1")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("tan-1");})
document.getElementById("cot-1")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("cot-1");})
document.getElementById("sec-1")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("sec-1");})
document.getElementById("csc-1")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("cosec-1");})
document.getElementById("sinh")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("sinh");})
document.getElementById("cosh")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("cosh");})
document.getElementById("tanh")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("tanh");})
document.getElementById("coth")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("coth");})
document.getElementById("sech")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("sech");})
document.getElementById("csch")?.addEventListener("click",()=>{calculator.DoTrignoCalculation("cosech");})

document.getElementById("mod")?.addEventListener("click",()=>{calculator.DoMod()});
document.getElementById("floor")?.addEventListener("click",()=>{calculator.FloorAndCeilVal(true)});
document.getElementById("ceil")?.addEventListener("click",()=>{calculator.FloorAndCeilVal(false)});
document.getElementById("random")?.addEventListener("click",()=>{calculator.PutRandom()});
document.getElementById("dms")?.addEventListener("click",()=>{calculator.DMS()});


// first line
document.getElementById("second-nd")?.addEventListener("click",calculator.SecoundaryButoonFunction);
document.getElementById("PIValue")?.addEventListener("click",calculator.WritePIValue);
document.getElementById("EValue")?.addEventListener("click",calculator.WriteEValue);
document.getElementById("Clear")?.addEventListener("click",calculator.ClearScreen);
document.getElementById("removeBack")?.addEventListener("click",calculator.RemoveFromBack);

// secound line
document.getElementById("powOf2")?.addEventListener("click",()=>calculator.PowOfX(2));
document.getElementById("powOf3")?.addEventListener("click",()=>calculator.PowOfX(3));
document.getElementById("OneUponX")?.addEventListener("click",calculator.OneUponX);
document.getElementById("Mods")?.addEventListener("click",calculator.DoMod);
document.getElementById("Exponential")?.addEventListener("click",calculator.Exponational);
document.getElementById("modular")?.addEventListener("click",()=>calculator.BasicFunctions("%"));

//third line
document.getElementById("powOfOneBy2")?.addEventListener("click",()=>calculator.PowOfX(1/2));
document.getElementById("powOfOneBy3")?.addEventListener("click",()=>calculator.PowOfX(1/3));
document.getElementById("Open-Bracket")?.addEventListener("click",calculator.OpenBracketFunction);
document.getElementById("Close-Bracket")?.addEventListener("click",calculator.CloseBracketFunction);
document.getElementById("Factorial")?.addEventListener("click",calculator.DoFactorial);
document.getElementById("Devide")?.addEventListener("click",()=>calculator.BasicFunctions("/"));

// forth line
document.getElementById("SqureOfy")?.addEventListener("click",()=>calculator.BasicFunctions("**"));
document.getElementById("seven")?.addEventListener("click",()=>calculator.AddNumber("7"));
document.getElementById("eight")?.addEventListener("click",()=>calculator.AddNumber("8"));
document.getElementById("nine")?.addEventListener("click",()=>calculator.AddNumber("9"));
document.getElementById("Multiplication")?.addEventListener("click",()=>calculator.BasicFunctions("*"));

// fifth line
document.getElementById("resToTen")?.addEventListener("click",()=>calculator.ResToX(10));
document.getElementById("resToTwo")?.addEventListener("click",()=>calculator.ResToX(2));
document.getElementById("four")?.addEventListener("click",()=>calculator.AddNumber("4"));
document.getElementById("five")?.addEventListener("click",()=>calculator.AddNumber("5"));
document.getElementById("six")?.addEventListener("click",()=>calculator.AddNumber("6"));
document.getElementById("substraction")?.addEventListener("click",()=>calculator.BasicFunctions("-"));

// six line
document.getElementById("logBaseTen")?.addEventListener("click",()=>calculator.DoLog("Base10"));
document.getElementById("one")?.addEventListener("click",()=>calculator.AddNumber("1"));
document.getElementById("two")?.addEventListener("click",()=>calculator.AddNumber("2"));
document.getElementById("three")?.addEventListener("click",()=>calculator.AddNumber("3"));
document.getElementById("addition")?.addEventListener("click",()=>calculator.BasicFunctions("+"));

// seven line
document.getElementById("logNatural")?.addEventListener("click",()=>calculator.DoLog('Natural'));
document.getElementById("resToE")?.addEventListener("click",()=>calculator.ResToX(Math.E));
document.getElementById("negate")?.addEventListener("click",calculator.NegateFunction);
document.getElementById("zero")?.addEventListener("click",()=>calculator.AddNumber('0'));
document.getElementById("putPoint")?.addEventListener("click",calculator.PutPoint);
document.getElementById("Equal")?.addEventListener("click",calculator.EqualOperator);