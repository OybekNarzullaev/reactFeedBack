import PropTypes from "prop-types";

export default function Button({ children, version, type, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}
Button.defaultProps = {
  version: "primary",
  isDisabled: false,
  type: "button",
};

Button.propTypes = {
  version: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
};
