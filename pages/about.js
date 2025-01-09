import React from "react";

export default function About() {
  return (
    <main className="relative max-w-screen-lg mx-auto mt-8 p-3">
      <div className="w-full mt-32 my-5 px-3">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Sparks System Concepts
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          The <strong>Sparks System</strong> is an innovative framework designed
          to enhance your understanding of key concepts related to energy,
          creativity, and productivity. This page serves as a comprehensive
          guide, breaking down the essential components that make up the Sparks
          System, aiming to help you navigate the core principles behind it.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What is the Sparks System?
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            At its foundation, the Sparks System is based on the idea that
            energy, both mental and physical, is the driving force behind
            creativity, focus, and personal productivity. It identifies various
            types of "sparks" or triggers that ignite motivation, helping
            individuals move through different tasks and challenges in daily
            life.
          </p>
          <p className="text-lg text-gray-700">
            These sparks can be internal or external, serving as stimuli that
            influence how we think, act, and engage with the world.
            Understanding what sparks your creativity or productivity is key to
            mastering the system.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Key Concepts Explained
          </h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
            <li>
              <strong>Spark Types:</strong> The Sparks System categorizes sparks
              into emotional, intellectual, and physical categories. Emotional
              sparks include things like passion and excitement, while
              intellectual sparks are based on curiosity or problem-solving.
              Recognizing these sparks can help you understand your motivations
              and optimize your productivity.
            </li>
            <li>
              <strong>Energy Cycles:</strong> Energy fluctuates throughout the
              day in natural cycles. Understanding these cycles allows
              individuals to align their work with periods of high energy for
              maximum output, or take restorative breaks when energy is low.
            </li>
            <li>
              <strong>Spark Triggers:</strong> The Sparks System helps identify
              triggers that activate different types of sparks. Whether it's a
              creative challenge, a sense of purpose, or even external factors
              like a change of environment, knowing your triggers is key to
              sustaining productivity.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Applying the Sparks System
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            To fully harness the Sparks System, it's important to map your tasks
            and goals to the different spark types and energy cycles. This
            allows you to maximize creative output and maintain consistent
            progress in whatever you do.
          </p>
          <p className="text-lg text-gray-700">
            By recognizing and responding to your energy levels and spark
            triggers, you'll be able to focus more effectively, experience less
            burnout, and achieve greater satisfaction in your work.
          </p>
        </section>
      </div>
    </main>
  );
}
