import React from 'react';
import { useIntl } from 'react-intl';

const UsernameLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="username">{ intl.formatMessage( { id: 'app.username' } ) }</label></div>
    );
};

export default UsernameLabel;
