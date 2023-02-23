export async function fetchData(input: RequestInfo, init?: RequestInit) {
    // For cross domain requests, add credentials to the fetch configuration
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMsg = errorBody.error;
        throw Error(errorMsg);
    }
}