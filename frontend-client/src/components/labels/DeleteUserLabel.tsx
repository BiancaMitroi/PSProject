import React from 'react';
import { useIntl } from 'react-intl';

const DeleteUserLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="delete_user">{ intl.formatMessage( { id: 'app.delete_user' } ) }</label></div>
    );
};

export default DeleteUserLabel;
