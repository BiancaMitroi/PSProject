import React from 'react';
import { useIntl } from 'react-intl';

const PasswordLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="password">{ intl.formatMessage( { id: 'app.password' } ) }</label></div>
    );
};

export default PasswordLabel;
