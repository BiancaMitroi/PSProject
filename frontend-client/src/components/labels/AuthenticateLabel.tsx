import React from 'react';
import { useIntl } from 'react-intl';

const AuthenticateLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="auth">{ intl.formatMessage( { id: 'app.auth' } ) }</label></div>
    );
};

export default AuthenticateLabel;
