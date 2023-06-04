import React from 'react';
import { useIntl } from 'react-intl';

const SetLanguageLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="lang">{ intl.formatMessage( { id: 'app.lang' } ) }</label></div>
    );
};

export default SetLanguageLabel;
