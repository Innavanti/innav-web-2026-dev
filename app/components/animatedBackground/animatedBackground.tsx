import Image from "next/image";

export const StylesCSS = () => {
  return (
    <style>
      {`@keyframes HoverFrames 
        {
            from { transform: translate(0, 0); }
            to { transform: translate(0px, 10px); }
        }

        @keyframes GlowFrames 
        {
            from { transform: scale(1); }
            to { transform: scale(2); }
        }
        .animate-hover 
        {
            animation: HoverFrames  linear infinite;
            animation-direction: alternate;
            animation-timing-function: ease-in-out;
        }
        .animate-glow
        {

            animation: GlowFrames  linear infinite;
            animation-direction: alternate;
            animation-timing-function: ease-in-out;
        }
        .anim-duration-2 { animation-duration: 2s; }
        .anim-duration-3 { animation-duration: 3s; }
        .anim-duration-4 { animation-duration: 4s; }
        .anim-duration-5 { animation-duration: 2.5s; }
        `}
    </style>
  );
};

export const AnimatedBackground_Phone = () => {
  const className =
    "absolute drop-shadow-2xl w-full h-full object-contain animate-hover ";
  const relative_height = 50;
  const reference =
    "/assets/animated_backgrounds/phone_messages/phone_reference.jpg";

  const imagePath = "/assets/animated_backgrounds/phone_messages";
  return (
    <div className="relative border-2 border-green-500 w-screen h-screen">
      <StylesCSS />
      <Glow className={className} />

      {/* Phone  */}
      <Image
        src={imagePath + "/phone.webp"}
        alt="Loading..."
        fill
        className={className}
      />
      <EnergyContainer>
        <EnergyNode path="m0250,900 v-400" trail duration="1.7s" />
        <EnergyNode path="m0700,850 v-400" trail duration="1.4s" />
        <EnergyNode path="m0800,950 v-400" trail duration="1.6s" />
        <EnergyNode path="m0600,920 v-400" trail duration="1.2s" />
        <EnergyNode path="m0900,900 v-400" trail duration="1.8s" />
        <EnergyNode path="m1000,900 v-400" trail duration="2s" />
        <EnergyNode path="m1300,950 v-400" trail duration="2.2s" />
      </EnergyContainer>
      {/* Message 1 */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height - 50}px)` }}
      >
        <Image
          src={imagePath + "/message1.webp"}
          alt="Loading..."
          fill
          className={className + "anim-duration-2 opacity-80 "}
        />
      </div>
      {/* Message 2 (L Shape) */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height - 30}px)` }}
      >
        <Image
          src={imagePath + "/message2.webp"}
          alt="Loading..."
          fill
          className={className + "anim-duration-3 opacity-80"}
        />
      </div>

      {/* Message 3  */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height * 1.8}px)` }}
      >
        <Image
          src={imagePath + "/message3.webp"}
          alt="Loading..."
          fill
          className={className + "anim-duration-4  opacity-100 "}
        />
      </div>
      {/* Message 4 (Top square) */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height * 2.5}px)` }}
      >
        <Image
          src={imagePath + "/message6.webp"}
          alt="Loading..."
          fill
          className={className + "anim-duration-5 opacity-70  "}
        />
      </div>
    </div>
  );
};

