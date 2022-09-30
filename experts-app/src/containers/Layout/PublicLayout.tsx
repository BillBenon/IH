import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import { LoginPage } from '../../pages/Login';

export const PublicLayout = () => <>
    <Switch>
        <Route exact path="/" component={LoginPage} />
    </Switch>
</>