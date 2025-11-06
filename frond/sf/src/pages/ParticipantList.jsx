// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const ParticipantList = () => {
//     const [participants, setParticipants] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [activeTab, setActiveTab] = useState('all');

//     useEffect(() => {
//         fetchParticipants();
//     }, []);

//     const fetchParticipants = async () => {
//         try {
//             const response = await axios.get('https://attendence-brl3.onrender.com/api/participants');
//             setParticipants(response.data);
//         } catch (error) {
//             console.error('Error fetching participants:', error);
//         }
//     };

//     const toggleAttendance = async (registernumber, currentStatus) => {
//         try {
//             const response = await axios.put(
//                 `https://attendence-brl3.onrender.com/api/participants/update/${registernumber}`,
//                 { present: !currentStatus }
//             );
//             if (response.data) {
//                 // Update the local state to reflect the change
//                 setParticipants(participants.map(p => 
//                     p.registernumber === registernumber 
//                         ? { ...p, present: !p.present }
//                         : p
//                 ));
//             }
//         } catch (error) {
//             console.error('Error updating attendance:', error);
//         }
//     };

//     const filteredParticipants = participants.filter(participant => {
//         const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             participant.registernumber.toLowerCase().includes(searchTerm.toLowerCase());
        
//         switch (activeTab) {
//             case 'present':
//                 return matchesSearch && participant.present;
//             case 'absent':
//                 return matchesSearch && !participant.present;
//             default:
//                 return matchesSearch;
//         }
//     });

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold text-center mb-8">Participants Management</h1>
            
//             {/* Search Bar */}
//             <div className="mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search by name or register number..."
//                     className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             {/* Tabs */}
//             <div className="flex space-x-4 mb-6">
//                 <button
//                     className={`px-4 py-2 rounded-lg ${activeTab === 'all' 
//                         ? 'bg-blue-500 text-white' 
//                         : 'bg-gray-200 text-gray-700'}`}
//                     onClick={() => setActiveTab('all')}
//                 >
//                     All ({participants.length})
//                 </button>
//                 <button
//                     className={`px-4 py-2 rounded-lg ${activeTab === 'present' 
//                         ? 'bg-green-500 text-white' 
//                         : 'bg-gray-200 text-gray-700'}`}
//                     onClick={() => setActiveTab('present')}
//                 >
//                     Present ({participants.filter(p => p.present).length})
//                 </button>
//                 <button
//                     className={`px-4 py-2 rounded-lg ${activeTab === 'absent' 
//                         ? 'bg-red-500 text-white' 
//                         : 'bg-gray-200 text-gray-700'}`}
//                     onClick={() => setActiveTab('absent')}
//                 >
//                     Absent ({participants.filter(p => !p.present).length})
//                 </button>
//             </div>

//             {/* Participants List */}
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Name
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Register Number
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Status
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Last Updated
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Actions
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredParticipants.map((participant) => (
//                             <tr key={participant._id}>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="text-sm font-medium text-gray-900">
//                                         {participant.name}
//                                     </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="text-sm text-gray-500">
//                                         {participant.registernumber}
//                                     </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                         participant.present 
//                                             ? 'bg-green-100 text-green-800' 
//                                             : 'bg-red-100 text-red-800'
//                                     }`}>
//                                         {participant.present ? 'Present' : 'Absent'}
//                                     </span>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {new Date(participant.updatedAt).toLocaleString()}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     <button
//                                         onClick={() => toggleAttendance(participant.registernumber, participant.present)}
//                                         className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${
//                                             participant.present
//                                                 ? 'bg-red-500 hover:bg-red-600'
//                                                 : 'bg-green-500 hover:bg-green-600'
//                                         }`}
//                                     >
//                                         Mark {participant.present ? 'Absent' : 'Present'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };


// export default ParticipantList;