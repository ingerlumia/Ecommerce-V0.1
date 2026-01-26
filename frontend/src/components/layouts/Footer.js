import '../../style.css'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto Footer" style={{ borderTop: "3px solid #FF7A00" }}>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center text-center text-md-start">
          {/* Brand/Name */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold mb-2" style={{ color: "#ffffffff" ,fontSize: "32px"}}>
              Cypers
            </h5>
            <p className="mb-0 small opacity-75">
              © 2019-2026, All Rights Reserved
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-end">
              <a href="/privacy" className="btn-custom btn-sm text-white text-decoration-none">
                Privacy
              </a>
              <a href="/terms" className="btn-custom btn-sm text-white text-decoration-none">
                Terms
              </a>
              <a href="/contact" className="btn-custom btn-sm text-white text-decoration-none">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

