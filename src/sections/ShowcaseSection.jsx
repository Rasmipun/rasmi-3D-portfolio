

const ShowcaseSection = () => {
  return (
    <div id="work" className="app-showcase">
       <div className="w-full">
            <div className="showcaselayout">
                {/* LEFT */}
                <div className="first-project-wrapper">
                  <div className="">
                    <img src="/images/project1.png" alt="NepTechpal" 
                    />
                  </div>
                  <div className="text-content">
                    <h2>
                        IT company that craft high-performance website,
                        mobile, apps and data-driven digital marketing
                        campaigns called NepTechPal.
                    </h2>
                    <p className="text-white-50 md:text-xl">
                        An app built with Nextjs, Expo, TailwindCss, Framer-motion for a 
                        fast, user-friendly experience.
                    </p>
                  </div>
                </div>
                {/* RIGHT */}
            </div>
       </div>
    </div>
  )
}

export default ShowcaseSection;