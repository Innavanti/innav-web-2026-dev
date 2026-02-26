import Image from "next/image";

export const StylesCSS = () => {
  return (
    <style>
      {`@keyframes HoverFrames 
        {
            from { transform: translate(0%, 0%); }
            to { transform: translate(0%, 2%); }
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
        `}
    </style>
  );
};

export const AnimatedBackground_Phone = () => {
  const className = "absolute drop-shadow-2xl w-full h-full object-contain ";
  const folderPath = "/assets/animated_backgrounds/phone_messages";
  const ImagePaths = [
    "/message1.webp",
    "/message2.webp",
    "/message3.webp",
    "/message4.webp",
  ];

  return (
    <div className="relative w-full h-full">
      <StylesCSS />
      <Glow className={className} />

      {/* Phone  */}
      <Image
        src={folderPath + "/phone.webp"}
        alt="phone messages"
        fill
        className={className}
      />
      <EnergyContainer>
        <EnergyNode path="m0250,900 m0,-400 v400" trail duration="1.7s" />
        <EnergyNode path="m0700,850 m0,-400 v400" trail duration="1.4s" />
        <EnergyNode path="m0800,950 m0,-400 v400" trail duration="1.6s" />
        <EnergyNode path="m0600,920 m0,-400 v400" trail duration="1.2s" />
        <EnergyNode path="m0900,900 m0,-400 v400" trail duration="1.8s" />
        <EnergyNode path="m1000,900 m0,-400 v400" trail duration="2s" />
        <EnergyNode path="m1300,950 m0,-400 v400" trail duration="2.2s" />
      </EnergyContainer>

      {/* Message Images */}
      {ImagePaths.map((path, index) => (
        <Image
          src={folderPath + path}
          alt={`phone_messages_${path}`}
          key={`phone_messages_${path}`}
          fill
          className={className + "animate-hover opacity-80"}
          style={{
            animationDuration: `${2 + index * 0.1}s`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedBackground_PhoneNet = () => {
  const className = "absolute w-full h-full object-contain ";

  const folderPath = "/assets/animated_backgrounds/phone_net";
  const ImagePaths = [
    "/chat1.webp",
    "/chat2.webp",
    "/chat3.webp",
    "/chat4.webp",
    "/chat5.webp",
    "/chat6.webp",
  ];
  const EnergyNodePaths = [
    "m512,325 l  40, -180 ",
    "m512,325 l  10,  200",
    "m512,325 l -20,  150",
    "m512,325 l 310,   10",
    "m512,325 l-230,  -70",
    "m512,325 l 200, -100",
    "m512,325 l-230,   70",
    "m512,325 l-150, -150",
    "m512,325 l 190, -150",
    "m512,325 l-150,  150",
    "m512,325 l 150,  150",
  ];

  return (
    <div className="relative w-full h-full">
      <StylesCSS />
      {/* Phone  */}
      <Image
        id="mask"
        src={folderPath + "/phone.webp"}
        alt="Innavanti Logo"
        fill
        className={className}
      />

      {/* Sphere  */}
      <div
        className={className + " animate-hover "}
        style={{ animationDuration: "2s", animationDelay: "1.5s" }}
      >
        <EnergyContainer viewBox="0 0 1024 1024">
          {EnergyNodePaths.map((path, index) => (
            <EnergyNode
              key={index}
              path={path}
              trail
              blue
              duration={`${1 + index * 0.1}s`}
              delay={`${index * 0.1}s`}
            />
          ))}
        </EnergyContainer>
        <Image
          src={folderPath + "/sphere.webp"}
          alt="Innavanti Logo"
          fill
          id="mask"
          className={className + " opacity-90"}
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
            animationDuration: "2s",
          }}
          fill="url('#myGradient')"
          className="animate-glow"
        />
      </svg>

      {/* ---------------- Message Images ----------------  */}
      {ImagePaths.map((path, index) => (
        <Image
          src={folderPath + path}
          alt={`phone_net_${path}`}
          key={`phone_net_${path}`}
          fill
          className={className + " animate-hover opacity-80"}
          style={{
            animationDuration: `${2.5 + index * 0.1}s`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedBackground_Desktop = () => {
  const className = "absolute w-full h-full object-contain ";
  const folderPath = "/assets/animated_backgrounds/desktop";

  const ImagePaths = [
    "/charts.webp",
    "/code1.webp",
    "/code2.webp",
    "/keyboard.webp",
    "/mousepad.webp",
  ];
  const ScreenImagePaths = [
    "/screen_display.webp",
    "/screen_content.webp",
    "/screen_body.webp",
  ];
  const EnergyNodePaths = [
    "m0590,570 v300",
    "m775,800 v300",
    "m200,1100 v300",
    "m1050,1250 v300",
    "m1500,1350 v300",
    "m1750,800 v300",
    "m2100,1000 v300",
  ];
  const DataLinkPaths = [
    "m0550,600 l150,80",
    "m0750,780 l150,-80",
    "m01550,700 l160,-90 ",
    "m0660,450 l80,-45 a 30,30 0 0,1 40,0 l80,45",
    "m0750,1010 l160,-90 a 25,25 0 0,0 0,-40 l-160,-90",
    "m01600,1350 l160,-90 a 25,25 0 0,0 0,-40 l-160,-90",
  ];

  return (
    <div className="relative w-full h-full">
      <StylesCSS />
      <Glow className={className} />
      <EnergyContainer viewBox="0 0 2400 1536">
        {EnergyNodePaths.map((path, index) => (
          <EnergyNode
            key={index}
            path={path}
            trail
            duration={`${2 + index * 0.1}s`}
            blue
            delay={`${index * 0.1}s`}
          />
        ))}
        {DataLinkPaths.map((path, index) => (
          <EnergyLine
            key={`desktop-datalink-${index}`}
            id={`desktop-datalink-${index}`}
            path={path}
            duration={`${1 + index * 0.1}s`}
            delay={`${index * 0.1}s`}
          />
        ))}
      </EnergyContainer>

      {/* Screen Images  */}
      {ScreenImagePaths.map((path, index) => (
        <Image
          key={index}
          src={folderPath + path}
          alt={`desktop-${path}`}
          fill
          className={className + ` ${index == 1 && "animate-pulse"}`}
        />
      ))}

      {/* Animated Images  */}
      {ImagePaths.map((path, index) => (
        <Image
          key={index}
          src={folderPath + path}
          alt={`desktop-${index}`}
          fill
          id="mask"
          className={className + " animate-hover "}
          style={{
            animationDuration: `${1 + index * 0.1}s`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedBackground_Datacenter = () => {
  const className = "absolute w-full h-full object-contain  ";
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
    // Storage to CPU
    { duration: "1.2s", path: "M209,663 l120,73 " },
    { duration: "1.3s", path: "M352,719 l-120,-73 " },
    // CPU to Devices
    { duration: "1.1s", path: "M497,582 l110,-66" },
    { duration: "1.4s", path: "M520,595 m110,-66 l-110,66 " },
    // GPU to Devices
    { duration: "1.0s", path: "M630,378 l110,63 " },
    { duration: "1.2s", path: "M610,390 m110,63 l-110,-63 " },
  ];

  const ImagePaths = [
    { path: "/internal-devices.webp" },
    { path: "/internal-gpu.webp" },
    { path: "/internal-auth.webp" },
    { path: "/internal-storage.webp" },
    { path: "/internal-cpu.webp" },
  ];
  return (
    <div className="relative w-full h-full">
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
            line
          />
        ))}
      </EnergyContainer>
      {/* ---------- Image Files ---------- */}
      <>
        <Image
          src={imagePath + "/base.webp"}
          alt="Innavanti Logo"
          fill
          className={className + " "}
        />
        <Image
          src={imagePath + "/glass.webp"}
          alt="Innavanti Logo"
          fill
          className={className + "opacity-50"}
        />

        {/* Animated components  */}
        {ImagePaths.map(({ path }, index) => (
          <Image
            key={"datacenter_component_" + index}
            src={imagePath + path}
            alt="Innavanti Logo"
            fill
            className={className + "animate-hover"}
            style={{
              animationDuration: (2 + index * 0.1).toString() + "s",
              animationDelay: (index * 0.1).toString() + "s",
            }}
          />
        ))}
        <Image
          src={imagePath + "/glass-detail.webp"}
          alt="Innavanti Logo"
          fill
          className={className}
          style={{ animationDuration: "2.1s", animationDelay: "1.4s" }}
        />
      </>
    </div>
  );
};

const EnergyNode = ({
  path = "M500, 600 l0,-500",
  duration = "2s",
  trail = false,
  delay = "0s",
  blue = false,
}: {
  path?: string;
  duration?: string;
  trail?: boolean;
  delay?: string;
  blue?: boolean;
}) => {
  return (
    <>
      {trail && (
        <path
          fill="none"
          stroke={`url(#linearGrad${blue ? "Blue" : "White"})`}
          strokeWidth={5}
          d={"m0,0 l-200,1"}
          style={{
            offsetPath: `path('${path}')`,
            animation: "EnergyLine infinite linear",
            animationDuration: duration,
            animationDelay: delay,
          }}
        />
      )}
      <circle
        fill={`url(#circleGrad${blue ? "Blue" : "White"})`}
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
    </>
  );
};

const EnergyLine = ({
  path = "M500, 600 l0,-500",
  duration = "2s",
  id,
  delay = "0s",
  line = false,
}: {
  path?: string;
  duration?: string;
  id: string;
  delay?: string;
  line?: boolean;
}) => {
  return (
    <>
      <defs>
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

      {line && (
        <>
          <path
            d={path}
            fill="none"
            stroke="white"
            strokeWidth={5}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.2}
          />
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
      )}
      <g mask={`url(#energy-mask-${id})`}>
        <circle
          fill={`url(#dataLinkGrad)`}
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
        <radialGradient id={"dataLinkGrad"} cx="1" cy=".5" r={1}>
          <stop offset="0%" stopColor="#2bb4c8FF" />
          <stop offset="100%" stopColor="#2bb4c800" />
        </radialGradient>

        <radialGradient id={"circleGradWhite"}>
          <stop offset="0%" stopColor="#caecf1FF" />
          <stop offset="100%" stopColor="#caecf100" />
        </radialGradient>
        <radialGradient id={"circleGradBlue"}>
          <stop offset="0%" stopColor="#2bb4c8FF" />
          <stop offset="100%" stopColor="#2bb4c800" />
        </radialGradient>
        <linearGradient
          id={"linearGradWhite"}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#caecf1FF" />
        </linearGradient>
        <linearGradient id={"linearGradBlue"} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#2bb4c8FF" />
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
