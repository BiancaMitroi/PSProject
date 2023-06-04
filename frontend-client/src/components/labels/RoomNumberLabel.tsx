import React from 'react';
import { useIntl } from 'react-intl';


const RoomNumberLabel: React.FC = ( { } ) =>
{
    const intl = useIntl();

    return (
        <div><label htmlFor="room_number">{ intl.formatMessage( { id: 'app.room_number' } ) }</label></div>
    );
};

export default RoomNumberLabel;