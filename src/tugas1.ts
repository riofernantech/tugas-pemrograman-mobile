function segitiga(NIM: string): string {
    let height = parseInt(NIM.charAt(NIM.length - 1));
    let result = '';

    for (let i = 1; i <= height; i++) {
        for (let j = 1; j <= i; j++) {
            result += `${j} `;
        }
        result += '\n';
    }

    return result;
}

function deret(NIM: string): string {
    let start = parseInt(NIM.slice(-2));
    let step = parseInt(NIM.charAt(NIM.length - 3)) + 1;

    let result: Array<string>= [];

    for (let i = start; result.length < 10; i = i + step) {
        result.push(i.toString());
    }

    return result.join(' ');
}


function prime(NIM: string): string {
    let last = parseInt(NIM.slice(-2)) + 10;
    let result: Array<string> = [];

    for (let i = 2; i <= last; i++) {
        if (isPrime(i)) {
            result.push(i.toString());
        }
    }

    function isPrime(num: number): boolean {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    return result.join(' ');
}


let NIM = "050043504";

console.log("===== Segitiga =====");
console.log(segitiga(NIM));

console.log("===== Deret =====");
console.log(deret(NIM));

console.log('\n');

console.log("===== Prima =====");
console.log(prime(NIM));