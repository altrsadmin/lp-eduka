import React from 'react';
import LandingPage from '../components/LandingPage';
import { THEMES } from '../data/themes';

export default function Home() {
    return <LandingPage content={THEMES.global} />;
}
