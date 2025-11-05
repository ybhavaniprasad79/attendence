import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
    const [scanResult, setScanResult] = useState(null);
    const [message, setMessage] = useState('');
    const [scannerInitialized, setScannerInitialized] = useState(false);

    useEffect(() => {
        if (!scannerInitialized) {
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            });

            scanner.render(onScanSuccess, onScanError);
            setScannerInitialized(true);

            // Cleanup function
            return () => {
                scanner.clear();
            };
        }
    }, [scannerInitialized]);

    const onScanSuccess = async (registernumber) => {
        setScanResult(registernumber);
        
        try {
            // First, check if the participant exists
            const checkResponse = await axios.get(`http://localhost:3000/api/participants/${registernumber}`);
            
            if (checkResponse.data) {
                // Update the present status
                const updateResponse = await axios.put(
                    `http://localhost:3000/api/participants/update/${registernumber}`,
                    { present: true }
                );
                
                if (updateResponse.data) {
                    setMessage(`${updateResponse.data.name} marked as present!`);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage('Participant not found. Please register first.');
            } else {
                setMessage('Error updating attendance. Please try again.');
            }
            console.error('Error:', error);
        }
    };

    const onScanError = (err) => {
        console.warn(err);
    };

    return (
        <div className="scanner-container">
            <h1>Attendance Scanner</h1>
            
            {/* Scanner Element */}
            <div id="reader"></div>
            
            {/* Results Display */}
            <div className="results-container">
                {scanResult && (
                    <div className="scan-result">
                        <p>Register Number: {scanResult}</p>
                    </div>
                )}
                
                {message && (
                    <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
