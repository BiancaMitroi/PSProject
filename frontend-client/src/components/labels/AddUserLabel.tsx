import React from 'react';
import { useIntl } from 'react-intl';

const AddUserLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="add_user">{ intl.formatMessage( { id: 'app.add_user' } ) }</label></div>
    );
};

export default AddUserLabel;
