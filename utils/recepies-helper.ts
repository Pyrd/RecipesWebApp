export function getStatusChipColor(status: string) {
    switch (status) {
        case 'DELETED':
            return 'error'
        case 'TO_BE_APPROVED':
            return 'warning'
        case 'ACTIVE':
            return 'primary'
    }
    return ''
}
export function formatStatus(status: string) {
    try {
        if (!status || typeof status != 'string') {
            return ''
        }
        const tmp = status.replaceAll('_', ' ').toLowerCase()
        return tmp.charAt(0).toUpperCase() + tmp.slice(1)
    } catch (e) {
        return ''
    }
}