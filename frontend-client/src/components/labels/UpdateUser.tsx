import React from 'react';
import { useIntl } from 'react-intl';

const UpdateUserLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="update_user">{ intl.formatMessage( { id: 'app.update_user' } ) }</label></div>
    );
};

export default UpdateUserLabel;
