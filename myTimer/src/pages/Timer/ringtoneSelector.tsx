import React from 'react';
import './ringtoneSelector.css';  

interface RingtoneSelectorProps {
  ringtones: { [key: string]: string };
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RingtoneSelector: React.FC<RingtoneSelectorProps> = ({ ringtones, onChange }) => {
  const keys = Object.keys(ringtones);

  return (
    <div className="dropdown-container">
      <select className="dropdown" onChange={onChange} defaultValue="choose a ringtone...">
        <option  disabled  >
          choose a ringtone...
        </option>

        {keys.slice(0).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RingtoneSelector;
