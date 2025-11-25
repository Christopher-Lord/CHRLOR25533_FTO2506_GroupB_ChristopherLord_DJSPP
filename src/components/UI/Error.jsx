/**
 * React Component to create a re-usable error UI
 * 
 * @param {Object} message - Error message to display
 * @returns {JSX.Element} Error UI
 */
export default function Error({ message }) {
  return <p className="error-msg">{message}</p>;
}
