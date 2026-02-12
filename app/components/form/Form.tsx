export const Form = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-foreground">
      <ContactForm />
    </div>
  );
};

export function ContactForm() {
  return (
    <form
      className="relative my-4 w-full grid gap-8 rounded-lg border-8 border-primary-1-600 bg-white p-6 md:my-12 md:max-w-lg md:flex-1 lg:my-16 "
      action="#"
      method="post"
    >
      <h2 id="contact" className="text-3xl font-bold text-primary-1-600">
        Contáctanos
      </h2>

      {/* Name */}
      <div className="relative">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          autoComplete="name"
          className="peer w-full rounded-md border-4 border-primary-1-400 py-2 placeholder-transparent focus:border-primary-2-400 focus:outline-none focus:ring-4 focus:ring-primary-2-400 "
        />
        <label
          htmlFor="name"
          className="absolute left-2 -top-4 -translate-y-1/2 text-sm font-bold uppercase text-neutral-500 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:left-2 peer-focus:-top-4 peer-focus:text-neutral-600 "
        >
          Your Name
        </label>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          autoComplete="email"
          className="peer w-full rounded-md border-4 border-primary-1-400 py-2 placeholder-transparent focus:border-primary-2-400 focus:outline-none focus:ring-4 focus:ring-primary-2-400 "
        />
        <label
          htmlFor="email"
          className="absolute left-2 -top-4 -translate-y-1/2 text-sm font-bold uppercase text-neutral-500 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-neutral-900 peer-focus:left-2 peer-focus:-top-4 peer-focus:text-neutral-600 "
        >
          Your Email
        </label>
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          id="content"
          name="content"
          cols={20}
          rows={5}
          placeholder="How can we help?"
          className="peer w-full resize-none rounded-md border-4 border-primary-1-400 placeholder-transparent focus:border-primary-2-400 focus:outline-none focus:ring-4 focus:ring-primary-2-400  "
        />
        <label
          htmlFor="content"
          className="absolute left-2 -top-3 -translate-y-1/2 text-sm font-bold uppercase text-neutral-500 transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-6 peer-placeholder-shown:text-neutral-900 peer-focus:left-2 peer-focus:-top-4 peer-focus:text-neutral-600 "
        >
          How can we help?
        </label>
      </div>

      {/* Button (manteniendo estética del <a>) */}
      <button
        type="submit"
        className="w-max rounded-md bg-primary-1-900 px-6 py-2 text-white shadow-xl transition-shadow hover:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-2-900 ring-offset-4 ring-offset-white "
      >
        Send
      </button>
    </form>
  );
}

export default Form;
