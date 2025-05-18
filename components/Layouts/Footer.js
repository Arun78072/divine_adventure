import Link from "next/link";


export default function Footer() {
  return (
    <section className="footer_section">
      <div className="container">
        <div className="footer_top">
          <div className="footer_brand">
            <div className="footer-logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 35 36" className="logo-icon">
                <ellipse cx="17.3887" cy="18" rx="17.3887" ry="18" fill="url(#paint0_linear_11_233)" />
                <defs>
                  <linearGradient id="paint0_linear_11_233" x1="2.60711e-07" y1="12.5" x2="30.4817" y2="30.0729" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2B2B" />
                    <stop offset="1" stopColor="#1A92AC" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="logo-text">Blog</div>
            </div>
            <div className="footer_description">
              Join our newsletter to be at the forefront of accessing exclusive content and expert insights.
            </div>
           
          </div>
          {/* Links */}
          <div className="footer_links">
            <Link className="footer-link" href="/">Subscribe</Link>
            <Link className="footer-link" href="/">Categories</Link>
            <Link className="footer-link" href="/">Membership</Link>
            <Link className="footer-link" href="/">Resources</Link>
          </div>
        </div>
        {/* Copyright */}
        <div className="footer-bottom">
          Copyright © 2025 Blog. Developed with Arun Kumar
        </div>
      </div>
    </section>
  );
}
