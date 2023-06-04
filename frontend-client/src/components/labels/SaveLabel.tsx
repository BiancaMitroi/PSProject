import React from 'react';
import { useIntl } from 'react-intl';


const SaveLabel: React.FC = ( { } ) =>
{
  const intl = useIntl();

  return (
    <div><label htmlFor="save">{ intl.formatMessage( { id: 'app.save' } ) }</label></div>
  );
};

export default SaveLabel;