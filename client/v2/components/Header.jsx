import React from "react";
import {Link, Navigate} from "react-router-dom";

const Header = ({nav_back}) => (
    <header>
            <Link to = {nav_back}>&larr;

            Lewis University Kudos</Link>
    </header>
)

export default Header;