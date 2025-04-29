import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
// import logo from '../new.jpg'
// import '.././index.css'
import img from '../icons/recurring.png'
import ai from '../icons/ai.png'
import web from '../icons/web.png'

export const Hero = () => {
  const navigate = useNavigate();

  const paths = ["#path2", "#path1", "#animatedPath"];
  const images = [img, ai, web ]
  const durations = ['10s', '10s', '4s']
  const begins    = ['0s',   '5s',   '0s'];

  return (
    // // bg-gradient-to-b // bg-gradient-to-br from-blue-100 to-pink-100
    <div className="bg-black relative min-h-screen pt-16">       
      <div className="max-w7xl max-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between h-full py-2">

        {/* Left: Tagline and CTA */}
        <div className="order-2 lg:order-1 text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Transforming Ideas into
            <span className=""> Digital Reality</span>
          </h1>
          <p className="text-xl text-yello mb-8 max-w-2xl">
            We specialize in creating innovative software solutions that help businesses grow and succeed in the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:jusity-start">
            <Button size="lg" className="group" onClick={() => navigate("/auth")}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/portfolio")}>
              View Portfolio
            </Button>
          </div>
        </div>

        {/* Right: SVG Graphics */}
        <div className="order-1 lg:order-2 relative lg:w-1/2 w-full h-96 md:ml-14 mt-12 lg:mt-0 justify-center items-center">
          <svg
            viewBox="0 0 450 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="w-full max-w-md h-auto"
          >
            <defs>
              <path id="path2" className="stroke-animation" stroke="#fff" stroke-dasharray="3.75 3.75" strokeWidth="1.404" d="m233.207 303.698-2.843 4.697a27.151 27.151 0 0 1-23.228 13.092H162.52c-14.996 0-27.152 12.156-27.152 27.151v65.538M156.824 201.05H97.84c-9.824 0-17.789 7.964-17.789 17.789v43.068c0 9.824-7.964 17.789-17.789 17.789H.002M130.607 201.05l-12.925-7.271a18.724 18.724 0 0 1-9.545-16.32v-37.734c0-10.342-8.383-18.725-18.725-18.725H3.745M138.176 1.288V38.27c0 10.858 8.802 19.661 19.661 19.661h51.026c10.859 0 19.662 8.803 19.662 19.662v76.304" />
              <path id="path1" className="stroke-animation" stroke="#fff" stroke-dasharray="3.75 3.75" strokeWidth="1.404" d="M312.729 198.837h58.984c9.824 0 17.789-7.964 17.789-17.789V137.98c0-9.824 7.964-17.789 17.788-17.789h62.261M338.945 198.837l12.926 7.271a18.723 18.723 0 0 1 9.544 16.32v37.734c0 10.342 8.384 18.725 18.726 18.725h85.667M323.086 413.24v-36.982c0-10.859-8.803-19.662-19.661-19.662h-51.026c-10.859 0-19.662-8.802-19.662-19.661v-93.157" />
              <path id="animatedPath" className="stroke-animation" stroke="#fff" strokeDasharray="3.75 3.75" strokeWidth="1.404" d="m228.055 110.83 2.842-4.697a27.151 27.151 0 0 1 23.228-13.092h44.617c14.995 0 27.151-12.156 27.151-27.152V.351"/>
            </defs>
            {paths.map((pathId, idx) => (
              <image
                key={idx} 
                href={images[idx]}
                xlinkHref={images[idx]}
                x="0" 
                y="0" 
                width="30" 
                height="30" 
              > 
               <animateMotion
                  dur={durations[idx]}
                  begin={begins[idx]}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={pathId}  />
                </animateMotion>
            </image>
            ))}
            
            <use href="#animatedPath" stroke="#fff" strokeDasharray="3.75 3.75" strokeWidth="1.4" fill="none" className="stroke-animation" />
            <use href="#path2" stroke="#fff" strokeDasharray="3.75 3.75" strokeWidth="1.4" fill="none" className="stroke-animation" />
            <use href="#path1" stroke="#fff" strokeDasharray="3.75 3.75" strokeWidth="1.4" fill="none" className="stroke-animation" />
            
            {/* <text x="50%" y="50%" text-anchor="middle" fill="#fff" font-size="5vw" font-family="Arial, sans-serif">
              Clover 
              Tech
            </text> */}
            {/* <path fill="url(#a)" d="M303.352 185.647c11.235 6.487 11.235 22.703 0 29.19l-122.884 70.947c-11.235 6.486-25.279-1.622-25.279-14.595V129.295c0-12.973 14.044-21.081 25.279-14.595l122.884 70.947Z" /> */}
            <text
              x="191.788"
              y="196.237"
              fill="#fff"                        
              fontFamily="Arial, sans-serif" 
              fontSize="14"                  
              letterSpacing="0.5"
            >
                <tspan x="191.788" dy="0">Clover—</tspan>
                <tspan x="191.788" dy="1.2em">Tech</tspan>
            </text>
            {/* <path fill="#fff" d="M191.788 182.179h-5.068l-4.505 14.058h2.715l1.247-3.861h6.235l1.307 3.861h2.715l-4.646-14.058Zm-4.887 7.964 2.353-7.26 2.414 7.26h-4.767Zm13.249 6.114v-14.078h-2.494v14.078h2.494Zm5.498-10.377v-3.701h-2.494v3.701h-1.509v1.95h.242s1.267 0 1.267 1.388v4.485a2.544 2.544 0 0 0 2.554 2.554h1.709v-2.212h-.985a.799.799 0 0 1-.784-.784v-3.862c0-1.488-3.158-1.569-3.681-1.569h5.45v-1.95h-1.769Zm-15.509 21.333s-2.695-.623-2.775-.644c-.905-.241-1.67-.683-1.67-1.609 0-1.005 1.227-1.83 2.776-1.83 1.89 0 2.956 1.167 2.956 2.313h2.635c0-2.453-1.911-4.525-5.591-4.525-3.118 0-5.41 1.669-5.41 4.063 0 2.473 1.568 3.66 3.861 4.183 0 0 2.715.623 2.776.644 1.045.261 1.91.784 1.91 1.81 0 1.267-1.569 2.071-3.218 1.93-2.232-.181-3.057-1.649-3.057-2.695h-2.614c0 2.293 1.91 4.827 5.712 4.928 2.855.06 5.812-1.509 5.812-4.163 0-2.454-1.689-3.822-4.103-4.405Zm10.512 6.215c-1.589 0-2.434-1.509-2.434-3.238 0-1.75 1.046-3.238 2.414-3.238 1.086 0 1.95.804 2.252 1.91h2.695c-.442-2.594-2.514-4.123-4.968-4.123-2.755 0-5.148 2.414-5.008 5.772.121 3.138 2.374 5.109 5.069 5.109 2.514 0 4.384-1.669 4.867-3.942h-2.776c-.221.905-1.025 1.75-2.111 1.75Zm11.979-8.649c-1.529.121-2.836 1.71-2.856 4.506.02-1.388.643-2.394 2.071-2.394 1.569 0 2.072 1.167 2.072 2.454v6.054h2.514V208.5c0-2.413-1.991-3.861-3.801-3.721Zm-5.35-3.459v14.079h2.494V201.32h-2.494Zm15.92 3.419c-2.675 0-5.128 1.991-5.128 5.451 0 3.459 2.413 5.41 5.128 5.43 2.735-.02 5.149-1.991 5.149-5.43 0-3.46-2.474-5.451-5.149-5.451Zm0 8.669c-1.327 0-2.614-1.046-2.614-3.218 0-2.052 1.267-3.218 2.614-3.238 1.368.02 2.635 1.206 2.635 3.238 0 2.172-1.287 3.218-2.635 3.218Zm11.588-8.669c-2.675 0-5.128 1.991-5.128 5.451 0 3.459 2.413 5.41 5.128 5.43 2.735-.02 5.149-1.991 5.149-5.43 0-3.46-2.474-5.451-5.149-5.451Zm0 8.669c-1.327 0-2.614-1.046-2.614-3.218 0-2.052 1.267-3.218 2.614-3.238 1.368.02 2.635 1.206 2.635 3.238 0 2.172-1.287 3.218-2.635 3.218Zm9.416 1.991V201.32h-2.494v14.079h2.494Zm.03-22.213h-34.121v3.051h34.121v-3.051Z" /> */}
            <defs>
              <linearGradient id="a" x1="180" y1="129" x2="180" y2="285" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0E52AE" />
                <stop offset="1" stopColor="#00D2FF" />
              </linearGradient>
            </defs>
          </svg>
          
        </div>        
      </div>
    </div>
  );
};


/** 
 * from-primary/5  to-white 
 * bg-primary/20
 *  bg-secondary/20
 * text-gray-900
 * "text-primary
 */