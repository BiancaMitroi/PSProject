import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { FormLabel, Input, Select, SelectChangeEvent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import romana from '../../languages/romana.json'
import english from '../../languages/english.json'
import francais from '../../languages/francais.json'
// import { FormattedMessage } from 'react-intl';
// import LocalizationWrapper from '../../components/LocalizationWrapper';
import { IntlProvider } from 'react-intl';
import MenuItem from '@mui/material/MenuItem';

import LocationLabel from '../../components/labels/LocationLabel';
import PriceLabel from '../../components/labels/PriceLabel';
import PropertyTypeLabel from '../../components/labels/PropertyTypeLabel';
import RoomNumberLabel from '../../components/labels/RoomNumberLabel';

import UsernameLabel from '../../components/labels/UsernameLabel';
import RoleLabel from '../../components/labels/RoleLabel';

import AddPropLabel from '../../components/labels/AddPropLabel';
import UpdatePropLabel from '../../components/labels/UpdatePropLabel';
import DeletePropLabel from '../../components/labels/DeletePropLabel';
import AddRentLabel from '../../components/labels/AddRentLabel';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import ApexCharts from "apexcharts";
import SaveLabel from "../../components/labels/SaveLabel";
let first = true;

interface Data
{
    id: number;
    location: string;
    price: number;
    type: string;
    roomNumber: number;
}

interface EmployeeData
{
    location: string;
    price: number;
    type: string;
    roomNumber: number;
}

interface Rent
{
    id: number;
    propId: number;
    clientId: number;
    date: string;
}

interface AdminUser
{
    id: number;
    username: string;
    role: string;
}

interface ChartData
{
    roomno: number[];
    prices: Array<number[]>;
    avg: number[];
}

interface Props
{
    prices: number[];
    roomnumbers: number[];
}

function Employee ()
{

    const [ chart, setChart ] = useState<ChartData>();

    const MyChart = ( { prices, roomnumbers }: Props ) =>
    {
        const chartRef = React.useRef( null );

        React.useEffect( () =>
        {
            const chartData = {
                series: [
                    {
                        data: prices,
                        color: 'white',
                    },
                ],
                xaxis: {
                    categories: roomnumbers,
                },
            };

            const chartOptions = {
                chart: {
                    type: "area",
                    height: 350,
                    width: "90%",
                },
                dataLabels: {
                    enabled: true,
                },
                series: chartData.series,
                xaxis: chartData.xaxis,
                title: {
                    align: "center",
                },
            };

            const chart = new ApexCharts( chartRef.current, chartOptions );
            chart.render();

            return () =>
            {
                chart.destroy();
            };
        }, [ prices, roomnumbers ] );

        return (
          <React.Fragment>
              <div ref={ chartRef }></div>
          </React.Fragment>
        );
    };

    const [ location, setLocation ] = useState<string>('');
    const [ price, setPrice ] = useState<string>('');
    const [ type, setType ] = useState<string>('');
    const [ save, setSave ] = useState<string>('');
    const [ roomNumber, setRoomNumber ] = useState<string>('');
    const [ propId, setPropId ] = useState<number>(0);
    const [ clientId, setClientId ] = useState<number>(0);

    const handleLocation = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setLocation( event.currentTarget.value.toString() );
    }

    const handleType = ( event: SelectChangeEvent<{ value: string }> ) =>
    {
        setType( event.target.value.toString() );
    }

    const handleSave = ( event: SelectChangeEvent<{ value: string }> ) =>
    {
        setSave( event.target.value.toString() );
    }

    const handlePrice = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setPrice( event.currentTarget.value.toString() );
    }

    const handleRoomno = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setRoomNumber( event.currentTarget.value.toString() );
    }

    const handleIdprop = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setPropId( Number( event.currentTarget.value ) );
    }

    const handleIdclient = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setClientId( Number( event.currentTarget.value ) );
    }

    const [ users, setUsers ] = useState<AdminUser[]>( [] );
    const [ props, setProps ] = useState<Data[]>( [] );
    const [ rents, setRents ] = useState<Rent[]>( [] );

    const handleAddprop = ( event: { preventDefault: () => void } ) =>
    {
        event.preventDefault();
        fetch( "http://localhost:8080/property/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { location, price, type, roomNumber } ),
        } )
            .then( ( response ) =>
            {
                if ( response.ok ) return response.json();
            } )
            .then( () =>
            {
                fetch( "http://localhost:8080/property/get_id", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                } ).then( ( response ) =>
                {
                    if ( response.ok )
                    {
                        return response.json();
                    }
                } ).then( ( data: any ) =>
                {
                    setProps( data as Data[] );
                    // console.log( data );
                }
                ).catch( ( error ) => console.error( "Error fetching data", error ) );
            } )
            .catch( ( error ) => console.error( error ) );

    };

    const handleSaveText = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(JSON.stringify(props));
        fetch(`http://localhost:8080/property/save/${save}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props),
        })
          .then((response) => {
              if (response.ok) return response.json();
              throw new Error("Network response was not ok.");
          })
          .then((data) => {
              // Process the returned JSON data
              console.log(data);
          })
          .catch((error) => console.error(error));
    };
    const handleAddrent = ( event: { preventDefault: () => void } ) =>
    {
        event.preventDefault();
        // const rent = {}
        fetch( "http://localhost:8080/rent/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { clientId, propId } ),
        } )
            .then( ( response ) =>
            {
                if ( response.ok ) return response.json();
            } )
            .then( () =>
            {
                fetch( "http://localhost:8080/rent/get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                } ).then( ( response ) =>
                {
                    if ( response.ok )
                    {
                        return response.json();
                    }
                } ).then( ( data: any ) =>
                {
                    setRents( data as Rent[] );
                    console.log( data );
                }
                ).catch( ( error ) => console.error( "Error fetching data", error ) );
            } )
            .catch( ( error ) => console.error( error ) );

    };

    const handleUpdateProp = ( event: { preventDefault: () => void } ) =>
    {
        event.preventDefault();
        console.log(propId);
        const l = location || '';
        const p = Number(price) || 0;
        const t = type || 0;
        const r = Number(roomNumber) || 0;
        const newprop = { location: l, price: p, type: t, roomNumber: r};
        console.log(JSON.stringify(newprop));
        fetch( `http://localhost:8080/property/update/${ propId }`, {
            method: "PATCH",
            body: JSON.stringify(newprop),
            headers: {
                "Content-Type": "application/json",
            },
        } )
            .then( ( response ) =>
            {
                if ( response.ok ) return response.json();
            } )
            .then( ( data ) =>
            {
                console.log( "User updated successfully:", data );

                // After updating the user, you can fetch the updated user list if needed
                fetch( "http://localhost:8080/property/get_id", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                } )
                    .then( ( response ) =>
                    {
                        if ( response.ok ) return response.json();
                    } )
                    .then( ( data ) =>
                    {
                        setProps( data as Data[] );
                        console.log( "Updated user list:", data );
                    } )
                    .catch( ( error ) => console.error( "Error fetching data", error ) );
            } )
            .catch( ( error ) => console.error( error ) );
    }


    const handleDeleteProp = ( event: { preventDefault: () => void } ) =>
    {
        event.preventDefault();

        fetch( `http://localhost:8080/property/delete/${ propId }`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
        } )
            .then( () =>
            {
                // After updating the user, you can fetch the updated user list if needed
                fetch( "http://localhost:8080/property/get_id", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                } )
                    .then( ( response ) =>
                    {
                        if ( response.ok ) return response.json();
                    } )
                    .then( ( data ) =>
                    {
                        setProps( data as Data[] );
                        console.log( "Updated user list:", data );
                    } )
                    .catch( ( error ) => console.error( "Error fetching data", error ) );
            } )
            .catch( ( error ) => console.error( error ) );
    }

    type LocalizationWrapperProps = {
        locale: string;
        children: React.ReactNode;
    };

    // const locales = [
    //     "ro-RO",
    //     "en-US",
    //     "fr-FR",
    // ]

    const messages = {
        'ro-RO': romana,
        'en-US': english,
        'fr-FR': francais
    };

    const LocalizationWrapper: React.FC<LocalizationWrapperProps> = ( { children, locale } ) =>
    {

        return (
            <IntlProvider locale={ locale } messages={ messages[ locale as keyof typeof messages ] }>
                { children }
            </IntlProvider>
        );
    };

    const navigate = useNavigate();

    useEffect( () =>
    {
        if ( first )
        {
            if ( localStorage.getItem( 'logged' ) != 'EMPLOYEE' )
                navigate( "/login" );
            else
            {
                localStorage.removeItem( 'logged' );
                first = false;
                fetch( "http://localhost:8080/user/getclients", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                } ).then( ( response ) =>
                {
                    if ( response.ok )
                    {
                        return response.json();
                    }
                } ).then( ( data: any ) =>
                {
                    setUsers( data as AdminUser[] );
                    fetch( "http://localhost:8080/property/get_id", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        mode: "cors",
                    } ).then( ( response ) =>
                    {
                        if ( response.ok )
                        {
                            return response.json();
                        }
                    } ).then( ( data: any ) =>
                    {
                        setProps( data as Data[] );

                        /////////////////////////////////
                        let roomno: number[] = [];
                        let price: Array<number[]> = [];
                        let avg: number[] = []; // <-- add this array

                        for ( let date in data )
                        {
                            const index = roomno.indexOf( data[ date ].roomNumber );
                            if ( index === -1 )
                            {
                                roomno.push( data[ date ].roomNumber );
                                price.push( [ data[ date ].price ] );
                            } else
                            {
                                price[ index ].push( data[ date ].price );
                            }
                        }

                        for ( let i in price )
                        {
                            let sum = 0;
                            for ( let j in price[ i ] )
                            {
                                sum += price[ i ][ j ];
                            }
                            avg.push( sum / price[ i ].length ); // <-- calculate the average price and add it to the array
                        }

                        const chartData: ChartData = {
                            roomno: roomno,
                            prices: price,
                            avg: avg, // <-- add the array to the chartData object
                        };

                        setChart( chartData );
                        //console.log( chartData );
                        ///////////////////////////////////

                        fetch( "http://localhost:8080/rent/get", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            mode: "cors",
                        } ).then( ( response ) =>
                        {
                            if ( response.ok )
                            {
                                return response.json();
                            }
                        } ).then( ( data: any ) =>
                        {
                            setRents( data as Rent[] );
                            console.log( data );
                        }
                        ).catch( ( error ) => console.error( "Error fetching data", error ) );
                    }
                    ).catch( ( error ) => console.error( "Error fetching data", error ) );
                }
                ).catch( ( error ) => console.error( "Error fetching data", error ) );
            }
        }
        setLocation(location);
        setPrice(price);
        setType(type);
        setRoomNumber(roomNumber);
        setPropId(propId);
        setClientId(clientId);
    }, [ location, price, type, roomNumber, propId, clientId, users, props, rents ] );

    return (
        <AppBar style={ { background: '#8a2be2' } } position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><LocationLabel /></LocalizationWrapper>
                    </FormLabel>
                    <Input style={ { background: 'white', opacity: 0.5 } } value={ location } onChange={ handleLocation }></Input>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><PriceLabel /></LocalizationWrapper>
                    </FormLabel>
                    <Input style={ { background: 'white', opacity: 0.5 } } value={ price } onChange={ handlePrice }></Input>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><PropertyTypeLabel /></LocalizationWrapper>
                    </FormLabel>
                    <Select style={ { background: 'white', opacity: 0.5 } } value={ type ? { value: type } : '' } onChange={ handleType }>
                        <MenuItem value={ '' }></MenuItem>
                        <MenuItem value={ 'HOUSE' }>House</MenuItem>
                        <MenuItem value={ 'APARTMENT' }>Apartment</MenuItem>
                    </Select>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><RoomNumberLabel/></LocalizationWrapper>
                    </FormLabel>
                    <Input style={ { background: 'white', opacity: 0.5 } } value={ roomNumber } onChange={ handleRoomno }></Input>
                    <FormLabel style={ { color: 'white' } }>idprop</FormLabel><Input style={ { background: 'white', opacity: 0.5 } } value={ propId !== undefined ? propId : '' } onChange={ handleIdprop }></Input>
                    <FormLabel style={ { color: 'white' } }>idclient</FormLabel><Input style={ { background: 'white', opacity: 0.5 } } value={ clientId !== undefined ? clientId : '' } onChange={ handleIdclient }></Input>
                    <Button style={ { color: 'white' } } onClick={ handleAddprop }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><AddPropLabel /></LocalizationWrapper></Button>
                    <Button style={ { color: 'white' } } onClick={ handleUpdateProp }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><UpdatePropLabel /></LocalizationWrapper></Button>
                    <Button style={ { color: 'white' } } onClick={ handleDeleteProp }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><DeletePropLabel /></LocalizationWrapper></Button>
                    <Button style={ { color: 'white' } } onClick={ handleAddrent }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><AddRentLabel /></LocalizationWrapper></Button>
                    <Select style={ { background: 'white', opacity: 0.5 } } value={ save ? { value: save } : '' } onChange={ handleSave }>
                        <MenuItem value={ 'TXT' }>txt</MenuItem>
                        <MenuItem value={ 'CSV' }>csv</MenuItem>
                        <MenuItem value={ 'JSON' }>json</MenuItem>
                        <MenuItem value={ 'XML' }>xml</MenuItem>
                    </Select>
                    <Button style={ { color: 'white' } } onClick={ handleSaveText }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><SaveLabel /></LocalizationWrapper></Button>
                </Toolbar>
            </Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }>id prop</LocalizationWrapper></TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }>id client</LocalizationWrapper></TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }>date</LocalizationWrapper></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ( rents ).map( ( row: Rent, index: number ) =>
                    {
                        return (
                            <TableRow key={ index }>
                                <TableCell>{ row.id as number }</TableCell>
                                <TableCell>{ row.propId as number }</TableCell>
                                <TableCell>{ row.clientId as number }</TableCell>
                                <TableCell>{ row.date as string }</TableCell>
                            </TableRow>
                        );
                    } ) }
                </TableBody>
            </Table>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><UsernameLabel /></LocalizationWrapper></TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><RoleLabel /></LocalizationWrapper></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ( users ).map( ( row: AdminUser, index: number ) =>
                    {
                        return (
                            <TableRow key={ index }>
                                <TableCell>{ row.id as number }</TableCell>
                                <TableCell>{ row.username as string }</TableCell>
                                <TableCell>{ row.role as string }</TableCell>
                            </TableRow>
                        );
                    } ) }
                </TableBody>
            </Table>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><LocationLabel /></LocalizationWrapper></TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><PriceLabel /></LocalizationWrapper></TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><PropertyTypeLabel /></LocalizationWrapper></TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><RoomNumberLabel /></LocalizationWrapper></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ( props ).map( ( row: Data, index: number ) =>
                    {
                        return (
                            <TableRow key={ index }>
                                <TableCell>{ row.id as number }</TableCell>
                                <TableCell>{ row.location as string }</TableCell>
                                <TableCell>{ row.price as number }</TableCell>
                                <TableCell>{ row.type as string }</TableCell>
                                <TableCell>{ row.roomNumber as number }</TableCell>
                            </TableRow>
                        );
                    } ) }
                </TableBody>
            </Table>
            <MyChart prices={ chart?.avg ? chart.avg : [] } roomnumbers={ chart?.roomno ? chart.roomno : [] } />
        </AppBar >
    );
}
export default Employee;