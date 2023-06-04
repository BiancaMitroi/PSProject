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
import { ChangeEventHandler } from 'react';

import UsernameLabel from '../../components/labels/UsernameLabel';
import PasswordLabel from '../../components/labels/PasswordLabel';
import RoleLabel from '../../components/labels/RoleLabel';
import AddUserLabel from '../../components/labels/AddUserLabel';
import DeleteUserLabel from '../../components/labels/DeleteUserLabel';
import UpdateUserLabel from '../../components/labels/UpdateUser';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Navigate, useNavigate } from 'react-router-dom';

import ApexCharts from "apexcharts";
import MailLabel from "../../components/labels/MailLabel";
import PhoneLabel from "../../components/labels/PhoneLabel";
import FilterLabel from "../../components/labels/FilterLabel";

let first = true;

interface Data
{
    location: string;
    price: number;
    type: string;
    roomNumber: number;
}

interface AdminUser
{
    id: number;
    username: string;
    mail: string;
    phone: string;
    password: string;
    role: string;
}

function Admin ()
{

    const [ username, setUsername ] = useState<string>();
    const [ mail, setMail ] = useState<string>();
    const [ phone, setPhone ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ role, setRole ] = useState<string>();
    const [ id, setId ] = useState<number>();

    const handleUsername = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setUsername( event.currentTarget.value.toString() );
    }

    const handleMail = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setMail( event.currentTarget.value.toString() );
    }

    const handlePhone = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setPhone( event.currentTarget.value.toString() );
    }

    const handleRole = ( event: SelectChangeEvent<{ value: string }> ) =>
    {
        setRole( event.target.value.toString() );
    }

    const handlePassword = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setPassword( event.currentTarget.value.toString() );
    }

    const handleId = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setId( Number( event.currentTarget.value ) );
    }

    const [ users, setUsers ] = useState<AdminUser[]>( [] );

    const handleRegister = ( event: { preventDefault: () => void } ) =>
    {
        event.preventDefault();
        fetch( "http://localhost:8080/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { username, mail, phone, password, role } ),
        } )
            .then( ( response ) =>
            {
                if ( response.ok ) return response.json();
            } )
            .then( ( data ) =>
            {
                fetch( "http://localhost:8080/user/get", {
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
                    // console.log( data );
                }
                ).catch( ( error ) => console.error( "Error fetching data", error ) );
            } )
            .catch( ( error ) => console.error( error ) );

    };

    const handleUpdateUser = ( event: { preventDefault: () => void } ) =>
    {
        event.preventDefault();

        const updateUser = { username, mail, phone, password, role }; // Assuming you have defined these variables

        fetch( `http://localhost:8080/user/edit/${ id }`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( updateUser ),
        } )
            .then( ( response ) =>
            {
                if ( response.ok ) return response.json();
            } )
            .then( ( data ) =>
            {
                console.log( "User updated successfully:", data );

                // After updating the user, you can fetch the updated user list if needed
                fetch( "http://localhost:8080/user/get", {
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
                        setUsers( data as AdminUser[] );
                        console.log( "Updated user list:", data );
                    } )
                    .catch( ( error ) => console.error( "Error fetching data", error ) );
            } )
            .catch( ( error ) => console.error( error ) );
    }


    const handleFilter = () =>
    {
        fetch(
          `http://localhost:8080/user/get`,
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
              const filtered: AdminUser[] = data;
              setUsers( filtered
                .filter( ( d, i, filtered ) => ( d.role === ( role ? role : '' ) || ( role === '' ) ) ));

          } )
          .catch( ( error ) => console.error( "Error fetching data", error ) );
    };

    const handleDeleteUser = ( event: { preventDefault: () => void } ) =>
    {
        event.preventDefault();

        fetch( `http://localhost:8080/user/delete/${ id }`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
        } )
            .then( () =>
            {
                // After updating the user, you can fetch the updated user list if needed
                fetch( "http://localhost:8080/user/get", {
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
                        setUsers( data as AdminUser[] );
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

    const locales = [
        "ro-RO",
        "en-US",
        "fr-FR",
    ]

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
            if ( localStorage.getItem( 'logged' ) != 'ADMIN' )
                navigate( "/login" );
            else
            {
                localStorage.removeItem( 'logged' );
                first = false;
                fetch( "http://localhost:8080/user/get", {
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
                    // console.log( data );
                }
                ).catch( ( error ) => console.error( "Error fetching data", error ) );
            }
        }
    }, [ username, mail, phone, password, role, id, users ] );

    return (
        <AppBar style={ { background: '#8a2be2' } } position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><UsernameLabel /></LocalizationWrapper>
                    </FormLabel>
                    <Input style={ { background: 'white', opacity: 0.5 } } value={ username ? username : '' } onChange={ handleUsername }></Input>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><MailLabel /></LocalizationWrapper>
                    </FormLabel>
                    <Input style={ { background: 'white', opacity: 0.5 } } value={ mail ? mail : '' } onChange={ handleMail }></Input>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><PhoneLabel /></LocalizationWrapper>
                    </FormLabel>
                    <Input style={ { background: 'white', opacity: 0.5 } } value={ phone ? phone : '' } onChange={ handlePhone }></Input>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><PasswordLabel /></LocalizationWrapper>
                    </FormLabel>
                    <input type="password" style={ { background: 'white', opacity: 0.5 } } value={ password ? password : '' } onChange={ handlePassword }></input>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><RoleLabel /></LocalizationWrapper>
                    </FormLabel>
                    <Select style={ { background: 'white', opacity: 0.5 } } value={ role ? { value: role } : '' } onChange={ handleRole }>
                        <MenuItem value={ 'NONE' }></MenuItem>
                        <MenuItem value={ 'EMPLOYEE' }>Employee</MenuItem>
                        <MenuItem value={ 'ADMIN' }>Admin</MenuItem>
                        <MenuItem value={ 'CLIENT' }>Client</MenuItem>
                    </Select>
                    <FormLabel style={ { color: 'white' } }>id</FormLabel><Input style={ { background: 'white', opacity: 0.5 } } value={ id !== undefined ? id : '' } onChange={ handleId }></Input>
                    <Button style={ { color: 'white' } } onClick={ handleRegister }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><AddUserLabel /></LocalizationWrapper></Button>
                    <Button style={ { color: 'white' } } onClick={ handleUpdateUser }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><UpdateUserLabel /></LocalizationWrapper></Button>
                    <Button style={ { color: 'white' } } onClick={ handleDeleteUser }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><DeleteUserLabel /></LocalizationWrapper></Button>
                    <Button style={ { color: 'white' } } onClick={ handleFilter }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string } ><FilterLabel /></LocalizationWrapper></Button>
                </Toolbar>
            </Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><UsernameLabel /></LocalizationWrapper></TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><MailLabel /></LocalizationWrapper></TableCell>
                        <TableCell><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><PhoneLabel /></LocalizationWrapper></TableCell>
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
                                <TableCell>{ row.mail as string }</TableCell>
                                <TableCell>{ row.phone as string }</TableCell>
                                <TableCell>{ row.role as string }</TableCell>
                            </TableRow>
                        );
                    } ) }
                </TableBody>
            </Table>
        </AppBar >
    );
}
export default Admin;