import React from 'react';
import { useIntl } from 'react-intl';

const PropertyTypeLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="property_type">{ intl.formatMessage( { id: 'app.property_type' } ) }</label></div>
    );
};
export default PropertyTypeLabel;