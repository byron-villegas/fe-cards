"use client";

import "@style/NavigationComponent.css"; // Import local styles
import Link from "next/link";

import { usePathname } from "next/navigation";

function back(): void {
    window.history.back();
}

export default function NavigationComponent() {
    const pathname = usePathname(); // Obtener la ruta actual

    // Solo debe mostrarse en la ruta distinta de la raiz
    if (pathname == '/' || pathname == '') {
        return <></>;
    }

    return (
        <div className="container-fluid mb-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="me-2"><i className="fa fa-long-arrow-left fa-white" aria-hidden="true" title="Volver atras" onClick={() => back()}></i></li>
                    <li className="breadcrumb-item"><Link href="/"><i className="fa fa-home me-2 fa-white" aria-hidden="true"></i>Inicio</Link></li>
                </ol>
            </nav>
        </div>
    );
}