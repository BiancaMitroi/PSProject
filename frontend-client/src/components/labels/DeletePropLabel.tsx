import React from 'react';
import { useIntl } from 'react-intl';

const DeletePropLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="delete_prop">{ intl.formatMessage( { id: 'app.delete_prop' } ) }</label></div>
    );
};

export default DeletePropLabel;
