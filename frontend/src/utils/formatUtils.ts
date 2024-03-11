export const formatNumber = (number: number): string => {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + "B";
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    } else {
        return number.toString();
    }
}

export const formatDateTime = (date: Date): string => {
    date = new Date(date)
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


export const formatDateTimeShort = (datse: any): string => {
    const date = new Date(datse);
    const day = date.getDate();
    const monthNames = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear() + 543; // Convert to Thai year

    const thaiDate = `${day} ${monthNames[monthIndex]} ${year}`;
    return thaiDate
}

export const formatString = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    }
    return text;
}