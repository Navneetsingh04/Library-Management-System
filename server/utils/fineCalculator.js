export const calcualteFine = (dueDate) => {
    const finePerHour = 5;  //₹5 per hour
    const today = new Date();
    if(today > dueDate) {
        const timeDiff = Math.abs(today - dueDate);
        const lateHours = Math.ceil(timeDiff / (1000 * 60 * 60));
        const fine = finePerHour * lateHours;
        return fine;
    }
    return 0;
}