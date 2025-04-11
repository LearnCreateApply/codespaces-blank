import React from "react";
function Card(props) {
    return (
    <>
        <div className="card">
            <input type="checkbox" name="" id="" />{props.title}
        </div>
    </>
    );
}
export default Card;