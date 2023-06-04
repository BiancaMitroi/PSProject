import React from 'react';
import { useIntl } from 'react-intl';

const LocationLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="location">{ intl.formatMessage( { id: 'app.location' } ) }</label></div>
    );
};

export default LocationLabel;
