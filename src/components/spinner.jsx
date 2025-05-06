import React from "react";
import PropTypes from "prop-types";

const Spinner = ({
  size = "md",
  color = "blue",
  align = "center",
  centerScreen = false,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-2",
  };

  const alignClasses = {
    center: "flex justify-center items-center",
    left: "flex justify-start items-center",
    right: "flex justify-end items-center",
    none: "", // No flex wrapper
  };

  const wrapperClasses = [
    align !== "none" ? alignClasses[align] : "",
    centerScreen ? "h-screen" : "",
    "w-full",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <div
        className={`${sizeClasses[size]} border-${color}-500 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.string,
  align: PropTypes.oneOf(["center", "left", "right", "none"]),
  centerScreen: PropTypes.bool,
};

export default Spinner;
