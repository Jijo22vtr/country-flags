import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../features/countriesSlice';
import Slider from './Slider';
import CountryCard from './CountryCard';
import Footer from './Footer';
import Header from './Header';
import { Dropdown } from "react-bootstrap";
import { List } from "react-bootstrap-icons";


const Home=()=> {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector(s => s.countries);
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8); 

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCountries());
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    if (!list) return [];
    if (filter === 'All') return list;
    return list.filter(c => (c.region || '').toLowerCase() === filter.toLowerCase());
  }, [list, filter]);

  const  loadMore=()=> {
    setVisibleCount(prev => prev + 8);
  }

  return (
    <>
      <Header />
      <Container style={{ maxWidth: 1000, marginTop: 20 }}>
        <Row className="mb-2">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              
              <strong>Countries</strong>

              {/* Desktop Tabs */}
              <div className="d-none d-md-flex gap-3">
                {['All', 'Asia', 'Europe'].map(item => (
                  <span
                    key={item}
                    onClick={() => { setFilter(item); setVisibleCount(8); }}
                    style={{
                      cursor: 'pointer',
                      fontWeight: filter === item ? '600' : '400',
                      borderBottom: filter === item ? '2px solid #000' : '2px solid transparent',
                      paddingBottom: '4px'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Mobile Dropdown */}
              <div className="d-md-none">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-dark"
                    size="sm"
                    style={{ borderRadius: "4px" }}
                  >
                    <List size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {['All', 'Asia', 'Europe'].map(item => (
                      <Dropdown.Item
                        key={item}
                        onClick={() => { setFilter(item); setVisibleCount(8); }}
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

            </div>
          </Col>
        </Row>

        <Row className="align-items-center my-3">
          <Col className="d-none d-md-block">
            <hr style={{ borderTop: "3px solid black" }} />
          </Col>

          <Col xs={12} md="auto" className="text-center">
            <div className="d-block d-md-none mb-2">
              <hr style={{ borderTop: "3px solid black" }} />
            </div>
            <h3>WELCOME</h3>
          </Col>

          <Col className="d-none d-md-block">
            <hr style={{ borderTop: "3px solid black" }} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Slider />
          </Col>
        </Row>

        <Row className="mt-3 g-3">
          {status === 'loading' && (
            <div className="d-flex justify-content-center w-100 py-5">
              <Spinner animation="border" />
            </div>
          )}

          {status === 'succeeded' && filtered.slice(0, visibleCount).map((c, idx) => (
            <Col xs={12} md={6} key={c.name + idx}>
              <CountryCard name={c.name} region={c.region} flag={c.flag} />
            </Col>
          ))}

          {status === 'succeeded' && filtered.length === 0 && (
            <div className="text-center w-100">No countries found</div>
          )}

          {status === 'failed' && (
            <div className="text-danger">{error}</div>
          )}
        </Row>

        {status === 'succeeded' && visibleCount < filtered.length && (
          <div className="d-flex justify-content-center my-4">
            <Button variant="dark" onClick={loadMore}>Load more</Button>
          </div>
        )}

      </Container>

      <footer className="text-center py-4">
        <Footer/>
        <div>Example@example.com</div>
        <div>Copyright @ 2020 Name. All Rights Reserved</div>
      </footer>
    </>
  );
}

export default Home;
