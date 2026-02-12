import { FiSend, FiCornerRightDown } from "react-icons/fi";

export const Form2 = () => {
  return (
    // Fondo con un gradiente sutil y patrón técnico para dar contexto
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden p-4">
      {/* Elemento decorativo de fondo (opcional) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0e5f76]/5 skew-x-12 transform origin-top-right pointer-events-none" />

      <ContactForm />
    </div>
  );
};

export function ContactForm() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Decoración geométrica detrás del formulario (Sombra sólida desplazada) */}
      <div className="absolute top-4 left-4 w-full h-full  rounded-sm -z-10 hidden md:block"></div>

      <form
        className="relative w-full grid gap-6 bg-white p-8 md:p-10 shadow-xl border border-slate-100"
        action="#"
        method="post"
      >
        <div className="mb-2">
          <h2 className="text-3xl font-bold text-[#0e5f76] flex items-center gap-2">
            Contáctanos <span className="text-[#2bb6c8]">.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Iniciemos la conversación sobre tu próximo proyecto.
          </p>
        </div>

        {/* Name Input */}
        <div className="relative group">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            autoComplete="name"
            // Estilo: Fondo plano, borde inferior animado, sin bordes laterales
            className="peer w-full bg-slate-50 px-4 pt-6 pb-2 text-slate-800 outline-none transition-all border-b-2 border-slate-200 focus:border-[#2bb6c8] focus:bg-white"
          />
          <label
            htmlFor="name"
            // Animación del Label: Flota y cambia de color
            className="absolute left-4 top-4 text-xs font-bold uppercase text-slate-400 transition-all 
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:font-normal
            peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#2bb6c8]
            -translate-y-0 pointer-events-none"
          >
            Nombre Completo
          </label>
          {/* Pequeño detalle técnico en la esquina */}
          <FiCornerRightDown className="absolute top-2 right-2 text-slate-200 opacity-0 peer-focus:opacity-100 transition-opacity" />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            autoComplete="email"
            className="peer w-full bg-slate-50 px-4 pt-6 pb-2 text-slate-800 outline-none transition-all border-b-2 border-slate-200 focus:border-[#2bb6c8] focus:bg-white"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-4 text-xs font-bold uppercase text-slate-400 transition-all 
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:font-normal
            peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#2bb6c8]
            -translate-y-0 pointer-events-none"
          >
            Correo Electrónico
          </label>
        </div>

        {/* Message Input */}
        <div className="relative group">
          <textarea
            id="content"
            name="content"
            cols={20}
            rows={4}
            placeholder=" "
            className="peer w-full resize-none bg-slate-50 px-4 pt-6 pb-2 text-slate-800 outline-none transition-all border-b-2 border-slate-200 focus:border-[#2bb6c8] focus:bg-white"
          />
          <label
            htmlFor="content"
            className="absolute left-4 top-4 text-xs font-bold uppercase text-slate-400 transition-all 
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:font-normal
            peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#2bb6c8]
            -translate-y-0 pointer-events-none"
          >
            ¿Cómo podemos ayudarte?
          </label>
        </div>

        {/* Button: Estilo "Innavanti" (Angular y Rápido) */}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="group relative inline-flex items-center gap-3 bg-[#0e5f76] px-8 py-3 text-white transition-all hover:bg-[#094556] hover:shadow-lg active:scale-95"
          >
            {/* Fondo decorativo inclinado */}
            <div className="absolute inset-0 bg-white/10 w-0 transition-all duration-300 group-hover:w-full skew-x-12 origin-left"></div>

            <span className="relative font-bold tracking-wide z-10">
              ENVIAR MENSAJE
            </span>
            <FiSend className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form2;
