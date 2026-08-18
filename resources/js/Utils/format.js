export function formatPrice(amount) {
    return `৳${new Intl.NumberFormat('en-US').format(amount)}`;
}

export function formatSpeed({ download, upload }) {
    if (upload && upload !== download) {
        return `${download}/${upload} Mbps`;
    }

    return `${download} Mbps`;
}

export function formatNumber(value, decimals = 0) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}
