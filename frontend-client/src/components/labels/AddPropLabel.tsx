import React from 'react';
import { useIntl } from 'react-intl';

const AddPropLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="add_prop">{ intl.formatMessage( { id: 'app.add_prop' } ) }</label></div>
    );
};

export default AddPropLabel;
