"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47;
// import { Calc } from './Calc';
class Calc {
    constructor() {
        // variables which are used for calculations or a refrences
        this.publicAPI = {
            PS: document.getElementById("primary"),
            SC: document.getElementById("secoundary"),
            Clear: document.getElementById("Clear"),
            BracketCounter: document.getElementById("Open-Bracket-Count"),
            SecoundButtons: document.getElementsByClassName("secoundStream"),
            FirstButtons: document.getElementsByClassName("firstButtons"),
            SecoundMarkButton: document.getElementById("second-nd"),
            MemorySection: document.getElementById("memory-show"),
            DegBtn: document.getElementById("DegBtn"),
            // trigno extra buttons
            TrignoNormal: document.getElementsByClassName("normal"),
            TrignoInverse: document.getElementsByClassName("inverse"),
            TrignoHyper: document.getElementsByClassName("hyper"),
        };
        this.OPERATOR = ["+", "-", "*", "/", "%"];
        this.secoundActivated = true;
        this.secoundInTrignoActivated = false;
        this.hyperInTrignoActivated = false;
        this.isDegree = true;
        this.Memory = [];
    }
    // getter and setter method for primary screen
    GetPrimaryScreenValue() {
        return this.publicAPI.PS.value;
    }
    SetPrimaryScreenValue(x) {
        this.publicAPI.PS.value = x;
    }
    GetSecoundaryScreenValue() {
        return this.publicAPI.SC.value;
    }
    SetSecoundaryScreenValue(x) {
        this.publicAPI.SC.value = x;
    }
    // functions for various buttons.
    AddNumber(number) {
        if (this.GetPrimaryScreenValue() == "0" || (/^([^0-9]*)$/).test(this.GetPrimaryScreenValue())) {
            this.SetPrimaryScreenValue(number);
        }
        else {
            this.SetPrimaryScreenValue(this.GetPrimaryScreenValue() + number);
        }
        this.ChangeTextOfClearButton(true);
    }
    //backspacing in primary screen!
    RemoveFromBack() {
        if (this.GetPrimaryScreenValue() != "0" && this.GetPrimaryScreenValue().length >= 2) {
            this.SetPrimaryScreenValue(this.GetPrimaryScreenValue().substring(0, this.GetPrimaryScreenValue().length - 1));
        }
        else {
            this.SetPrimaryScreenValue("0");
        }
    }
    // Baisc calulation like multiplication or divison
    BasicFunctions(symbol) {
        if (this.GetSecoundaryScreenValue() == "") {
            this.SetSecoundaryScreenValue(this.GetPrimaryScreenValue() + symbol);
        }
        else {
            const x = this.GetSecoundaryScreenValue();
            if (x[x.length - 1] == "=") {
                this.SetSecoundaryScreenValue(this.publicAPI.PS.value + symbol);
            }
            else if (x[x.length - 1] == ")") {
                this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + "*" + this.GetPrimaryScreenValue() + symbol);
            }
            else if (this.GetPrimaryScreenValue() == "0") {
                this.SetSecoundaryScreenValue(x.substring(0, x.length - 1) + symbol);
            }
            else {
                this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + this.publicAPI.PS.value + symbol);
            }
        }
        this.SetPrimaryScreenValue("0");
    }
    // Equal operation
    EqualOperator() {
        let x = this.GetSecoundaryScreenValue();
        if (x != "") {
            const index = x.indexOf("=");
            if (x[x.length - 1] == ")" && index == -1) {
                this.EvailFunction(x);
            }
            else if (x[x.length - 1] == "=") {
                this.SetSecoundaryScreenValue(this.GetPrimaryScreenValue() + "=");
            }
            else if (index != -1) {
                x = x.slice(index + 1, x.length);
                console.log("inside");
                this.EvailFunction(x);
            }
            else {
                x += this.GetPrimaryScreenValue();
                this.EvailFunction(x);
            }
        }
        else {
            if (this.publicAPI.PS.value != "0") {
                this.publicAPI.SC.value = this.publicAPI.PS.value + "=";
            }
        }
        this.ClearBracketCounter();
    }
    EvailFunction(str) {
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
        }
        else if (this.GetSecoundaryScreenValue() != "") {
            this.SetSecoundaryScreenValue("");
        }
        if (this.GetPrimaryScreenValue() == "0" && this.GetSecoundaryScreenValue() == "") {
            this.ChangeTextOfClearButton(false);
            this.ClearBracketCounter();
        }
    }
    // changing text of clear button!
    ChangeTextOfClearButton(bool) {
        if (bool) {
            this.publicAPI.Clear.innerHTML = "CE";
        }
        else {
            this.publicAPI.Clear.innerHTML = "C";
        }
    }
    // Bracket functions 
    OpenBracketFunction() {
        const x = this.GetSecoundaryScreenValue(), y = this.GetPrimaryScreenValue();
        if (x != "" && y != "0" && x[x.length - 1] != "=") {
            this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + this.GetPrimaryScreenValue() + "*(");
            this.SetPrimaryScreenValue("0");
        }
        else if (x == "" && y != "0") {
            this.SetSecoundaryScreenValue(this.GetPrimaryScreenValue() + "*(");
            this.SetPrimaryScreenValue("0");
        }
        else if (x != "" && y != "0" && x[x.length - 1] == "=") {
            this.SetSecoundaryScreenValue(this.GetPrimaryScreenValue() + "*(");
            this.SetPrimaryScreenValue("0");
        }
        else {
            this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + "(");
        }
        this.IncrementBracketCounter();
    }
    CloseBracketFunction() {
        if (this.GetBracketCount() > 0) {
            const x = this.GetSecoundaryScreenValue();
            if (x[x.length - 1] == ")") {
                this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + "*" + this.GetPrimaryScreenValue() + ")");
                this.SetPrimaryScreenValue("0");
            }
            else {
                this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + this.GetPrimaryScreenValue() + ")");
                this.SetPrimaryScreenValue("0");
            }
            // this.SetSecoundaryScreenValue(this.GetSecoundaryScreenValue() + this.GetPrimaryScreenValue() + ")");
            this.DecrementBracketCounter();
        }
    }
    //Bracket counter function
    IncrementBracketCounter() {
        if (this.publicAPI.BracketCounter.textContent == "") {
            this.publicAPI.BracketCounter.innerHTML = "1";
        }
        else {
            this.publicAPI.BracketCounter.innerHTML = (parseInt(this.publicAPI.BracketCounter.textContent) + 1).toString();
        }
    }
    DecrementBracketCounter() {
        if (this.publicAPI.BracketCounter.toString() == "1") {
            this.publicAPI.BracketCounter.innerHTML = "";
        }
        else {
            this.publicAPI.BracketCounter.innerHTML = (parseInt(this.publicAPI.BracketCounter.textContent) - 1).toString();
        }
    }
    GetBracketCount() {
        if (this.publicAPI.BracketCounter.textContent == "") {
            return 0;
        }
        else {
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
        const num = Number(this.GetPrimaryScreenValue());
        if (num > 100) {
            this.SetPrimaryScreenValue("Infinity");
        }
        else {
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
    DoLog(str) {
        if (str == "Natural") {
            this.SetPrimaryScreenValue((Math.log(Number(this.GetPrimaryScreenValue()))).toString());
        }
        else if (str == "Base10") {
            this.SetPrimaryScreenValue((Math.log10(Number(this.GetPrimaryScreenValue()))).toString());
        }
    }
    // any ** x function
    ResToX(num) {
        this.SetPrimaryScreenValue((num ** Number(this.GetPrimaryScreenValue())).toString());
    }
    //Pow of x 
    PowOfX(num) {
        this.SetPrimaryScreenValue((Number(this.GetPrimaryScreenValue()) ** (num)).toString());
    }
    // 1/x function
    OneUponX() {
        this.SetPrimaryScreenValue((1 / Number(this.GetPrimaryScreenValue())).toString());
    }
    // Mod function
    DoMod() {
        let x = this.GetPrimaryScreenValue();
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
        let pointFound = false;
        const x = this.GetPrimaryScreenValue();
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
        const x = this.GetPrimaryScreenValue();
        if (x[0] == "(") {
            if (x[1] == "-") {
                const y = "(+" + x.substring(2);
                this.SetPrimaryScreenValue(y);
            }
            else {
                const y = "(-" + x.substring(2);
                this.SetPrimaryScreenValue(y);
            }
        }
        else {
            if (x[0] == "+") {
                const y = "(-" + x.substring(1);
                this.SetPrimaryScreenValue(y + ")");
            }
            else if (x[0] == "-") {
                const y = "(+" + x.substring(1);
                this.SetPrimaryScreenValue(y + ")");
            }
            else {
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
        }
        else {
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
        }
        else {
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
        }
        else {
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
    DoTrignoCalculation(str) {
        let x = Number(this.GetPrimaryScreenValue());
        let y = 0;
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
                }
                else {
                    if (this.isDegree) {
                        this.SetPrimaryScreenValue((this.toDegrees(Math.asin(x))).toString());
                    }
                    else {
                        this.SetPrimaryScreenValue((Math.asin(x)).toString());
                    }
                }
                break;
            case "cos-1":
                if (x > 1 && x < -1)
                    this.SetPrimaryScreenValue("Invalid Value!");
                else if (this.isDegree) {
                    this.SetPrimaryScreenValue((this.toDegrees(Math.acos(x))).toString());
                }
                else {
                    this.SetPrimaryScreenValue((Math.acos(x)).toString());
                }
                break;
            case "tan-1":
                if (x > 1 && x < -1)
                    this.SetPrimaryScreenValue("Invalid Value!");
                else if (this.isDegree) {
                    this.SetPrimaryScreenValue((this.toDegrees(Math.atan(x))).toString());
                }
                else {
                    this.SetPrimaryScreenValue((Math.atan(x)).toString());
                }
                break;
            case "cot-1":
                if (this.isDegree) {
                    this.SetPrimaryScreenValue((this.toDegrees(1 / Math.atan(x))).toString());
                }
                else {
                    this.SetPrimaryScreenValue((1 / Math.atan(x)).toString());
                }
                break;
            case "cosec-1":
                if (this.isDegree) {
                    this.SetPrimaryScreenValue((this.toDegrees(1 / Math.asin(x))).toString());
                }
                else {
                    this.SetPrimaryScreenValue((1 / Math.asin(x)).toString());
                }
                break;
            case "sec-1":
                if (this.isDegree) {
                    this.SetPrimaryScreenValue((this.toDegrees(1 / Math.acos(x))).toString());
                }
                else {
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
    toRadians(angle) {
        return angle * (Math.PI / 180);
    }
    toDegrees(angle) {
        return angle * (180 / Math.PI);
    }
    //floor and ceil values
    FloorAndCeilVal(x) {
        if (x) {
            this.SetPrimaryScreenValue((Math.floor(Number(this.GetPrimaryScreenValue()))).toString());
        }
        else {
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
        }
        else {
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
        this.EnableButton();
    }
    ShowMemory() {
        if (this.Memory.length != 0) {
            let html = "";
            for (let i = this.Memory.length - 1, len = 0; i >= len; i--) {
                html += `<div>${this.Memory[i]}</div>`;
            }
            this.publicAPI.MemorySection.innerHTML = html;
        }
        else {
            this.publicAPI.MemorySection.innerHTML = "Nothing to Show.";
        }
    }
    // memory buttons enable and disable
    EnableButton() {
        let x = document.getElementById("memoryClear");
        x.removeAttribute("disabled");
        let y = document.getElementById("memoryRecall");
        y.removeAttribute("disabled");
    }
    DisbleButton() {
        let x = document.getElementById("memoryClear");
        x.disabled = true;
        let y = document.getElementById("memoryRecall");
        y.disabled = true;
    }
    // Exp function
    Exponational() {
        const x = this.GetPrimaryScreenValue();
        let isFound = false;
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
        }
        else {
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
        const x = Number(this.GetPrimaryScreenValue());
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
(_a = document.getElementById("DegBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => calculator.DegToRad());
(_b = document.getElementById("exp-extra")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => calculator.Exponational());
//memory function
(_c = document.getElementById("memoryClear")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => calculator.MemoryClear());
(_d = document.getElementById("memoryRecall")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => calculator.MemoryRead());
(_e = document.getElementById("memoryPlus")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => calculator.MemoryAdd());
(_f = document.getElementById("memoryMinus")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => calculator.MemorySub());
(_g = document.getElementById("memoryStore")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => calculator.MemoryStore());
(_h = document.getElementById("memoryShow")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => calculator.ShowMemory());
// extra tigno and function button in trigno
(_j = document.getElementById("trignoSecound")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", () => calculator.Trigno2nd());
(_k = document.getElementById("trignohyperextra")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", () => calculator.TrignoHyper());
(_l = document.getElementById("sin")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", () => { calculator.DoTrignoCalculation("sin"); });
(_m = document.getElementById("cos")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", () => { calculator.DoTrignoCalculation("cos"); });
(_o = document.getElementById("tan")) === null || _o === void 0 ? void 0 : _o.addEventListener("click", () => { calculator.DoTrignoCalculation("tan"); });
(_p = document.getElementById("cot")) === null || _p === void 0 ? void 0 : _p.addEventListener("click", () => { calculator.DoTrignoCalculation("cot"); });
(_q = document.getElementById("sec")) === null || _q === void 0 ? void 0 : _q.addEventListener("click", () => { calculator.DoTrignoCalculation("sec"); });
(_r = document.getElementById("csc")) === null || _r === void 0 ? void 0 : _r.addEventListener("click", () => { calculator.DoTrignoCalculation("cosec"); });
(_s = document.getElementById("sin-1")) === null || _s === void 0 ? void 0 : _s.addEventListener("click", () => { calculator.DoTrignoCalculation("sin-1"); });
(_t = document.getElementById("cos-1")) === null || _t === void 0 ? void 0 : _t.addEventListener("click", () => { calculator.DoTrignoCalculation("cos-1"); });
(_u = document.getElementById("tan-1")) === null || _u === void 0 ? void 0 : _u.addEventListener("click", () => { calculator.DoTrignoCalculation("tan-1"); });
(_v = document.getElementById("cot-1")) === null || _v === void 0 ? void 0 : _v.addEventListener("click", () => { calculator.DoTrignoCalculation("cot-1"); });
(_w = document.getElementById("sec-1")) === null || _w === void 0 ? void 0 : _w.addEventListener("click", () => { calculator.DoTrignoCalculation("sec-1"); });
(_x = document.getElementById("csc-1")) === null || _x === void 0 ? void 0 : _x.addEventListener("click", () => { calculator.DoTrignoCalculation("cosec-1"); });
(_y = document.getElementById("sinh")) === null || _y === void 0 ? void 0 : _y.addEventListener("click", () => { calculator.DoTrignoCalculation("sinh"); });
(_z = document.getElementById("cosh")) === null || _z === void 0 ? void 0 : _z.addEventListener("click", () => { calculator.DoTrignoCalculation("cosh"); });
(_0 = document.getElementById("tanh")) === null || _0 === void 0 ? void 0 : _0.addEventListener("click", () => { calculator.DoTrignoCalculation("tanh"); });
(_1 = document.getElementById("coth")) === null || _1 === void 0 ? void 0 : _1.addEventListener("click", () => { calculator.DoTrignoCalculation("coth"); });
(_2 = document.getElementById("sech")) === null || _2 === void 0 ? void 0 : _2.addEventListener("click", () => { calculator.DoTrignoCalculation("sech"); });
(_3 = document.getElementById("csch")) === null || _3 === void 0 ? void 0 : _3.addEventListener("click", () => { calculator.DoTrignoCalculation("cosech"); });
(_4 = document.getElementById("mod")) === null || _4 === void 0 ? void 0 : _4.addEventListener("click", () => { calculator.DoMod(); });
(_5 = document.getElementById("floor")) === null || _5 === void 0 ? void 0 : _5.addEventListener("click", () => { calculator.FloorAndCeilVal(true); });
(_6 = document.getElementById("ceil")) === null || _6 === void 0 ? void 0 : _6.addEventListener("click", () => { calculator.FloorAndCeilVal(false); });
(_7 = document.getElementById("random")) === null || _7 === void 0 ? void 0 : _7.addEventListener("click", () => { calculator.PutRandom(); });
(_8 = document.getElementById("dms")) === null || _8 === void 0 ? void 0 : _8.addEventListener("click", () => { calculator.DMS(); });
// first line
(_9 = document.getElementById("second-nd")) === null || _9 === void 0 ? void 0 : _9.addEventListener("click", () => calculator.SecoundaryButoonFunction());
(_10 = document.getElementById("PIValue")) === null || _10 === void 0 ? void 0 : _10.addEventListener("click", () => calculator.WritePIValue());
(_11 = document.getElementById("EValue")) === null || _11 === void 0 ? void 0 : _11.addEventListener("click", () => calculator.WriteEValue());
(_12 = document.getElementById("Clear")) === null || _12 === void 0 ? void 0 : _12.addEventListener("click", () => calculator.ClearScreen());
(_13 = document.getElementById("removeBack")) === null || _13 === void 0 ? void 0 : _13.addEventListener("click", () => calculator.RemoveFromBack());
// secound line
(_14 = document.getElementById("powOf2")) === null || _14 === void 0 ? void 0 : _14.addEventListener("click", () => calculator.PowOfX(2));
(_15 = document.getElementById("powOf3")) === null || _15 === void 0 ? void 0 : _15.addEventListener("click", () => calculator.PowOfX(3));
(_16 = document.getElementById("OneUponX")) === null || _16 === void 0 ? void 0 : _16.addEventListener("click", () => calculator.OneUponX());
(_17 = document.getElementById("Mods")) === null || _17 === void 0 ? void 0 : _17.addEventListener("click", () => calculator.DoMod());
(_18 = document.getElementById("Exponential")) === null || _18 === void 0 ? void 0 : _18.addEventListener("click", () => calculator.Exponational());
(_19 = document.getElementById("modular")) === null || _19 === void 0 ? void 0 : _19.addEventListener("click", () => calculator.BasicFunctions("%"));
//third line
(_20 = document.getElementById("powOfOneBy2")) === null || _20 === void 0 ? void 0 : _20.addEventListener("click", () => calculator.PowOfX(1 / 2));
(_21 = document.getElementById("powOfOneBy3")) === null || _21 === void 0 ? void 0 : _21.addEventListener("click", () => calculator.PowOfX(1 / 3));
(_22 = document.getElementById("Open-Bracket")) === null || _22 === void 0 ? void 0 : _22.addEventListener("click", () => calculator.OpenBracketFunction());
(_23 = document.getElementById("Close-Bracket")) === null || _23 === void 0 ? void 0 : _23.addEventListener("click", () => calculator.CloseBracketFunction());
(_24 = document.getElementById("Factorial")) === null || _24 === void 0 ? void 0 : _24.addEventListener("click", () => calculator.DoFactorial());
(_25 = document.getElementById("Devide")) === null || _25 === void 0 ? void 0 : _25.addEventListener("click", () => calculator.BasicFunctions("/"));
// forth line
(_26 = document.getElementById("SqureOfy")) === null || _26 === void 0 ? void 0 : _26.addEventListener("click", () => calculator.BasicFunctions("**"));
(_27 = document.getElementById("seven")) === null || _27 === void 0 ? void 0 : _27.addEventListener("click", () => calculator.AddNumber("7"));
(_28 = document.getElementById("eight")) === null || _28 === void 0 ? void 0 : _28.addEventListener("click", () => calculator.AddNumber("8"));
(_29 = document.getElementById("nine")) === null || _29 === void 0 ? void 0 : _29.addEventListener("click", () => calculator.AddNumber("9"));
(_30 = document.getElementById("Multiplication")) === null || _30 === void 0 ? void 0 : _30.addEventListener("click", () => calculator.BasicFunctions("*"));
// fifth line
(_31 = document.getElementById("resToTen")) === null || _31 === void 0 ? void 0 : _31.addEventListener("click", () => calculator.ResToX(10));
(_32 = document.getElementById("resToTwo")) === null || _32 === void 0 ? void 0 : _32.addEventListener("click", () => calculator.ResToX(2));
(_33 = document.getElementById("four")) === null || _33 === void 0 ? void 0 : _33.addEventListener("click", () => calculator.AddNumber("4"));
(_34 = document.getElementById("five")) === null || _34 === void 0 ? void 0 : _34.addEventListener("click", () => calculator.AddNumber("5"));
(_35 = document.getElementById("six")) === null || _35 === void 0 ? void 0 : _35.addEventListener("click", () => calculator.AddNumber("6"));
(_36 = document.getElementById("substraction")) === null || _36 === void 0 ? void 0 : _36.addEventListener("click", () => calculator.BasicFunctions("-"));
// six line
(_37 = document.getElementById("logBaseTen")) === null || _37 === void 0 ? void 0 : _37.addEventListener("click", () => calculator.DoLog("Base10"));
(_38 = document.getElementById("one")) === null || _38 === void 0 ? void 0 : _38.addEventListener("click", () => calculator.AddNumber("1"));
(_39 = document.getElementById("two")) === null || _39 === void 0 ? void 0 : _39.addEventListener("click", () => calculator.AddNumber("2"));
(_40 = document.getElementById("three")) === null || _40 === void 0 ? void 0 : _40.addEventListener("click", () => calculator.AddNumber("3"));
(_41 = document.getElementById("addition")) === null || _41 === void 0 ? void 0 : _41.addEventListener("click", () => calculator.BasicFunctions("+"));
// seven line
(_42 = document.getElementById("logNatural")) === null || _42 === void 0 ? void 0 : _42.addEventListener("click", () => calculator.DoLog('Natural'));
(_43 = document.getElementById("resToE")) === null || _43 === void 0 ? void 0 : _43.addEventListener("click", () => calculator.ResToX(Math.E));
(_44 = document.getElementById("negate")) === null || _44 === void 0 ? void 0 : _44.addEventListener("click", () => calculator.NegateFunction());
(_45 = document.getElementById("zero")) === null || _45 === void 0 ? void 0 : _45.addEventListener("click", () => calculator.AddNumber('0'));
(_46 = document.getElementById("putPoint")) === null || _46 === void 0 ? void 0 : _46.addEventListener("click", () => calculator.PutPoint());
(_47 = document.getElementById("Equal")) === null || _47 === void 0 ? void 0 : _47.addEventListener("click", () => calculator.EqualOperator());
