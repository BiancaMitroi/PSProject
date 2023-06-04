import React from 'react';
import { useIntl } from 'react-intl';

const PhoneLabel: React.FC = ( { } ) =>
{
  const intl = useIntl();

  return (
    <div><label htmlFor="phone">{ intl.formatMessage( { id: 'app.phone' } ) }</label></div>
  );
};
export default PhoneLabel;