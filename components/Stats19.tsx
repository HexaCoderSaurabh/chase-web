"use client";

import React from "react";

export default function Stats19() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Proof</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            The numbers speak
          </h2>
          <p className="md:text-md">Real results from people who showed up</p>
        </div>
        <div className="grid grid-cols-1 gap-y-6 md:gap-y-0 lg:grid-cols-[1fr_0.5fr]">
          <div>
            <img
              className="aspect-[3/2] size-full object-cover"
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Chase placeholder image"
            />
          </div>
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8 md:gap-y-12 md:p-8 lg:grid-cols-1 lg:gap-x-0 lg:p-12">
            <div>
              <p className="mb-2 text-6xl font-bold leading-[1.2] md:text-9xl lg:text-10xl">
                5000
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl">
                Active members
              </h3>
            </div>
            <div>
              <p className="mb-2 text-6xl font-bold leading-[1.2] md:text-9xl lg:text-10xl">
                150
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl">
                Classes weekly
              </h3>
            </div>
            <div>
              <p className="mb-2 text-6xl font-bold leading-[1.2] md:text-9xl lg:text-10xl">
                25
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl">
                Years strong
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
