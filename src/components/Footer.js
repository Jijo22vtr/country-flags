import React from 'react';
import { Button } from 'react-bootstrap';
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="mt-3 d-flex justify-content-center gap-3 mb-3">
      <Button variant="outline-secondary" size="sm">
        <FaGoogle />
      </Button>
      <Button variant="outline-secondary" size="sm">
        <FaFacebookF />
      </Button>
      <Button variant="outline-secondary" size="sm">
        <FaInstagram />
      </Button>
      <Button variant="outline-secondary" size="sm">
        <FaTwitter />
      </Button>
    </div>
  );
};

export default Footer;
