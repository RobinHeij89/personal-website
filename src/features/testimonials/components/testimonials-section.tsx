/**
 * ## Component: TestimonialsSection
 * 
 * ### Purpose:
 * Displays testimonials from colleagues and clients about Robin's work
 * and professional qualities. Showcases social proof and recommendations.
 * 
 * ### Props:
 * None - static content component
 * 
 * ### Example:
 * ```tsx
 * <TestimonialsSection />
 * ```
 */

import React from 'react';
import styles from './testimonials-section.module.css';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Michel van Heest",
    role: "Product Designer",
    company: "YipYip",
    highlight: "Robin is a front-end engineer who's great to work with as a product designer.",
    content: "Because of his background in design, he's able to ask the right questions that help designers think critically about their design choices and find the best solution to hard problems together. Robin's drive to improve processes across the organization makes him a pleasure to work with. He excels in visual implementation of designs, and builds products that feel fast and reliable to use."
  },
  {
    name: "Frank van Zwieteren",
    role: "Social entrepreneur and Project Manager",
    company: "YipYip",
    highlight: "Robin is a highly skilled frontend developer with a keen eye for design.",
    content: "Thanks to his background in design, Robin is able to approach projects with a unique perspective that combines aesthetic appeal with efficient functionality. He goes above and beyond in his efforts to optimize processes within projects, while also taking a broader view of the organization to identify areas where we can work more efficiently."
  },
  {
    name: "Filip van Harreveld",
    role: "Front-end developer",
    company: "iO",
    highlight: "Robin consistently showed a strong work ethic, an insatiable curiosity, eager to learn.",
    content: "Robin has a creative approach to problem-solving that contributed significantly to the success of our projects. Having Robin on the team always brings good energy. Besides all of that, Robin is a great guy to have a beer and a good conversation with."
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className={styles["testimonials-section"]} id="testimonials">
      <div className={styles["testimonials-section__content"]}>
        <div className={styles["testimonials-section__header"]}>
          <div className={styles["testimonials-section__decorative-header"]}>
            <span className={styles["testimonials-section__symbol"]}>×</span>
            <span className={styles["testimonials-section__subtitle"]}>TESTIMONIALS</span>
            <span className={styles["testimonials-section__symbol"]}>×</span>
          </div>
          
          <h2 className={styles["testimonials-section__title"]}>
            WHAT OTHERS SAY <span className={styles["testimonials-section__title-highlight"]}>⁂</span>
          </h2>
        </div>
        
        <div className={styles["testimonials-section__grid"]}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles["testimonials-section__item"]}>
              <div className={styles["testimonials-section__quote"]}>
                <p className={styles["testimonials-section__quote-highlight"]}>"{testimonial.highlight}"</p>
                <p className={styles["testimonials-section__quote-content"]}>{testimonial.content}</p>
              </div>
              
              <div className={styles["testimonials-section__author"]}>
                <div className={styles["testimonials-section__author-info"]}>
                  <h4 className={styles["testimonials-section__author-name"]}>{testimonial.name}</h4>
                  <p className={styles["testimonials-section__author-role"]}>{testimonial.role}</p>
                  <p className={styles["testimonials-section__author-company"]}>{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};