import React from "react";

function Italok() {
  return (
    <li className="nav-item dropdown">
      <div
        className="nav-link dropdown-toggle"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Italok
      </div>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <a className="dropdown-item" href="/udeto">
            Üdítők
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/edrink">
            Energiaitalok
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/sor">
            Sörök
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/asor">
            Alkoholmentes sörök
          </a>
        </li>
      </ul>
    </li>
  );
}

export default Italok;
