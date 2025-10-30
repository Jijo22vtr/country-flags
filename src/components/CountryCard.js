import React from 'react';
import { Card } from 'react-bootstrap';

const CountryCard=({ name, region, flag })=> {
  return (
    <Card className="p-2" style={{ border: '1px solid #ccc' }}>
      <div className="d-flex align-items-center gap-3">
        <img src={flag} alt={`${name} flag`} style={{ width: 72, height: 48, objectFit: 'cover', border: '1px solid #ddd' }} />
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{region}</div>
        </div>
      </div>
    </Card>
  );
}

export default CountryCard;