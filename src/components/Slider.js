import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const slides = [
  { title: 'Slide One', body: 'This is the main slide', emoji: '🌄' },
  { title: 'Slide Two', body: 'Another awesome slide', emoji: '🏝️' },
  { title: 'Slide Three', body: 'More content here', emoji: '🏔️' }
];

const Slider=()=> {
  const [index, setIndex] = useState(0);
  const prev=()=> {
      setIndex(i => i > 0 ? i - 1 : i); 
    }

    const next=()=> {
      setIndex(i => i < slides.length - 1 ? i + 1 : i); 
    }

  return (
    <div className="d-flex flex-column flex-md-row gap-3">
      <Card className="flex-grow-1 p-3">
        <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: 72 }}>{slides[index].emoji}</div>
          <h5>{slides[index].title}</h5>
          <p>{slides[index].body}</p>
          <div className="d-flex align-items-center gap-2 mt-2">
            <Button 
              variant="outline-dark" 
              size="sm" 
              onClick={prev} 
              disabled={index===0}
            >&larr;</Button>
            <div>
              {slides.map((_, i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  width: 8, height: 8, borderRadius: '50%', margin: '0 6px',
                  background: i === index ? '#333' : '#ccc'
                }} />
              ))}
            </div>
            <Button 
              variant="outline-dark" 
              size="sm" 
              onClick={next}
              disabled={index === slides.length-1}
            >&rarr;</Button>
          </div>
        </div>
      </Card>

      <Card style={{ width: 220, padding: 12 }}>
        <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: 48 }}>{slides[index].emoji}</div>
          <div style={{ marginTop: 8 }}>{slides[index].title}</div>
        </div>
      </Card>

    </div>
  );
}

export default Slider;
