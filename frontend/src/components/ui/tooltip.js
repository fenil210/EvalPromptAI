import React, { useState } from 'react';

const Tooltip = ({ children, content }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 bg-gray-700 text-white text-sm p-2 rounded">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
