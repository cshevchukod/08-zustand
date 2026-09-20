'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
