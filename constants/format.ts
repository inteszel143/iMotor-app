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
