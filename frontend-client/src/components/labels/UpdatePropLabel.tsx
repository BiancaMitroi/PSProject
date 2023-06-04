import React from 'react';
import { useIntl } from 'react-intl';

const UpdatePropLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="update_prop">{ intl.formatMessage( { id: 'app.update_prop' } ) }</label></div>
    );
};

export default UpdatePropLabel;
