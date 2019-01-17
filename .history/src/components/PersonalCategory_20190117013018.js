import React, { Component } from 'react';

const PersonalCategory = (props) => {
    return (
        <div class=`${props.contain}__personal-categories` >
        <a href="/">Must watch titles</a>
        <a href="/">Best of</a>
        <a href="/">Classic</a>
        <a href="/">Black List</a>
        </div >
    );
}

export default PersonalCategory;