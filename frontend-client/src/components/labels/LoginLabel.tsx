import React from 'react';
import { useIntl } from 'react-intl';

const LoginLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="login">{ intl.formatMessage( { id: 'app.login' } ) }</label></div>
    );
};

export default LoginLabel;
