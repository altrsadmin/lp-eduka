import React from 'react';
import LandingPage from '../components/LandingPage';
import { THEMES } from '../data/themes';

export default function CarreiraPrivada() {
    return <LandingPage content={THEMES.privada} />;
}
