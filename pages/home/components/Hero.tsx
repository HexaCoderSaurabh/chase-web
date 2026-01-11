"use client";

import { Button } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React from "react";
import { slideFromLeft, slideFromRight } from "../../../constants";
export function Hero() {
  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="">
        <div className="grid auto-cols-fr grid-cols-1 border border-border-primary lg:grid-cols-2 overflow-hidden">
          
          {/* DIV 1 – from right */}
          <motion.div
            id="div1"
            className="flex flex-col justify-center p-8 md:p-12"
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Build the body you want
            </h1>
            <p className="md:text-md">
              Train hard. Track harder. We give you the tools to measure every
              rep, every set, every victory. Your membership, your progress, all
              in one place.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Join" variant="primary">
                Join
              </Button>
              <Button title="Learn" variant="secondary">
                Learn
              </Button>
            </div>
          </motion.div>

          {/* DIV 2 – from left */}
          <motion.div
            id="div2"
            className="flex items-center justify-center"
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
            >
              <source src="hero2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
