import React from 'react';
import { useIntl } from 'react-intl';

const PriceLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="price">{ intl.formatMessage( { id: 'app.price' } ) }</label></div>
    );
};
export default PriceLabel;