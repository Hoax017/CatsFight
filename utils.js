export function readStdIn(input) {
    console.log(input);
    return new Promise((resolve, reject) => {
        process.stdin.on('data', function(data) {
            resolve(data.toString());
        });
    });
}