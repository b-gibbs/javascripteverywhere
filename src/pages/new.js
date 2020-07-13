import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { NEW_NOTE } from '../gql/mutation';
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';

const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note - Notedly';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    // refecth the GET_NOTES query to update the cache
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      // when complete, redirect the user to the note page
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
