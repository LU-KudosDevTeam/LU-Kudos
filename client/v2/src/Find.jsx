import React from "react";
import {Link, Navigate} from "react-router-dom";

import "../../shared_assets/common.css"
import "../css/find_style.css"
import '../css/find_responsive.css'
import "../js/find_script.js"
import Header from "../components/Header.jsx";

Find.css = `

        :root {
            --main-color:var(--val1_KWGE);
            --input-color:rgba(188, 44, 35, 0.30);
            --accent:var(--val1_KWGE_muted);
        }
        body {
            margin: 0;
            padding: 0;
        }
        
    `

const fields = [{
    id: "fname",
    name: "fname",
    UI: "FIRST NAME:",
}, {
    id: "lname",
    name: "lname",
    UI: "LAST NAME:",
}, {
    id: "tname",
    name: "tname",
    UI: "TITLE:", 
}, {
    id: "dname",
    name: "dname",
    UI: "DEPARTMENT:",
}, {
    id: "ename",
    name: "ename",
    UI: "EMAIL ADDRESS:",
}
]

const inputField = fields.map(fields => {
    return (
        <div className="form_group" key = {fields.id}>
            <label for={fields.name}>
                {fields.UI}
            </label>
            <input
                type="text"
                name={fields.name}
            />
        </div>
    )
})


const Find = () => {
return (
    <>
    <Head>
        <title>FIND EMPLOYEE</title> 
    </Head>
    <body>

<Header nav_back={"/value"}>
</Header>

    {/* <!-- START KNOWLEDGE AREA  --> */}
    <div className="form_area">
        <div className="main_form">
            <h2>FIND EMPLOYEE</h2>
            <div className="main_form_box">

                {inputField}
                
                <div className="form_group form_btn">
                    <button type="submit" onClick="getEmployeeNames()">FIND EMPLOYEE</button>
                </div>

            </div>
        </div>
    </div>
    {/* <!-- END KNOWLEDGE AREA  --> */}

    </body>

    </>
    )
    }

export default Find;