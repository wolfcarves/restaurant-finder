'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { useState } from 'react';
import { getQueryClient } from './query-client';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(getQueryClient());
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
