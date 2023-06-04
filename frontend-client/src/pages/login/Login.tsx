import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { FormLabel, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import romana from '../../languages/romana.json'
import english from '../../languages/english.json'
import francais from '../../languages/francais.json'
import { IntlProvider } from 'react-intl';
import { Navigate, useNavigate } from 'react-router-dom';

import UsernameLabel from '../../components/labels/UsernameLabel';
import PasswordLabel from '../../components/labels/PasswordLabel';
import LoginLabel from '../../components/labels/LoginLabel';

function Login ()
{
    // console.log( localStorage.length );

    const [ username, setUsername ] = useState<string>( '' );
    const [ password, setPassword ] = useState<string>( '' );

    const handleUsername = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setUsername( event.currentTarget.value.toString() );
    }

    const handlePassword = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) =>
    {
        setPassword( event.currentTarget.value.toString() );
    }

    const navigate = useNavigate();

    const handleLogin = ( event: { preventDefault: () => void } ) =>
    {
        event.preventDefault();
        fetch( "http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { username, password } ),
        } )
            .then( ( response ) =>
            {
                if ( response.ok ) return response.json();
            } )
            .then( ( data ) =>
            {
                console.log( data );
                const role = data.role as string;
                if ( role === "EMPLOYEE" )
                {
                    localStorage.setItem( 'logged', 'EMPLOYEE' );
                    navigate( "/employee" );
                }
                else if ( role === "ADMIN" )
                {
                    localStorage.setItem( 'logged', 'ADMIN' );
                    navigate( "/admin" );
                }
            } )
            .catch( ( error ) => console.error( error ) );
    };

    type LocalizationWrapperProps = {
        locale: string;
        children: React.ReactNode;
    };

    const messages = {
        'ro-RO': romana,
        'en-US': english,
        'fr-FR': francais
    };

    const LocalizationWrapper: React.FC<LocalizationWrapperProps> = ( { children, locale } ) =>
    {
        // console.log( localStorage.getItem( 'language' ) );

        return (
            <IntlProvider locale={ locale } messages={ messages[ locale as keyof typeof messages ] }>
                { children }
            </IntlProvider>
        );
    };

    return (
        <AppBar style={ { background: 'palevioletred' } } position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><UsernameLabel /></LocalizationWrapper>
                    </FormLabel>
                    <Input style={ { background: 'white', opacity: 0.5 } } value={ username } onChange={ handleUsername }></Input>
                    <FormLabel style={ { color: 'white' } }>
                        <LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><PasswordLabel /></LocalizationWrapper>
                    </FormLabel>
                    <input type="password" style={ { background: 'white', opacity: 0.5 } } value={ password } onChange={ handlePassword }></input>
                    <Button style={ { color: 'white' } } onClick={ handleLogin }><LocalizationWrapper locale={ localStorage.getItem( 'language' ) as string }><LoginLabel /></LocalizationWrapper></Button>

                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Login;