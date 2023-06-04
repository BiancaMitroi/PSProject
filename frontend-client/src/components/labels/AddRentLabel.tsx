import React from 'react';
import { useIntl } from 'react-intl';

const AddRentLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="add_rent">{ intl.formatMessage( { id: 'app.add_rent' } ) }</label></div>
    );
};

export default AddRentLabel;
