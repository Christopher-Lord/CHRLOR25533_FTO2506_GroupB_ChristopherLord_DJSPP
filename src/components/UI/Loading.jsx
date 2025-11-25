/**
 * Component for a re-usable loading UI
 *
 * @param {Object} message - Loading message to display
 * @returns {JSX.Element} Loading UI
 */
export default function Loading({ message }) {
  return <p className="loading-msg">{message}</p>;
}
