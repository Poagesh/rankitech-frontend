// src/services/api.js

export const loginUser = async (email, password) => {
  // Replace this with actual fetch/axios call
  console.log('Logging in:', { email, password });
  return { success: true, role: 'user' }; // or 'recruiter'/'admin'
};

export const registerUser = async (data) => {
  console.log('Registering user:', data);
  return { success: true };
};

export const postJob = async (jobData) => {
  console.log('Posting job:', jobData);
  return { success: true };
};

export const fetchTopMatches = async (jobData) => {
  return [
    {
      name: 'Monish Soorya',
      score: 91,
      experience: '3 years',
      skills: 'React, Python',
    },
    {
      name: 'Priya Ramesh',
      score: 86,
      experience: '2 years',
      skills: 'Node, ML',
    },
    {
      name: 'Arjun V.',
      score: 81,
      experience: '2.5 years',
      skills: 'Flask, SQL',
    },
  ];
};

export const fetchUsers = async () => {
  return [
    { id: 1, name: 'Monish Soorya', email: 'monish@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'Priya', email: 'priya@hire.com', role: 'recruiter', status: 'active' },
  ];
};
