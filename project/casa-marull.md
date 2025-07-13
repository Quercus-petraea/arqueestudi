---
layout: layouts/project.njk
permalink: /project/casa-marull/
title: Casa Marull
folder: casa-marull
---

<!-- Your project HTML content goes here but only the inside of the main container -->

<section class="container-fluid px-0">
  <section class="ratio-full ratio-16x9 hero-image">
    {% responsive_image_hero "casa-marull", "01", "Hero image of Casa Marull" %}

  </section>

  <div class="bg-light" style="margin-top: 40px;">
    <div class="justify-content-center">
      <h5 class="text-center mb-4 d-block d-sm-none">{{ title }}</h5>
      <div class="justify-content-center"></div>
    </div>

    <div class="container-fluid">
					
      <!-- Split Text + Image Block -->
      <div class="row align-items-center mt-xl">
        <!-- Image column aligned to the left -->
        <div class="col-lg-6 col-md-6">
          {% responsive_image "casa-marull", "04", "Foto de la casa Marull", "ratio ratio-1x1" %}
        </div>
        <!-- Text column aligned to the right -->
        <div class="col-lg-4 col-md-5 ms-auto">
          <p class="project-text lh-base py-5">
          L’espai central, semblant a un pati interior, permet que la llum natural...
          El projecte consisteix en el disseny i la rehabilitació integral d’un nou saló de bellesa...
          El projecte consisteix en el disseny i la rehabilitació integral d’un nou
          saló de bellesa... (continua el text)
          L’espai central, semblant a un pati interior, permet que la llum natural...
          El projecte consisteix en el disseny i la rehabilitació integral d’un nou saló de bellesa...
          El projecte consisteix en el disseny i la rehabilitació integral d’un nou
          saló de bellesa... (continua el text)
          </p>
        </div>
      </div>

      <!-- Split Image + Image Block -->
      <div class="row align-items-center mt-xxl">
        <!-- Image column aligned to the left -->
        <div class="col-lg-5 col-md-5">
          {% responsive_image "casa-marull", "04", "Foto de la casa Marull", "ratio ratio-3x4" %}
        </div>
        <!-- Text column aligned to the right -->
        <div class="col-lg-5 col-md-5 ms-auto">
          {% responsive_image "casa-marull", "06", "Foto de la casa Marull", "ratio ratio-3x4" %}
        </div>
      </div>

      <!-- Split Text + Image Block -->
      <div class="row align-items-center mt-xxl">
        <!-- Text column aligned to the right -->
        <div class="col-lg-3 col-md-4 col-sm-12">
          <p class="project-text lh-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat laborum.	
          </p>
        </div>
        <!-- Image column aligned to the left -->
        <div class="col-lg-7 col-md-7 ms-auto">
          {% responsive_image "casa-marull", "03", "Foto de la casa Marull", "ratio ratio-1x1" %}
        </div>
      </div>
    </div>
  </div>
</section>


