"use client";

import "@style/CardGameCategoryComponent.css"; // Import local styles

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function CardGameCategoryComponent() {
    const pathname = usePathname(); // Obtener la ruta actual

    // Solo debe mostrarse en la ruta raiz
    if (pathname != '/' && pathname != '') {
        return <></>;
    }
    
    return (
        <div className="container-fluid text-center">
            <h1 className="text-white mb-3 font-audiowide"><strong>GAMES</strong></h1>
            <div className="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
                <div className="col">
                    <Link href="/cards/digimon">
                        <Image src="/images/logos/Digimon.png" alt="Digimon" width={600} height={180} style={{ width: '85%', height: '80%' }} />
                    </Link>
                </div>
                <div className="col">
                    <Link href="/cards/pokemon">
                        <Image src="/images/logos/Pokemon.png" alt="Pokemon" width={600} height={180} style={{ width: '88%', height: '80%' }} />
                    </Link>
                </div>
                <div className="col">
                    <Link href="/cards/yu-gi-oh">
                        <Image src="/images/logos/Yu Gi Oh.webp" alt="Yu Gi Oh" width={600} height={180} style={{ width: '80%', height: '80%' }} />
                    </Link>
                </div>
                <div className="col">
                    <Link href="/cards/magic-the-gathering">
                        <Image src="/images/logos/Magic.webp" alt="Magic" width={600} height={180} style={{ width: '88%', height: '80%' }} />
                    </Link>
                </div>
                <div className="col">
                    <Link href="/cards/mitos-y-leyendas">
                        <Image src="/images/logos/Mitos y Leyendas.webp" width={600} height={180} alt="Mitos y Leyendas" style={{ width: '80%', height: '80%' }} />
                    </Link>
                </div>
            </div>
        </div>
    )
}