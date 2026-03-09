import React from 'react';
import './RotateObject.css';
import imageSrc from '../assets/loading.png'; // Шлях до вашого зображення

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <img className="rotating-object" src={imageSrc} alt="Опис зображення" />
            </div>
        );
    }
}

export default App;
