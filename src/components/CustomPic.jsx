import React from "react";

const CustomPic = () => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center text-white px-6 py-10"
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main image + girl + vector */}
      <div className="relative inline-block">
        {/* Man image */}
        <img
          src="/men.svg"
          alt="Main developer"
          className="rounded-lg shadow-lg w-[280px] h-auto"
        />

        {/* Girl image */}
        <img
          src="/girl.svg"
          alt="Small Developer"
          className="absolute top-6 right-[-40px] w-[110px] rounded-lg shadow-lg border-4 border-white"
        />

        {/* Vector icon above girl */}
        <img
          src="/vector.svg"
          alt="Vector decoration"
          className="absolute -top-6 right-[-30px] w-[50px]"
        />

        {/* Caption */}
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white text-black text-sm font-medium px-3 py-1 rounded-lg shadow">
          Fast-track elite remote developer hiring.
        </div>
      </div>

      {/* Description */}
      <p className="mt-12 text-center text-lg">
        Apply to join the top 1% developers and get hired globally!
      </p>

      {/* Tech Stack Icons */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { icon: "/JS.svg", label: "Node.js" },
          { icon: "/Angular.svg", label: "Angular/Node" },
          { icon: "/swift.svg", label: "Swift" },
          { icon: "/python.svg", label: "Python" },
          { icon: "/backend.svg", label: "Back End" },
          { icon: "/web.svg", label: "Web" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-800 rounded-lg px-3 py-2 space-x-2"
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPic;
