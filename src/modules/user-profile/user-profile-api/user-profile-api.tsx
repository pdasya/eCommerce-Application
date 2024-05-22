// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { client } from '@config/constants';

// const UserContext = createContext<{
//   email: string;
//   firstName: string;
//   lastName: string;
// }>({
//   email: 'Loading...',
//   firstName: 'Loading...',
//   lastName: 'Loading...',
// });

// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [email, setEmail] = useState('Loading...');
//   const [firstName, setFirstName] = useState('Loading...');
//   const [lastName, setLastName] = useState('Loading...');

//   const fetchData = async () => {
//     try {
//       const response = await client.getClient().me().get().execute();
//       if (response.body) {
//         setEmail(response.body.email || 'Email not available');
//         setFirstName(response.body.firstName || 'First name not available');
//         setLastName(response.body.lastName || 'Last name not available');
//       }
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//       setEmail('Failed to load email');
//       setFirstName('Failed to load first name');
//       setLastName('Failed to load last name');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <UserContext.Provider value={{ email, firstName, lastName }}>{children}</UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
