import "@style/FooterComponent.css"; // Import local styles

import Link from "next/link";
import Image from "next/image";

export default function FooterComponent() {
    let currentYear: number = new Date().getFullYear();

    return (
        <footer className="container py-5 mt-5">
            <div className="row">
                <div className="col-12 col-md">
                    <Image className="mb-2" src="/images/Digivice.png" alt="Footer Logo" width="24" height="24" />
                    <small className="d-block mb-3 text-white">© 2025 – {currentYear + 1}</small>
                </div>
                <div className="col-6 col-md text-white">
                    <h5>MENÚ</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="link-secondary link-white text-decoration-none" href="/">HOME</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md text-white">
                    <h5>ENLACES ÚTILES</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="link-secondary link-white text-decoration-none" href="/">HOME</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md text-white">
                    <h5>SOBRE</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="link-secondary link-white text-decoration-none" href="/">QUIENES SOMOS</Link></li>
                        <li><Link className="link-secondary link-white text-decoration-none" href="/">CONTÁCTANOS</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container-fluid text-center vertical-line">
                <p className="fw-light text-white mt-2">Copyright © 2025. Todos los derechos reservados. Desarrollado por <a className="link-light link-underline-opacity-0 link-opacity-75-hover" href="https://cl.linkedin.com/in/byron-villegas-moya" target="_blank">Byron Villegas Moya</a></p>
            </div>
        </footer>
    );
}