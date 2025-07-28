import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ backgroundColor: '#eee', borderRadius: '5px', height: '20px', width: '100%' }}>
      <div style={{ width: `${progress}%`, backgroundColor: '#4caf50', height: '100%', borderRadius: '5px' }} />
    </div>
  );
};

export default ProgressBar;
