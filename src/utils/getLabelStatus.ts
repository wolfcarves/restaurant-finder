export const getStatusLabel = (closedBucket: string | null | undefined) => {
    switch (closedBucket) {
        case 'Open':
            return 'Open';
        case 'Closed':
            return 'Closed';
        case 'LikelyOpen':
            return 'Likely Open';
        case 'LikelyClosed':
            return 'Likely Closed';
        default:
            return 'Unsure';
    }
};
