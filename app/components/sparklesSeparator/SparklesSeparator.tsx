"use client";

export function SparklesSeparator() {
  return (
    <div className="w-full h-40 relative flex items-center justify-center">
      {/* --- INICIO DEL EFECTO DE LÍNEA GLOW --- */}

      {/* Línea central brillante principal */}
      <div className="absolute top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />

      {/* Línea secundaria (núcleo más brillante y corto) */}
      <div className="absolute top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      {/* --- FIN DEL EFECTO DE LÍNEA GLOW --- */}

      {/* Las partículas cayendo sobre la línea (efecto máscara radial para que se desvanezcan) */}
      {/* <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={120}
        className="w-full h-full"
        particleColor="#FFFFFF"
      /> */}

      {/* Máscara opcional para que las partículas no sean un cuadrado duro, sino que se fundan */}
      <div className="absolute inset-0 w-full h-full  [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    </div>
  );
}
