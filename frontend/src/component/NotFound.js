import React from "react";


const PageNotFound = ({location}) => {
    return (
        <div className={"not-found"}>
            <img src="img/page_not_found.svg" alt="" className={"not-found-img"}/>
            <h1>Ой! Что то пошло не так...</h1>
        </div>
    )
}

export default PageNotFound;