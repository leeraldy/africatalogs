import React, { useRef, useState, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import logo1 from "../../assets/images/analytikas.png";
import "./header.css";

import { AuthContext } from "../../context/AuthContext";

const models = [
  { type: "restaurant", path: "/create/restaurant", displayName: "RESTAURANTS" },
  { type: "pharmacie", path: "/create/pharmacie", displayName: "PHARMACIES" },
  { type: "cafe", path: "/create/cafe", displayName: "CAFES" },
  { type: "hotel", path: "/create/hotel", displayName: "HOTELS" },
  { type: "travelagencie", path: "/create/travelagencie", displayName: "TRAVEL AGENCIES" },
];

const nav__links = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <Link to="/home" style={{ textDecoration: "none" }}>
              <div className="logo">
                <img src={logo1} alt="Africatalogs logo" style={{ width: "40px" }} />
              </div>
            </Link>

            {/* Menu Links */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => (navClass.isActive ? "active__link" : "")}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side (Profile, Dropdown, etc.) */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    {/* User profile link */}
                    <h5
                      className="mb-0"
                      onClick={() => navigate("/profile")}
                      style={{ cursor: "pointer" }}
                    >
                      {user.username}
                    </h5>

                    {/* Create Catalog Dropdown */}
                    <div className="dropdown">
                      <Button className="btn primary__btn" onClick={toggleDropdown}>
                        Create a Catalog
                      </Button>
                      {isDropdownOpen && (
                        <ul className="dropdown-menu show">
                          {models.map((model, index) => (
                            <li className="nav__item" key={index}>
                              <NavLink
                                to={model.path}
                                className={(navClass) => (navClass.isActive ? "active__link" : "")}
                                onClick={toggleDropdown}
                              >
                                {model.displayName}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Logout button */}
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;


// import React, { useRef, useState, useContext } from "react";
// import { Container, Row, Button } from "reactstrap";
// import { NavLink, Link, useNavigate } from "react-router-dom";

// import logo1 from "../../assets/images/analytikas.png";
// import "./header.css";

// import { AuthContext } from "../../context/AuthContext";

// const models = [
//   { type: "restaurant", path: "/create/restaurant", displayName: "RESTAURANTS" },
//   { type: "pharmacie", path: "/create/pharmacie", displayName: "PHARMACIES" },
//   { type: "cafe", path: "/create/cafe", displayName: "CAFES" },
//   { type: "hotel", path: "/create/hotel", displayName: "HOTELS" },
//   { type: "travelagencie", path: "/create/travelagencie", displayName: "TRAVEL AGENCIES" },
// ];

// const nav__links = [
//   { path: "/home", display: "Home" },
//   { path: "/about", display: "About" },
// ];

// const Header = () => {
//   const headerRef = useRef(null);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();
//   const { user, dispatch } = useContext(AuthContext);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const logout = () => {
//     dispatch({ type: "LOGOUT" });
//     navigate("/");
//   };

//   const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//   return (
//     <header className="header" ref={headerRef}>
//       <Container>
//         <Row>
//           <div className="nav_wrapper d-flex align-items-center justify-content-between">
//             {/* Logo */}
//             <Link to="/home" style={{ textDecoration: "none" }}>
//               <div className="logo">
//                 <img src={logo1} alt="Africatalogs logo" style={{ width: "40px" }} />
//               </div>
//             </Link>

//             {/* Menu Links */}
//             <div className="navigation" ref={menuRef} onClick={toggleMenu}>
//               <ul className="menu d-flex align-items-center gap-5">
//                 {nav__links.map((item, index) => (
//                   <li className="nav__item" key={index}>
//                     <NavLink
//                       to={item.path}
//                       className={(navClass) => (navClass.isActive ? "active__link" : "")}
//                     >
//                       {item.display}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Right side (Profile, Dropdown, etc.) */}
//             <div className="nav__right d-flex align-items-center gap-4">
//               <div className="nav__btns d-flex align-items-center gap-4">
//                 {user ? (
//                   <>
//                     {/* User profile link */}
//                     <h5 className="mb-0" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
//                       {user.username}
//                     </h5>

//                     {/* Create Catalog Dropdown */}
//                     <div className="dropdown">
//                       <Button className="btn primary__btn" onClick={toggleDropdown}>
//                         Create a Catalog
//                       </Button>
//                       {isDropdownOpen && (
//                         <ul className="dropdown-menu">
//                           {models.map((model, index) => (
//                             <li className="nav__item" key={index}>
//                               <NavLink
//                                 to={model.path}
//                                 className={(navClass) => (navClass.isActive ? "active__link" : "")}
//                                 onClick={toggleDropdown}
//                               >
//                                 {model.displayName}
//                               </NavLink>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>

//                     {/* Logout button */}
//                     <Button className="btn btn-dark" onClick={logout}>
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button className="btn secondary__btn">
//                       <Link to="/login">Login</Link>
//                     </Button>
//                     <Button className="btn primary__btn">
//                       <Link to="/register">Register</Link>
//                     </Button>
//                   </>
//                 )}
//               </div>

//               {/* Mobile Menu Toggle */}
//               <span className="mobile__menu" onClick={toggleMenu}>
//                 <i className="ri-menu-line"></i>
//               </span>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Header;


// // import React, {useRef, useEffect, useContext} from "react";
// // import {Container, Row, Button} from 'reactstrap';
// // import {NavLink, Link, useNavigate} from 'react-router-dom';

// // import logo1 from '../../assets/images/analytikas.png';
// // import './header.css';

// // import {AuthContext} from './../../context/AuthContext';
// // import Navigation from "./navigation";

// // const nav__links = [
// //     {
// //         path:'/home',
// //         display:'Home'
// //     },
// //     {
// //         path:'/about',
// //         display:'About'
// //     },

// // ]
// // const nav__links__options = [
// //     {
// //         path:'/create/hotel',
// //         display:'Hotel Catalog'
// //     },
// //     {
// //         path:'/create/cafe',
// //         display:'Cafe Catalog'
// //     },
// //     {
// //         path:'/create/restaurant',
// //         display:'Restaurant Catalog'
// //     },

// // ]
// // const Header = ({nav__links__options}) => {
// //     const headerRef = useRef(null);
// //     const menuRef = useRef(null);
// //     const menuOptionRef = useRef(null);
// //     const navigate = useNavigate()
// //     const {user, dispatch} = useContext(AuthContext)

// //     const logout = () => {
// //         dispatch({type:'LOGOUT'})
// //         navigate('/')
// //     }

// //     console.log(user)

// //     const toogleMenu = () => menuRef.current.classList.toggle('show__menu')

// //     return (
// //     <header className="header" ref={headerRef}>
// //         <Container>
// //             <Row>
// //                 <div className="nav_wrapper d-flex align-items-center 
// //                 justify-content-between">
// //                     {/* ------------logo-------------*/}

// //                     <Link to='/home' style={{textDecoration: 'none'}}>
// //                     <div className="logo">
// //               <img src={logo1} alt="Africatalogs logo" style={{width: '40px'}}/>

// //                     </div></Link>
                    
// //                     {/* ------------logo end-------------*/}

// //                     {/* ------------menu start-------------*/}
// //                     <div className="navigation" ref={menuRef} onClick={toogleMenu}>
// //                         <ul className="menu d-flex align-items-center gap-5">
// //                             {nav__links.map((item,index) => (
// //                                 <li className="nav__item" key={index}>
// //                                     <NavLink
// //                                      to ={item.path}
// //                                     className={navClass =>
// //                                     navClass.isActive ? "active__link" : ""
// //                                     }
// //                                     >
// //                                         {item.display}
// //                                     </NavLink>
// //                                 </li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                     {/* ------------menu end-------------*/}

// //                     <div className="nav__right d-flex align-items-center gap-4 ">
// //                         <div className="nav__btns d-flex align-items-center gap-4">

// //                             { user? ( 
// //                             <>
// //                                 <h5 className="mb-0">{user.username}</h5>
// //                                 <Button className="btn primary__btn">
// //                                     <Navigation nav__links__options={nav__links__options} />
// //                                     {/* <Link to='/create'>Create listing</Link> */}
// //                                     </Button>
// //                                 {/* <Button className="btn primary__btn"><Link to='/create'>Create listing</Link></Button> */}
// //                                 <Button className="btn btn-dark" onClick={logout} >Logout </Button>
// //                             </>
// //                             ) : (
// //                                 <>

// //                                 <Button className="btn secondary__btn"><Link to='/login'>Login</Link></Button>
// //                                 <Button className="btn primary__btn"><Link to='/register'>Register</Link></Button>

// //                                 </>
// //                             )
// //                             }
                            
// //                         </div>
// //                         <span className="mobile__menu" onClick={toogleMenu}>
// //                             <i className="ri-menu-line"></i>
// //                         </span>
// //                     </div>


// //                 </div>
// //             </Row>
// //         </Container>
// //         </header>

// //     )

// // };
// // export default Header;

