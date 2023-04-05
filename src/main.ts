import { Calculator } from './Calc.js';

const calculator = new Calculator();

calculator.SecoundaryButoonFunction();
calculator.Trigno2nd();

document.getElementById("Buttons")?.addEventListener("click", (e) => {
    const x = e.target as Element;
    switch (x.id) {
        //extra Operators
        case "Equal": calculator.EqualOperator(); break;
        case "putPoint": calculator.PutPoint(); break;
        case "negate": calculator.NegateFunction(); break;
        case "dms": calculator.DMS(); break;
        case "random": calculator.PutRandom(); break;
        case "ceil": calculator.FloorAndCeilVal(false); break;
        case "floor": calculator.FloorAndCeilVal(true); break;
        case "mod": calculator.DoMod(); break;

        // resto function
        case "resToE": calculator.ResToX(Math.E); break;
        case "resToTen": calculator.ResToX(10); break;
        case "resToTwo": calculator.ResToX(2); break;

        // log functions
        case "logNatural": calculator.DoLog("Natural"); break;
        case "logBaseTen": calculator.DoLog("Base10"); break;

        //extra
        case "Factorial": calculator.DoFactorial(); break;
        case "Exponential": calculator.Exponational(); break;
        case "Mods": calculator.DoMod(); break;
        case "removeBack": calculator.RemoveFromBack(); break;
        case "Clear": calculator.ClearScreen(); break;
        case "OneUponX": calculator.OneUponX(); break;

        // Power of Functions
        case "powOfOneBy3": calculator.PowOfX(1 / 3); break;
        case "powOfOneBy2": calculator.PowOfX(1 / 2); break;
        case "powOf2": calculator.PowOfX(2); break;
        case "powOf3": calculator.PowOfX(3); break;

        //static values print
        case "EValue": calculator.WriteEValue(); break;
        case "PIValue": calculator.WritePIValue(); break;

        case "second-nd": calculator.SecoundaryButoonFunction(); break;

        //Brackets
        case "Close-Bracket": calculator.CloseBracketFunction(); break;
        case "Open-Bracket": calculator.OpenBracketFunction(); break;

        //Operators
        case "addition": calculator.BasicFunctions("+"); break;
        case "substraction": calculator.BasicFunctions("-"); break;
        case "Multiplication": calculator.BasicFunctions("*"); break;
        case "Devide": calculator.BasicFunctions("/"); break;
        case "SqureOfy": calculator.BasicFunctions("**"); break;
        case "modular": calculator.BasicFunctions("%"); break;

        // Numbers
        case "zero": calculator.AddNumber("0"); break;
        case "one": calculator.AddNumber("1"); break;
        case "two": calculator.AddNumber("2"); break;
        case "three": calculator.AddNumber("3"); break;
        case "four": calculator.AddNumber("4"); break;
        case "five": calculator.AddNumber("5"); break;
        case "six": calculator.AddNumber("6"); break;
        case "seven": calculator.AddNumber("7"); break;
        case "eight": calculator.AddNumber("8"); break;
        case "nine": calculator.AddNumber("9"); break;

        case "DegBtn": calculator.DegToRad(); break;
        case "exp-extra": calculator.Exponational(); break;

        // Memory functions
        case "memoryClear": calculator.MemoryClear(); break;
        case "memoryRecall": calculator.MemoryRead(); break;
        case "memoryPlus": calculator.MemoryAdd(); break;
        case "memoryMinus": calculator.MemorySub(); break;
        case "memoryStore": calculator.MemoryStore(); break;
        case "memoryShow": calculator.ShowMemory(); break;

        // Trigno 
        case "sin": calculator.DoTrignoCalculation("sin"); break;
        case "cos": calculator.DoTrignoCalculation("cos"); break;
        case "tan": calculator.DoTrignoCalculation("tan"); break;

        case "cot": calculator.DoTrignoCalculation("cot"); break;
        case "sec": calculator.DoTrignoCalculation("sec"); break;
        case "csc": calculator.DoTrignoCalculation("cosec"); break;

        case "sin-1": calculator.DoTrignoCalculation("sin-1"); break;
        case "cos-1": calculator.DoTrignoCalculation("cos-1"); break;
        case "tan-1": calculator.DoTrignoCalculation("tan-1"); break;

        case "cot-1": calculator.DoTrignoCalculation("cot-1"); break;
        case "sec-1": calculator.DoTrignoCalculation("sec-1"); break;
        case "csc-1": calculator.DoTrignoCalculation("cosec-1"); break;

        case "sinh": calculator.DoTrignoCalculation("sinh"); break;
        case "cosh": calculator.DoTrignoCalculation("cosh"); break;
        case "tanh": calculator.DoTrignoCalculation("tanh"); break;

        case "coth": calculator.DoTrignoCalculation("coth"); break;
        case "sech": calculator.DoTrignoCalculation("sech"); break;
        case "csch": calculator.DoTrignoCalculation("cosech"); break;

        case "trignoSecound": calculator.Trigno2nd(); break;
        case "trignohyperextra": calculator.TrignoHyper(); break;
    }

})

window.onkeydown = (e :KeyboardEvent) => {
    const x = e.key;
    
    console.log(x);
    
    switch (x) {
        case "0": calculator.AddNumber("0"); break;
        case "1": calculator.AddNumber("1"); break;
        case "2": calculator.AddNumber("2"); break;
        case "3": calculator.AddNumber("3"); break;
        case "4": calculator.AddNumber("4"); break;
        case "5": calculator.AddNumber("5"); break;
        case "6": calculator.AddNumber("6"); break;
        case "7": calculator.AddNumber("7"); break;
        case "8": calculator.AddNumber("8"); break;
        case "9": calculator.AddNumber("9"); break;

        case "+": calculator.BasicFunctions("+"); break;
        case "-": calculator.BasicFunctions("-"); break;
        case "*": calculator.BasicFunctions("*"); break;
        case "/": calculator.BasicFunctions("/"); break;
        case "%": calculator.BasicFunctions("%"); break;

        case "=": calculator.EqualOperator(); break;
        case ".": calculator.PutPoint(); break;

        case "(": calculator.OpenBracketFunction(); break;
        case ")": calculator.CloseBracketFunction(); break;

        case "Backspace": calculator.RemoveFromBack(); break;
        case "e": calculator.WriteEValue(); break;
        case "p": calculator.WritePIValue(); break;
        case "s": calculator.DoTrignoCalculation("sin"); break;
        case "c": calculator.DoTrignoCalculation("cos"); break;
        case "t": calculator.DoTrignoCalculation("tan"); break;
        case "S": calculator.DoTrignoCalculation("sin-1"); break;
        case "C": calculator.DoTrignoCalculation("cos-2"); break;
        case "T": calculator.DoTrignoCalculation("tan-3"); break;
        case "a" || "A": calculator.DoMod(); break;
        case "!": calculator.DoFactorial(); break;
        case "l": calculator.DoLog("Natural"); break;
        case "Enter": calculator.EqualOperator(); break;
        case "Delete": calculator.ClearScreen(); break;
        default : /* Do nothing */ break;
    }
}