import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByTag({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  const queryKey = ['notes', 1, '', tag];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        tag,
      }),
  });

  const queryState = queryClient.getQueryState(queryKey);

  if (queryState?.status === 'error') {
    throw queryState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? 'all'} tag={tag} />
    </HydrationBoundary>
  );
}
