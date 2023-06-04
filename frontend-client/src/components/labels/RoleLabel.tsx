import React from 'react';
import { useIntl } from 'react-intl';

const RoleLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="role">{ intl.formatMessage( { id: 'app.role' } ) }</label></div>
    );
};

export default RoleLabel;