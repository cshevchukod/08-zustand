import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  const queryKey = ['note', id];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNoteById(id),
  });

  const queryState = queryClient.getQueryState(queryKey);

  if (queryState?.status === 'error') {
    throw queryState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
