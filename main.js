const fs = require('fs');


const input = JSON.parse(fs.readFileSync('secondInput.json', 'utf8'));
const n = input.keys.n;  
const k = input.keys.k;  
const roots = [];


for (let key in input) {
    if (!isNaN(key)) {  
        const x = parseInt(key);  
        const y = parseInt(input[key].value, input[key].base); 
        roots.push([x, y]);  
    }
}
if (n < k) {
    console.error(`Error: Insufficient shares. Required: ${k}, Provided: ${n}`);
    process.exit(1); // Terminate the script with an error code
}


function lagrangeInterpolation(roots, x) {
   
    let result = 0;
    const n = roots.length;
    
    for (let i = 0; i < n; i++) {
        const xi = roots[i][0];
        const yi = roots[i][1];
        let term = yi;
        
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                const xj = roots[j][0];
                term *= (x - xj) / (xi - xj);
            }
        }
        
        result += term;
    }
    
    return result;
}


const secret = lagrangeInterpolation(roots, 0);

console.log('The secret (constant term c) is:', secret);
