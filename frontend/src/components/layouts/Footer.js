
const styles = `
  .footer-glass {
    background: #1a1a1a; /* Sleek dark theme */
    color: #ffffff;
    padding: 60px 0 30px 0;
    border-top: 4px solid #FF7A00;
    position: relative;
    overflow: hidden;
  }

  .footer-brand {
    font-size: 32px;
    font-weight: 900;
    letter-spacing: -1.5px;
    background: linear-gradient(90deg, #ffffff 0%, #FF7A00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .footer-link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: 0.3s;
    padding: 5px 10px;
    border-radius: 8px;
  }

  .footer-link:hover {
    color: #FF7A00;
    background: rgba(255, 122, 0, 0.1);
    transform: translateY(-2px);
  }

  .footer-bottom-bar {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .social-icon {
    width: 35px;
    height: 35px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    transition: 0.3s;
    color: white;
    text-decoration: none;
  }

  .social-icon:hover {
    background: #FF7A00;
    color: white;
    transform: scale(1.1);
  }
`;

export default function Footer() {
  return (
    <footer className="footer-glass mt-auto">
      <style>{styles}</style>
      <div className="container">
        <div className="row align-items-center">
          
          {/* Brand/Name Section */}
          <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h5 className="footer-brand mb-1">
              Cypers
            </h5>
            <p className="small opacity-50 mb-0">
              Building the future of e-commerce with speed and security.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-12 col-md-6">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <a href="/privacy" className="footer-link">Privacy</a>
              <a href="/terms" className="footer-link">Terms</a>
              <a href="/contact" className="footer-link">Contact</a>
              
              {/* Added Social placeholders to look more professional for resume */}
              <div className="ms-md-3 mt-3 mt-sm-0">
                <a href="/git" className="social-icon"><i className="fa fa-github"></i></a>
                <a href="/linked" className="social-icon"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="row footer-bottom-bar text-center">
          <div className="col-12">
            <p className="mb-0">
              © 2019-2026 Cypers Inc. Built with Passion for the Modern Web.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

