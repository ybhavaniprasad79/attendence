import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import React from 'react'
// const Home = () => {
//     const [scanResult, setScanResult] = useState(null);
//     const [message, setMessage] = useState('');
//     const [scannerInitialized, setScannerInitialized] = useState(false);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (!scannerInitialized) {
//             // Calculate qrbox size based on screen width
//             const screenWidth = window.innerWidth;
//             const qrboxSize = Math.min(screenWidth * 0.7, 250); // 70% of screen width up to 250px

//             const scanner = new Html5QrcodeScanner('reader', {
//                 qrbox: { 
//                     width: qrboxSize,
//                     height: qrboxSize,
//                 },
//                 fps: 5,
//                 rememberLastUsedCamera: true,
//                 aspectRatio: 1,
//                 showTorchButtonIfSupported: true,
//             });

//             scanner.render(onScanSuccess, onScanError);
//             setScannerInitialized(true);

//             // Cleanup function
//             return () => {
//                 scanner.clear();
//             };
//         }
//     }, [scannerInitialized]);

//     const onScanSuccess = async (registernumber) => {
//         setScanResult(registernumber);
//         setLoading(true);
        
//         try {
//             // First, check if the participant exists
//             const checkResponse = await axios.get(`https://attendence-brl3.onrender.com/api/participants/${registernumber}`);
            
//             if (checkResponse.data) {
//                 // Update the present status
//                 const updateResponse = await axios.put(
//                     `https://attendence-brl3.onrender.com/api/participants/update/${registernumber}`,
//                     { present: true }
//                 );
                
//                 if (updateResponse.data) {
//                     setMessage(`${updateResponse.data.name} marked as present!`);
//                     // Clear the success message after 3 seconds
//                     setTimeout(() => setMessage(''), 3000);
//                 }
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 setMessage('Participant not found. Please register first.');
//             } else {
//                 setMessage('Error updating attendance. Please try again.');
//             }
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const onScanError = (err) => {
//         console.warn(err);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md mx-auto">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                         Attendance Scanner
//                     </h1>
//                     <p className="text-gray-600">
//                         Scan QR code or barcode to mark attendance
//                     </p>
//                 </div>
                
//                 {/* Scanner Element */}
//                 <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
//                     <div id="reader" className="overflow-hidden rounded-lg"></div>
//                 </div>
                
//                 {/* Results Display */}
//                 <div className="space-y-4">
//                     {loading && (
//                         <div className="flex justify-center items-center py-4">
//                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                         </div>
//                     )}
                    
//                     {scanResult && (
//                         <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
//                             <h2 className="text-sm font-medium text-gray-600">Last Scanned</h2>
//                             <p className="text-lg font-semibold text-gray-900">
//                                 {scanResult}
//                             </p>
//                         </div>
//                     )}
                    
//                     {message && (
//                         <div className={`p-4 rounded-lg shadow ${
//                             message.includes('Error') 
//                                 ? 'bg-red-50 border border-red-200 text-red-700'
//                                 : 'bg-green-50 border border-green-200 text-green-700'
//                         }`}>
//                             <p className="font-medium text-center">{message}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

<>

<h1>hibguvycfrtdxyfcugviyh</h1>
</>

export default Home;
