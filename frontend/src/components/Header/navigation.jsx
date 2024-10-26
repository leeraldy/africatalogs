import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';

const Navigation = ({ nav__links__options }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuOptionRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    console.log(nav__links__options)

    console.log(isMenuOpen)

    return (
        <div className="navigation" ref={menuOptionRef}>
            <button onClick={toggleMenu} className="menu-toggle">
                Create a catalog
            </button>
            {isMenuOpen && (
                <ul className="dropdown-menu">
                    {nav__links__options.map((item, index) => (
                        <li className="nav__item" key={index}>
                            <NavLink
                                to={item.path}
                                className={navClass => 
                                    navClass.isActive ? "active__link" : ""
                                }
                                onClick={toggleMenu}
                            >
                                {item.display}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Navigation;
