import React from 'react';
import Menu from "./NavBar";


export const Header = () => {
    return (
        <div>
            <Home />
            <Work />
            <Study />
        </div>
    );
};

export const Home = () => {
    return (
        <div style={{backgroundColor: 'brown'}}>
            <h1> Home</h1>
        </div>
    );
}

export const Work = () => {
    return (
        <div style={{backgroundColor: 'gold'}}>
            <h1>Work</h1>
        </div>
    );
}

export const Study = () => {
    return (
        <div style={{backgroundColor: 'magenta'}}>
            <h1>Study</h1>
        </div>
    );
}

