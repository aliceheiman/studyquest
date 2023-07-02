"use client"

import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

function Page() {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
      duration: 800
    });
  }, []);

  return (
    <main>

      <section class="hero" data-aos="fade-down">

        <div class="hero__content">
          <h1 class="study__title">Make Studying<br />into an Adventure.</h1>
          <p class="study__description">Study and explore at once.</p>
          <div class="hero__buttons">

            <Link href="/quickplay">
              <button class="study__btn bg">
                Quick Play
              </button>
            </Link>

            <button class="study__btn">
              Dashboard
            </button>
          </div>
        </div>

        <div class="hero__image">
          <img src="mockup.png" alt="mockup" />
        </div>

      </section>

      <section class="steps">

        <div class="steps__description" data-aos="fade-down">
          <div class="study-dividor"></div>
          <h2 class="study__title_sm">Where will you go?</h2>
          <div class="study-dividor"></div>
          <p class="study__description">Start exploring your study material in real life using three easy steps.</p>
        </div>

        <div class="steps__cards" data-aos="fade-right">
          <div class="steps__card">
            <img src="school-1.png" alt="test-tubes" />
            <h3>#1: Enter Flashcards</h3>
            <p>First enter your study questions in a question and answer format.</p>
          </div>

          <div class="steps__card">
            <img src="adventure-4.png" alt="test-tubes" />
            <h3>#2: Place Markers</h3>
            <p>Decide upon a route and place location markers for your questions.</p>
          </div>

          <div class="steps__card">
            <img src="adventure-1.png" alt="test-tubes" />
            <h3>#3: Configure & Explore!</h3>
            <p>Configure and embark on your study adventure!</p>
          </div>
        </div>

      </section>

      <section class="about section">

        <img data-aos="fade-up" class="study__section-divider" src="divider.png" alt="divider" />


        <div class="about__title" data-aos="fade-up">
          <div class="study-dividor"></div>
          <h2 class="study__title_sm">Built with science</h2>
          <div class="study-dividor"></div>
        </div>

        <div class="about__learning">

          <div class="about__img" data-aos="fade-right">
            <img src="vector-1.png" alt="explorer" />
          </div>

          <div class="about__content" data-aos="fade-left">

            <p class="study__description-sm">Active recall, active life, active learning. By combining physical movement with the acquisition of knowledge, we unlock many benefits that surpass traditional passive learning methods.</p>

            <div class="about__list">
              <div class="about__list-item">
                <img src="icon-check.png" alt="checkmark" />
                <h4>Better retention</h4>
              </div>
              <div class="about__list-item">
                <img src="icon-check.png" alt="checkmark" />
                <h4>Increased engagement</h4>
              </div>
              <div class="about__list-item">
                <img src="icon-check.png" alt="checkmark" />
                <h4>Improved physical well-being</h4>
              </div>
            </div>

          </div>

        </div>


        <div class="about__cards">

          <article class="about__card" data-aos="fade-up">
            <h3 class="study__title_sm">Active Recall</h3>
            <p class="study__description">Flashcards are effective as they force us to actively recall information which strengthens our neurological pathways.</p>
            <p class="about__card-number">01</p>
            <div class="about__card-overlay"></div>
            <img src="nature-1.jpg" alt="mountains" />
          </article>

          <article class="about__card" data-aos="fade-up">
            <h3 class="study__title_sm">Study of Loci</h3>
            <p class="study__description">Humans are better at remembering people and places than text and numbers.</p>
            <p class="about__card-number">02</p>
            <div class="about__card-overlay"></div>
            <img src="nature-2.jpg" alt="mountains" />
          </article>

          <article class="about__card" data-aos="fade-up">
            <h3 class="study__title_sm">Physical Activity</h3>
            <p class="study__description">Being active helps strengthen our memory, make us more creative, and makes it easier to learn new things.</p>
            <p class="about__card-number">03</p>
            <div class="about__card-overlay"></div>
            <img src="nature-3.jpg" alt="mountains" />
          </article>

        </div>

      </section>

      <section class="cta section" data-aos="fade-up">
        <div class="study-dividor"></div>
        <h2 class="study__title_sm">Ready to dive in?</h2>
        <div class="study-dividor"></div>
        <p class="study__description">Make studying into an adventure.</p>
        <img src="vector-2.png" alt="playing" />

        <div class="cta__buttons">
          <Link href="/quickplay">
            <button class="study__btn bg">
              Quick Play
            </button>
          </Link>

          <Link href="/dashboard">
            <button class="study__btn">
              Dashboard
            </button>
          </Link>

        </div>
      </section>



    </main>
  )
}

export default Page;