import { useState, useEffect } from 'react';
import axios from 'axios';

const Timeline = () => {
    const [participants, setParticipants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchParticipants();
    }, []);

    const fetchParticipants = async () => {
        try {
            const response = await axios.get('https://attendence-brl3.onrender.com/api/participants');
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const filteredParticipants = participants.filter(participant => 
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.registernumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Attendance Timeline</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or register number..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Timeline */}
            <div className="space-y-8">
                {filteredParticipants.map((participant) => (
                    <div key={participant._id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {participant.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {participant.registernumber}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                participant.present 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {participant.present ? 'Present' : 'Absent'}
                            </span>
                        </div>
                        
                        <div className="border-t pt-4">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Last Updated:</span>
                                <time>{new Date(participant.updatedAt).toLocaleString()}</time>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                <span>Created:</span>
                                <time>{new Date(participant.createdAt).toLocaleString()}</time>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredParticipants.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No participants found
                </div>
            )}
        </div>
    );
};

export default Timeline;