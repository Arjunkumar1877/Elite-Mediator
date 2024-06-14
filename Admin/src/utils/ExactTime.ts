export function extractTime(dateString: Date){
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}: ${minutes}`
}

function padZero(number: number){
    return number.toString().padStart(2, "0");
}