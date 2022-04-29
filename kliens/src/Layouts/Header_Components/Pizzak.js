import React from "react";

function Pizzak() {
  return (
    <li className="nav-item dropdown">
      <div
        className="nav-link dropdown-toggle"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Pizzák
      </div>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <a className="dropdown-item" href="/pizza">
            Sima pizzák
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/tpizza">
            Töltött peremű pizzák
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/lpizza">
            Laktózmentes pizzák
          </a>
        </li>
      </ul>
    </li>
  );
}

export default Pizzak;
