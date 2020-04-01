//import React from "react";
import PropTypes from 'prop-types';

function InlineError({text}){
    return {text};
};

InlineError.propTypes ={
    text: PropTypes.string.isRequired
};

export default InlineError;





