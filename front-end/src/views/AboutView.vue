<template>
  <div class="search-results-container about padded-view">
    <div class="search-results-header about-title">
      <div class="search-results-header-title">
        <h1>WAC: A Visual Journey</h1>
      </div>
      <button type="button" class="back-button" @click="router.push('/')">
        <div class="back-button-icon">
          <ArrowLeftIcon />
        </div>
        <span>BACK</span>
      </button>
    </div>
    <div>
      <p>
        In 2013, Columbia College Chicago launched the Wabash Arts Corridor to immerse students in
        the creative spirit by using urban spaces and reclaimable resources to revitalize and
        transform the South Loop business district into one of the city's major cultural assets. The
        heart of WAC is Wabash Avenue from Van Buren to Roosevelt and is framed to the east by
        Michigan Avenue and to the west by State Street. The corridor is regarded as an “living
        urban canvas” due to its ever-growing number of large-scale mural installations and
        collaborative projects.
      </p>
      <br />
      <p>See Columbia College's page about the Wabash Arts Corridor for more information.</p>
      <br />
      <p>
        About / Credit This site is a project of Open Tech Strategies, LLC. Our thanks to the
        artists and curators who created and continue to build the Wabash Arts Corridor in Chicago.
        Please write us at info@opentechstrategies.com to suggest changes or improvements to this
        site.
      </p>
      <br />
      <p>
        This site is free & open source software, based on the Arches heritage data management
        platform. See the
        <a href="https://github.com/OpenTechStrategies/arches-app-exp">application code</a>, the
        <a
          href="https://code.librehq.com/ots/arches/arches-demo-data/-/tree/main/wac?ref_type=heads"
          >data</a
        >, and our
        <a href="https://code.librehq.com/ots/arches/arches-demo-data">data import scripts</a>.
        Contributions welcome.
      </p>
      <br />
    </div>
    <div class="credits">
      <div class="credit">
        <p>Designed by</p>
        <a class="welcome-credit" target=”_blank” href="https://opentechstrategies.com/">
          <img
            :src="
              isProd
                ? 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/ots_logo.png'
                : '/ots_logo.png'
            "
            alt="no image available"
            loading="lazy"
          />
        </a>
      </div>
      <div class="credit">
        <p>Powered by</p>
        <a class="welcome-credit" target=”_blank” href="https://www.archesproject.org/">
          <img
            :src="
              isProd
                ? 'https://arches-app-demo.opentechstrategies.com/archesdataviewer/arches_logo.png'
                : '/arches_logo.png'
            "
            alt="no image available"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

const router = useRouter();

const isProd = import.meta.env.PROD;
</script>

<style scoped>
span {
  font-size: 0.875rem;
  text-align: center;
}

.credits {
  display: flex;
  flex-direction: column;
  gap: var(--wac--accessible-spacing--2x);
  flex-wrap: wrap;
}

.credit {
  display: flex;
  align-items: center;
  gap: var(--wac--accessible-spacing--halfx);
}

.credits img {
  max-height: 50px;
  max-width: 150px;
  height: auto;
  object-fit: contain;
}

.about {
  margin: var(--wac--accessible-spacing--2x);
}

.about-title {
  margin-left: 0%;
}
</style>
