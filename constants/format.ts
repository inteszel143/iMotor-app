export const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
};

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

export const formatTime = (timeString: string): string => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
};

export const isDifferentDay = (d1: Date, d2: Date) =>
    d1.getFullYear() !== d2.getFullYear() ||
    d1.getMonth() !== d2.getMonth() ||
    d1.getDate() !== d2.getDate();
