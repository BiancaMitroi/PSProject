import React from 'react';
import { useIntl } from 'react-intl';

const FilterLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="filter">{ intl.formatMessage( { id: 'app.filter' } ) }</label></div>
    );
};

export default FilterLabel;
