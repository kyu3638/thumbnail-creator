import React from 'react';
import { FaGithub } from 'react-icons/fa';

function Nav() {
  return (
    <div className="nav">
      <span>Thumbnail Creator</span>
      <a href="https://github.com/kyu3638/thumbnail-creator">
        <FaGithub />
      </a>
    </div>
  );
}

export default Nav;
