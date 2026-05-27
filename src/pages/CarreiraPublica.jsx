import React from 'react';
import LandingPage from '../components/LandingPage';
import { THEMES } from '../data/themes';

export default function CarreiraPublica() {
    return <LandingPage content={THEMES.publica} />;
}
