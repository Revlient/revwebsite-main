"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';



export default function ZoomLockShowcaseSection({
  title = <>Best CMS Web Development<br />Services in Kerala</>,
  leadText = "Our website is more than a digital presence—it's your brand's first impression, sales engine, and communication hub. At WAC, we provide the best CMS web development services in Kerala, building custom websites and content management systems that combine stunning UI/UX, high performance, and enterprise reliability—giving you complete control over your content with zero technical dependency.",
  mediaType = "image",
  mediaSrc = "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1600&auto=format&fit=crop"
}) {
  const containerRef = useRef(null);

  // Track the scroll of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate scales and rounded corners for the zooming image
  // 0% -> starts as a banner, 60% -> becomes full screen and locked
  const imageWidth = useTransform(scrollYProgress, [0, 0.6], ["85%", "100%"]);
  const imageHeight = useTransform(scrollYProgress, [0, 0.6], ["55vh", "100vh"]);
  const imageRadius = useTransform(scrollYProgress, [0, 0.6], ["24px", "0px"]);
  const imageYOffset = useTransform(scrollYProgress, [0, 0.6], ["30px", "0px"]);

  // Overlay text appears right as it locks (from 0.2 to 0.5 progress) and fades out as content scrolls up
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.75], [0, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);
  const textTranslateY = useTransform(scrollYProgress, [0.2, 0.5], ["40px", "0px"]);

  // Lock the content section from scrolling up by translating it down until the image is full screen
  const contentY = useTransform(scrollYProgress, [0, 0.6, 1.0], ["0vh", "120vh", "0vh"]);

  // Fade out media and floating rail once the content covers them (between 0.8 and 1.0 progress)
  const mediaOpacity = useTransform(scrollYProgress, [0.8, 1.0], [1, 0]);



  const approachItems = [
    {
      title: "Design That Performs",
      description: "Every website combines aesthetics, usability, speed, and accessibility from the ground up."
    },
    {
      title: "CMS Flexibility",
      description: "Empower your team to publish and update content through intuitive, role-based workflows easily."
    },
    {
      title: "Performance Focus",
      description: "Optimized for core search algorithms, Core Web Vitals, mobile responsiveness, and high-performance server caches."
    },
    {
      title: "Scalable Architecture",
      description: "Built using modern frameworks designed specifically to scale with your expanding global workload."
    }
  ];

  return (
    <div 
      ref={containerRef} 
      className="zoom-lock-section"
    >
      {/* Sticky container backing the viewport */}
      <div className="zoom-lock-sticky">
        


        {/* Central interactive zoom image locked wrapper */}
        <div className="zoom-lock-img-wrap">
          <motion.div 
            style={{
              width: imageWidth,
              height: imageHeight,
              borderRadius: imageRadius,
              y: imageYOffset,
              opacity: mediaOpacity,
            }}
            className="zoom-lock-img-container"
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                autoPlay
                muted
                loop
                playsInline
                className="zoom-lock-img"
              />
            ) : (
              <img 
                src={mediaSrc}
                className="zoom-lock-img"
                alt="High-fidelity interface presentation mock"
                referrerPolicy="no-referrer"
              />
            )}
            {/* Dark vignette gradient overlay */}
            <div className="zoom-lock-vignette" />


          </motion.div>
        </div>

        {/* Dynamic Big Overlay text locked on lock position (fades in when scale is complete) */}
        <div className="zoom-lock-text-overlay">
          <motion.div
            style={{
              opacity: textOpacity,
              scale: textScale,
              y: textTranslateY
            }}
            className="zoom-lock-text-content"
          >
            <h2 className="zoom-lock-title">
              {title}
            </h2>
          </motion.div>
        </div>



      </div>

      {/* Overlapping Content Section (scrolls up normally to layer over the bottom of sticky frame) */}
      <motion.div 
        style={{ y: contentY }}
        className="zoom-lock-content"
      >
        <div className="zoom-lock-content-inner">
          
          {/* Main detailed descriptive paragraph block */}
          <div className="zoom-lock-lead-wrap">
            <p className="zoom-lock-lead">
              {leadText}
            </p>
          </div>

          {/* Grid Layout of "Our Approach" matching the video exactly */}
          <div className="zoom-lock-grid">
            
            {/* Sticky/pinned left sidebar: "Our Approach" title */}
            <div className="zoom-lock-sidebar">

              <h3 className="zoom-lock-sidebar-title">
                Our Approach
              </h3>
              <p className="zoom-lock-sidebar-desc">
                We believe in transparent engineering, custom-tuned speed states, and fluid interfaces that empower editors while breathtaking customers.
              </p>
            </div>

            {/* Sliding step cards list on the right hand */}
            <div className="zoom-lock-cards">
              {approachItems.map((item, index) => (
                <div 
                  key={index}
                  className="zoom-lock-card"
                >

                  <div>
                    <h4 className="zoom-lock-card-title">
                      {item.title}
                    </h4>
                    <p className="zoom-lock-card-desc">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </motion.div>

    </div>
  );
}
