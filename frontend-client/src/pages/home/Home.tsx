import './Home.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { FormLabel, Input, Select, SelectChangeEvent } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
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
import AuthenticateLabel from '../../components/labels/AuthenticateLabel';
import SetLanguageLabel from '../../components/labels/SetLanguageLabel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Data
{
  location: string;
  price: number;
  type: string;
  roomNumber: number;
}



function Home ()
{

  const [ propertyLocation, setLocation ] = useState<string>( '' );
  const [ propertyPrice, setPrice ] = useState<string>( '' );
  const [ propertyType, setType ] = useState<string>( '' );
  const [ propertyRoomNumber, setRoomNumber ] = useState<number>( 0 );

  const handleLocation = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
  {
    setLocation( event.currentTarget.value.toString() );
  }

  const handlePrice = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
  {
    setPrice( event.currentTarget.value.toString() );
  }

  const handleType = ( event: SelectChangeEvent<{ value: string }> ) =>
  {
    setType( event.target.value.toString() );
  }

  const handleRoomNumber = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
  {
    setRoomNumber( Number( event.currentTarget.value ) );
  }

  const handleFilter = () =>
  {
    fetch(
      `http://localhost:8080/property/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then( ( response ) =>
      {
        if ( response.ok )
        {
          return response.json();
        }
      } )
      .then( ( data: any ) =>
      {
        //console.log( "Response body:", data );
        const filtered: Data[] = data;
        setDates( filtered
          .filter( ( d, i, filtered ) => ( d.location === ( propertyLocation ? propertyLocation : '' ) || ( propertyLocation === '' ) ) )
          .filter( ( d, i, filtered ) => ( d.price === ( propertyPrice ? Number( propertyPrice ) : 0 ) || ( propertyPrice === '' ) ) )
          .filter( ( d, i, filtered ) => ( d.type === ( propertyType ? propertyType : '' ) || ( propertyType === '' ) ) )
          .filter( ( d, i, filtered ) => ( d.roomNumber === ( propertyRoomNumber ? propertyRoomNumber : 0 ) || ( propertyRoomNumber === 0 ) ) ) );

      } )
      .catch( ( error ) => console.error( "Error fetching data", error ) );
  };

  const [ locale, setLocale ] = useState<"" | number | undefined>( 1 );

  type LocalizationWrapperProps = {
    locale: number;
    children: React.ReactNode;
  };

  const locales = [
    "ro-RO",
    "en-US",
    "fr-FR",
  ]

  const messages = [
    romana,
    english,
    francais,
  ];

  const LocalizationWrapper: React.FC<LocalizationWrapperProps> = ( { children, locale } ) =>
  {

    return (
      <IntlProvider locale={ locales[ Number( locale ) ] } messages={ messages[ Number( locale ) ] }>
        { children }
      </IntlProvider>
    );
  };

  useEffect( () =>
  {
    localStorage.removeItem( 'language' );
    localStorage.setItem( 'language', locales[ Number( locale ) ] );
    setLocation(propertyLocation);
    console.log(propertyLocation);
    fetch(
      `http://localhost:8080/property/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then( ( response ) =>
      {
        if ( response.ok )
        {
          return response.json();
        }
      } )
      .then( ( data: any ) =>
      {
        //console.log( "Response body:", data );
        let filtered: Data[] = data;
        setDates( filtered
          .filter( ( d, i, filtered ) => ( d.location === ( propertyLocation ? propertyLocation : '' ) || ( propertyLocation === '' ) ) )
          .filter( ( d, i, filtered ) => ( d.price === ( propertyPrice ? Number( propertyPrice ) : 0 ) || ( propertyPrice === '' ) ) )
          .filter( ( d, i, filtered ) => ( d.type === ( propertyType ? propertyType : '' ) || ( propertyType === '' ) ) )
          .filter( ( d, i, filtered ) => ( d.roomNumber === ( propertyRoomNumber ? propertyRoomNumber : 0 ) || ( propertyRoomNumber === 0 ) ) ) );
        /////////////////////////////////

        //console.log( chartData );
        ///////////////////////////////////
      } )
      .catch( ( error ) => console.error( "Error fetching data", error ) );

  }, [ locale, propertyType, propertyLocation, propertyPrice, propertyRoomNumber ] );

  const handleChangeLanguage = ( event: SelectChangeEvent<{ value: number }> ) =>
  {
    setLocale( Number( event.target.value ) );
    localStorage.setItem( 'language', locales[ Number( locale ) ] )
  }

  const [ dates, setDates ] = useState<Data[]>( [] );

  return (
    <AppBar style={ { background: '#8a2be2' } } position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FormLabel style={ { color: 'white' } }>
            <LocalizationWrapper locale={ locale as number }><LocationLabel /></LocalizationWrapper>
          </FormLabel>
          <Input style={ { background: 'white', opacity: 0.5 } } value={ propertyLocation } onChange={ handleLocation }></Input>
          <FormLabel style={ { color: 'white' } }>
            <LocalizationWrapper locale={ locale as number }><PriceLabel /></LocalizationWrapper>
          </FormLabel>
          <Input style={ { background: 'white', opacity: 0.5 } } value={ propertyPrice } onChange={ handlePrice }></Input>
          <FormLabel style={ { color: 'white' } }>
            <LocalizationWrapper locale={ locale as number }><PropertyTypeLabel /></LocalizationWrapper>
          </FormLabel>
          <Select style={ { background: 'white', opacity: 0.5 } } value={ propertyType ? { value: propertyType } : '' } onChange={ handleType }>
            <MenuItem value={ 'HOUSE' }>House</MenuItem>
            <MenuItem value={ 'APARTMENT' }>Apartment</MenuItem>
            <MenuItem value={ '' }></MenuItem>
          </Select>
          <FormLabel style={ { color: 'white' } }>
            <LocalizationWrapper locale={ locale as number }><RoomNumberLabel /></LocalizationWrapper>
          </FormLabel>
          <Input style={ { background: 'white', opacity: 0.5 } } value={ propertyRoomNumber } onChange={ handleRoomNumber }></Input>
          {/* <Button style={ { color: 'white' } } onClick={ handleFilter }><LocalizationWrapper locale={ locale as number }><FilterLabel /></LocalizationWrapper></Button> */ }
          <Outlet /><Link to='/login'><Button style={ { color: 'white' } }><LocalizationWrapper locale={ locale as number }><AuthenticateLabel /></LocalizationWrapper></Button></Link>
          <Button style={ { color: 'white' } }><LocalizationWrapper locale={ locale as number }><SetLanguageLabel /></LocalizationWrapper></Button>
          <Select
            value={ locale ? { value: locale } : '' }
            style={ { background: 'white', opacity: 0.5 } }
            onChange={ handleChangeLanguage }
          >
            <MenuItem value={ 0 }>Romana</MenuItem>
            <MenuItem value={ 1 }>English</MenuItem>
            <MenuItem value={ 2 }>Francais</MenuItem>

          </Select>
        </Toolbar>
      </Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><LocalizationWrapper locale={ locale as number }><LocationLabel /></LocalizationWrapper></TableCell>
            <TableCell><LocalizationWrapper locale={ locale as number }><PriceLabel /></LocalizationWrapper></TableCell>
            <TableCell><LocalizationWrapper locale={ locale as number }><PropertyTypeLabel /></LocalizationWrapper></TableCell>
            <TableCell><LocalizationWrapper locale={ locale as number }><RoomNumberLabel /></LocalizationWrapper></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { ( dates ).map( ( row: Data, index: number ) =>
          {
            return (
              <TableRow key={ index }>

                <TableCell>{ row.location as string }</TableCell>
                <TableCell>{ row.price as number }</TableCell>
                <TableCell>{ row.type as string }</TableCell>
                <TableCell>{ row.roomNumber as number }</TableCell>
              </TableRow>
            );
          } ) }
        </TableBody>
      </Table>

    </AppBar >
  );
}
export default Home;