const styles = `
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh; /* Centers it in the viewport */
    width: 100%;
  }

  .dual-ring-loader {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .dual-ring-loader:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #FF7A00;
    border-color: #FF7A00 transparent #FF7A00 transparent;
    animation: dual-ring-spin 1.2s linear infinite;
  }

  @keyframes dual-ring-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-text {
    margin-top: 15px;
    color: #FF7A00;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 0.8rem;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`;

export default function Loader() {
    return (
        <div className="loader-container flex-column">
            <style>{styles}</style>
            <div className="dual-ring-loader"></div>
            <div className="loading-text">Loading...</div>
        </div>
    );
}