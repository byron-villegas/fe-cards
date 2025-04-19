"use client"

import "@style/NavbarComponent.css"; // Import local styles
import Link from "next/link";
import Image from "next/image";

export default function NavbarComponent() {
    return (
        <nav className="navbar bg-dark navbar-expand-lg mb-3" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    <Image src="/images/Digivice.png" alt="Logo" width={30} height={30} className="d-inline-block align-text-top" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/"><strong>HOME</strong></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}