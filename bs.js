// Non-recursive binary search function
function binarySearchNonRecursive(arr, x) {
    let start = 0;
    let end = arr.length - 1;
    let iterations = 0;

    while (start <= end) {
        iterations++;
        let mid = Math.floor((start + end) / 2);

        if (arr[mid] === x) {
            return { index: mid, iterations };
        } else if (arr[mid] < x) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return { index: -1, iterations };
}

// Recursive binary search function
function binarySearchRecursive(arr, x, start, end) {
    if (start > end) {
        return { index: -1, iterations: 0 };
    }

    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === x) {
        return { index: mid, iterations: 1 }; // We count this as 1 iteration
    } else if (arr[mid] < x) {
        let result = binarySearchRecursive(arr, x, mid + 1, end);
        return { index: result.index, iterations: result.iterations + 1 };
    } else {
        let result = binarySearchRecursive(arr, x, start, mid - 1);
        return { index: result.index, iterations: result.iterations + 1 };
    }
}

// Form submission handler
document.getElementById('binarySearchForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

// Non-Recursive Search Button Handler
document.getElementById('nonRecursiveSearchBtn').addEventListener('click', function() {
    // Clear previous results and error messages
    document.getElementById('nonRecursiveResult').innerText = '';
    document.getElementById('recursiveResult').innerText = '';
    document.getElementById('errorResult').innerText = '';

    // Get input values
    let arrayInput = document.getElementById('arrayInput').value.trim();
    let searchInput = parseInt(document.getElementById('searchInput').value);

    // Convert array input to array of integers
    let arr = arrayInput.split(',').map(num => parseInt(num));

    // Perform non-recursive binary search
    let startTime = performance.now();
    let nonRecursiveResult = binarySearchNonRecursive(arr, searchInput);
    let endTime = performance.now();
    let timeTaken = endTime - startTime;

    if (nonRecursiveResult.index !== -1) {
        document.getElementById('nonRecursiveResult').innerText = `Non-recursive: Element ${searchInput} is at index ${nonRecursiveResult.index}. Iterations: ${nonRecursiveResult.iterations}. Time taken: ${timeTaken.toFixed(4)} ms.`;
    } else {
        document.getElementById('errorResult').innerText = `Non-recursive: Element ${searchInput} not found after ${nonRecursiveResult.iterations} iterations. Time taken: ${timeTaken.toFixed(4)} ms.`;
    }
});

// Recursive Search Button Handler
document.getElementById('recursiveSearchBtn').addEventListener('click', function() {
    // Clear previous results and error messages
    document.getElementById('nonRecursiveResult').innerText = '';
    document.getElementById('recursiveResult').innerText = '';
    document.getElementById('errorResult').innerText = '';

    // Get input values
    let arrayInput = document.getElementById('arrayInput').value.trim();
    let searchInput = parseInt(document.getElementById('searchInput').value);

    // Convert array input to array of integers
    let arr = arrayInput.split(',').map(num => parseInt(num));

    // Perform recursive binary search
    let startTime = performance.now();
    let recursiveResult = binarySearchRecursive(arr, searchInput, 0, arr.length - 1);
    let endTime = performance.now();
    let timeTaken = endTime - startTime;

    if (recursiveResult.index !== -1) {
        document.getElementById('recursiveResult').innerText = `Recursive: Element ${searchInput} is at index ${recursiveResult.index}. Iterations: ${recursiveResult.iterations}. Time taken: ${timeTaken.toFixed(4)} ms.`;
    } else {
        document.getElementById('errorResult').innerText = `Recursive: Element ${searchInput} not found after ${recursiveResult.iterations} iterations. Time taken: ${timeTaken.toFixed(4)} ms.`;
    }
});