export const AnimatedBackground_PhoneNet = () => {
  const className = "absolute w-full h-full object-contain  ";
  const relative_height = 100;
  const imagePath = "/assets/animated_backgrounds/phone_net";
  return (
    <div className="relative border-2 border-green-500 w-screen h-screen">
      <StylesCSS />
      {/* Phone  */}
      <Image
        id="mask"
        src={imagePath + "/phone.webp"}
        alt="Innavanti Logo"
        fill
        className={className}
      />
      <EnergyContainer viewBox="0 0 1024 1024">
        <EnergyNode path="m512,450 l  40,-180" trail duration="1.1s" />
        <EnergyNode path="m512,450 l  10, 200" trail duration="1.2s" />
        <EnergyNode path="m512,450 l -20, 150" trail duration="1.3s" />
        <EnergyNode path="m512,450 l 200,  10" trail duration="1.4s" />
        <EnergyNode path="m512,450 l-230, -70" trail duration="1.5s" />
        <EnergyNode path="m512,450 l 150, 150" trail duration="1.6s" />
        <EnergyNode path="m512,450 l 200,-100" trail duration="1.7s" />
        <EnergyNode path="m512,450 l-230,  70" trail duration="1.8s" />
        <EnergyNode path="m512,450 l-150,-150" trail duration="1.9s" />
        <EnergyNode path="m512,450 l 190,-150" trail duration="2s" />
        <EnergyNode path="m512,450 l-150, 150" trail duration="2.1s" />
      </EnergyContainer>
      {/* Sphere  */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/sphere.webp"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-90"}
          style={{ animationDuration: "2s", animationDelay: "1.5s" }}
        />
      </div>

      {/* Screen Glow  */}
      <svg
        className={`absolute inset-0 w-full h-full ${className}`}
        viewBox="0 0 1024 1024"
        style={{
          maskImage: "url(/assets/animated_backgrounds/phone_net/phone.webp)",
          maskPosition: "center",
          maskType: "alpha",
          maskMode: "alpha",
          maskRepeat: "no-repeat",
          maskSize: "contain",
        }}
      >
        <defs>
          <radialGradient id="myGradient">
            <stop offset="0%" stopColor="#2bb4c899" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          cx="50%"
          cy="70%"
          r="20%"
          style={{
            transformOrigin: "50% 70%",
          }}
          fill="url('#myGradient')"
          // fill="red"
          className="animate-glow anim-duration-2"
        />
      </svg>

      {/* ---------------- Messages ----------------  */}
      {/* Messages back */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/chat1.webp"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: "0s" }}
        />
      </div>
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/chat2.webp"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: ".8s" }}
        />
      </div>
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/chat3.webp"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: "0.4s" }}
        />
      </div>
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/chat4.webp"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: "1s" }}
        />
      </div>

      {/* Messages Front  */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/chat5.webp"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-70 "}
          style={{ animationDuration: "2s", animationDelay: "0.5s" }}
        />
      </div>
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/chat6.webp"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: "0s" }}
        />
      </div>
    </div>
  );
};

export const AnimatedBackground_Desktop = () => {
  const className = "absolute w-full h-full object-contain  ";
  const relative_height = 0;
  const imagePath = "/assets/animated_backgrounds/desktop";
  return (
    <div className="relative border-2 border-green-500 w-screen h-screen">
      <StylesCSS />
      <Glow className={className} />

      {/* Charts  */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/charts_v1.png"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: "1.5s" }}
        />
      </div>
      {/* Code */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/code1_v1.png"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: "0s" }}
        />
      </div>
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/code2_v1.png"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: ".8s" }}
        />
      </div>
      {/* Screen */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/screen_v1.png"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: "0.4s" }}
        />
      </div>

      {/* Keyboard  */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/keyboard_v1.png"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-80"}
          style={{ animationDuration: "2s", animationDelay: "1s" }}
        />
      </div>
      {/* MousePad  */}
      <div
        className="absolute w-full h-full"
        style={{ transform: `translate(0px, ${relative_height}px)` }}
      >
        <Image
          src={imagePath + "/mousepad_v1.png"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " animate-hover opacity-70 "}
          style={{ animationDuration: "2s", animationDelay: "0.5s" }}
        />
      </div>
    </div>
  );
};

export const AnimatedBackground_Datacenter = () => {
  const className = "absolute w-full h-full object-contain  ";
  const relative_height = 0;
  const imagePath = "/assets/animated_backgrounds/datacenter";

  const DataLinkPaths = [
    {
      duration: "2.6s",
      path: "M445,397 l-25,15 a 15,10 0 0,0 0,14 l136,77 a 12,10 0 0,1 0,17 l-175,108 a 12,10 0 0,0 0,17 l25,15",
    },
    {
      duration: "2.4s",
      path: "M280,620 m25,-20 l33,19 a 10,10 0 0,0 10,0 l164,-99 a 15,12 0 0,0 0,-19 l-133,-75 a 10,10 0 0,1 0,-14 l45.5,-26",
    },
    { duration: "1.2s", path: "M259,633 l110,63 " },
    { duration: "1.3s", path: "M282,616 m110,63 l-110,-63 " },
    { duration: "1.1s", path: "M497,582 l110,-66" },
    { duration: "1.4s", path: "M520,595 m110,-66 l-110,66 " },
    { duration: "1.0s", path: "M630,378 l110,63 " },
    { duration: "1.2s", path: "M610,390 m110,63 l-110,-63 " },
  ];
  return (
    <div className="relative border-2 border-green-500 w-screen h-screen">
      <StylesCSS />
      <Glow className={className} />
      <EnergyContainer viewBox="0 0 1080 1080" className=" ">
        {DataLinkPaths.map(({ path, duration }, index) => (
          <EnergyLine
            key={index}
            path={path}
            duration={duration}
            delay={index * 0.1 + "s"}
            id={index.toString()}
          />
        ))}
      </EnergyContainer>
      {/* ---------- Image Files ---------- */}
      <div className="">
        {/* Devices layers  */}
        <>
          <Image
            src={imagePath + "/devices-case.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  "}
          />
          <Image
            src={imagePath + "/devices-internals.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + " animate-hover"}
            style={{ animationDuration: "2.1s", animationDelay: "1s" }}
          />
          <Image
            src={imagePath + "/devices-glass.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  opacity-80"}
          />
        </>
        {/* GPU layers  */}
        <>
          <Image
            src={imagePath + "/gpu-case.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  "}
          />
          <Image
            src={imagePath + "/gpu-internals.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + " animate-hover"}
            style={{ animationDuration: "2.2s", animationDelay: "1.1s" }}
          />
          <Image
            src={imagePath + "/gpu-glass.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + ""}
          />
        </>
        {/* Auth layers  */}
        <>
          <Image
            src={imagePath + "/auth-case.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  "}
          />
          <Image
            src={imagePath + "/auth-internals.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + " animate-hover"}
            style={{ animationDuration: "2.3s", animationDelay: "0.9s" }}
          />
          <Image
            src={imagePath + "/auth-glass.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  opacity-80"}
          />
        </>
        {/* Storage layers  */}
        <>
          <Image
            src={imagePath + "/storage-case.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  "}
            style={{ animationDuration: "2s", animationDelay: "1.5s" }}
          />
          <Image
            src={imagePath + "/storage-internals.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + " animate-hover"}
            style={{ animationDuration: "2.1s", animationDelay: "1.5s" }}
          />
          <Image
            src={imagePath + "/storage-glass.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  opacity-80"}
            style={{ animationDuration: "2s", animationDelay: "1.5s" }}
          />
        </>
        {/* CPU layers  */}
        <>
          <Image
            src={imagePath + "/cpu-case.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  "}
            style={{ animationDuration: "2s", animationDelay: "1.5s" }}
          />
          <Image
            src={imagePath + "/cpu-internals.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + " animate-hover"}
            style={{ animationDuration: "2.1s", animationDelay: "1.5s" }}
          />
          <Image
            src={imagePath + "/cpu-glass.png"}
            alt="Innavanti Logo"
            fill
            id="mask"
            className={className + "  opacity-80"}
            style={{ animationDuration: "2s", animationDelay: "1.5s" }}
          />
        </>
      </div>
    </div>
  );
};

const EnergyNode = ({
  path = "M500, 600 l0,-500",
  duration = "2s",
  trail = false,
  delay = "2s",
}: {
  path?: string;
  duration?: string;
  trail?: boolean;
  delay?: string;
}) => {
  return (
    <>
      {trail && (
        <path
          fill="none"
          stroke={`url(#linearGrad)`}
          strokeWidth={5}
          d={"m0,0 l-200,1"}
          style={{
            offsetPath: `path('${path}')`,
            animation: "EnergyLine infinite linear",
            animationDuration: duration,
          }}
        />
      )}
      <circle
        fill={`url(#circleGrad)`}
        stroke="none"
        strokeWidth={2}
        r={30}
        style={{
          offsetPath: `path('${path}')`,
          animation: " EnergyLine infinite linear",
          animationDuration: duration,
        }}
      />
    </>
  );
};

const EnergyLine = ({
  path = "M500, 600 l0,-500",
  duration = "2s",
  id,
  debug = false,
  delay = "0s",
}: {
  path?: string;
  duration?: string;
  id: string;
  debug?: boolean;
  delay?: string;
}) => {
  return (
    <>
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <mask id={`energy-mask-${id}`}>
          <path
            d={path}
            fill="none"
            stroke="white"
            strokeWidth={5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </mask>
      </defs>
      {debug && (
        <path
          d={path}
          fill="none"
          stroke="white"
          strokeWidth={5}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.5}
        />
      )}

      <g filter="url(#blur)">
        <g mask={`url(#energy-mask-${id})`}>
          <path
            d={path}
            fill="none"
            stroke="white"
            strokeWidth={5}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.2}
          />

          <circle
            fill={`url(#circleGrad1)`}
            stroke="none"
            strokeWidth={2}
            r={30}
            style={{
              offsetPath: `path('${path}')`,
              animation: "EnergyLine infinite linear",
              animationDuration: duration,
              animationDelay: delay,
            }}
          />
        </g>
      </g>
      <path
        d={path}
        fill="none"
        stroke="#2fbfcf"
        strokeWidth={1}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.5}
      />
    </>
  );
};

const EnergyContainer = ({
  className,
  children,
  viewBox = "0 0 1600 1536",
}: {
  className?: string;
  children: React.ReactNode;
  viewBox?: string;
}) => {
  return (
    <svg
      className={`absolute object-fill w-full h-full ${className}`}
      viewBox={viewBox}
    >
      <style>
        {`
        @keyframes Spark
        {
            from
            { 
              opacity:0;
            }
            30%,50% 
            {
            opacity:1;
            }
            to 
            { 
              opacity:0;
            }
        }
         @keyframes EnergyLine 
        {
            0%
            { 
              opacity:0;  
              offset-distance: 0%; 
            }
            15%,65% 
            {
              opacity:1;
            }
            80% 
            { 
              offset-distance: 100%; 
              opacity:0;
            }
              100% 
            { 
              offset-distance: 100%; 
              opacity:0;
            }
        }
        `}
      </style>
      <defs>
        <radialGradient id={"circleGrad1"} cx="1" cy=".5" r={1}>
          <stop offset="0%" stopColor="#2bb4c8FF" />
          <stop offset="100%" stopColor="#2bb4c800" />
        </radialGradient>

        <radialGradient id={"circleGrad2"}>
          <stop offset="0%" stopColor="#2bb4c8FF" />
          <stop offset="100%" stopColor="#2bb4c800" />
        </radialGradient>
        <linearGradient id={"linearGrad"} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#2bb4c899" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
};

const Glow = ({ className }: { className: string }) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 2400 1536"
    >
      <style>
        {`
        @keyframes AnimationGlow
        {
            from { transform: scale(1); opacity: .5; }
            50% { transform: scale(1.5); opacity: 1;}
            to { transform: scale(1); opacity: .5; }

        }
        `}
      </style>
      <defs>
        <radialGradient id="myGradient">
          <stop offset="0%" stopColor="#2bb4c899" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle
        cx="50%"
        cy="60%"
        r="30%"
        fill="url('#myGradient')"
        style={{
          transformOrigin: "50% 60%",
          animation: "AnimationGlow infinite linear",
          animationDuration: "5s",
        }}
      />
    </svg>
  );
};
