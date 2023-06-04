import React from 'react';
import { useIntl } from 'react-intl';

const MailLabel: React.FC = ( { } ) =>
{
  const intl = useIntl();

  return (
    <div><label htmlFor="mail">{ intl.formatMessage( { id: 'app.mail' } ) }</label></div>
  );
};
export default MailLabel;