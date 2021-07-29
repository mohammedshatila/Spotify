import React from 'react'
import { Icon, InlineIcon } from '@iconify/react';
import spotifyIcon from '@iconify-icons/mdi/spotify';

import {Container} from 'react-bootstrap'
const AUTH_URL="https://accounts.spotify.com/authorize?client_id=eda2b5037f9f4994a6b789ec90faf7f4&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return  <Container className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
        <a className="btn btn-light btn-lg btn-outline-secondary button" href={AUTH_URL}>Login <Icon icon={spotifyIcon} color="green" height="40" className="Icon"/></a>
    </Container>
}
