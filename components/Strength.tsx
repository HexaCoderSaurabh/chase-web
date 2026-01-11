"use client";

import { Button } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};

export default function Strength() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Strength</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            What makes us different
          </h1>
          <p className="md:text-md">Iron that knows your name and weight</p>
        </div>

        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {[
            // Data array for convenience
            {
              title: "Equipment",
              subtitle: "Machines built to last and hands to guide you",
              button: "Coaching",
              img: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
            },
            {
              title: "Trainers who understand the work",
              subtitle: "Real instruction from people who have done it",
              button: "Tracking",
              img: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
            },
            {
              title: "See what you have built over time",
              subtitle: "Numbers that tell your story better than words",
              button: "Explore",
              img: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <motion.div
                className="flex flex-col border border-border-primary"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="flex w-full flex-col items-center justify-center self-start">
                  <img
                    src={item.img}
                    alt={`Relume placeholder image ${idx + 1}`}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                  <div>
                    <p className="mb-2 font-semibold">{item.title}</p>
                    <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                      {item.subtitle}
                    </h2>
                    <p>Explore</p>
                  </div>
                  <div className="mt-5 md:mt-6">
                    <Button
                      title={item.button}
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                    >
                      {item.button}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
