"use strict";

const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  nav.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

const phases = [
  {
    phase: 'P0 · Harmonization',
    title: 'Prepare heterogeneous geospatial inputs',
    copy: 'Normalize formats, coordinate reference systems and attributes so every production plot can enter a consistent and reproducible workflow.',
    points: ['GeoJSON, Shapefile, GeoPackage and related inputs', 'CRS detection and reprojection', 'Schema and attribute normalization'],
    visual: ['INPUT', 'STANDARD']
  },
  {
    phase: 'P1 · Topology repair',
    title: 'Detect and repair invalid plot geometries',
    copy: 'Identify self-intersections, spikes, duplicate vertices and fragmented geometries, then generate valid candidate repairs while preserving traceability.',
    points: ['Geometry diagnostics and error codes', 'Multi-candidate repair generation', 'Area and shape-change metrics'],
    visual: ['INVALID', 'CANDIDATES']
  },
  {
    phase: 'P2 · Active-learning farmer queue',
    title: 'Route uncertain cases to human review',
    copy: 'Prioritize plots with ambiguous repairs or weak evidence so farmers can confirm, reject, correct or redraw their boundaries.',
    points: ['Uncertainty-based queue ordering', 'Farmer decisions and correction types', 'Feedback for future recommendations'],
    visual: ['UNCERTAIN', 'REVIEW']
  },
  {
    phase: 'P3 · WHISP model integration',
    title: 'Connect validated plots to EUDR evidence',
    copy: 'Submit production plots to WHISP and combine forest, tree-cover and land-use indicators in an interpretable compliance assessment.',
    points: ['WHISP risk screening', 'Forest loss and tree-cover indicators', 'Structured compliance outputs'],
    visual: ['PLOT', 'WHISP']
  },
  {
    phase: 'P4 · Additional evidence',
    title: 'Enrich decisions with Earth Observation and GeoAI',
    copy: 'Integrate semantic and contextual layers to improve boundary understanding and provide value beyond compliance.',
    points: ['Local Biomass and cadastral Layers', 'SRTM score', 'Explainable multi-source evidence'],
    visual: ['EO + AI', 'INSIGHTS']
  }
];

const phaseButtons = document.querySelectorAll('[data-step]');
function setPhase(index) {
  const phase = phases[index];
  document.getElementById('phase').textContent = phase.phase;
  document.getElementById('phase-title').textContent = phase.title;
  document.getElementById('phase-copy').textContent = phase.copy;
  document.getElementById('phase-points').innerHTML = phase.points.map(item => `<li>${item}</li>`).join('');
  document.getElementById('phase-visual').innerHTML = `<span>${phase.visual[0]}</span><b>→</b><span>${phase.visual[1]}</span>`;
  phaseButtons.forEach((button, idx) => button.setAttribute('aria-selected', String(idx === index)));
}
phaseButtons.forEach((button, index) => {
  button.addEventListener('click', () => setPhase(index));
});

const slides = {
  7: {
    t: 'Manage production plots at a glance',
    d: 'Plot summaries, geometry confidence scores, upload options and clear status categories help users identify which parcels are valid, pending or require attention.',
    tags: ['Plot summary', 'Confidence score', 'Upload'],
    alt: 'GeoFarmer parcels window'
  },
  8: {
    t: 'Inspect, edit and confirm parcel boundaries',
    d: 'The geospatial component combines visual parcel inspection with geometry diagnostics, technical indicators and clear confirm, adjust or reject actions.',
    tags: ['Map inspection', 'Edit vertices', 'Farmer decision'],
    alt: 'GeoFarmer verification window'
  },
  9: {
    t: 'Understand compliance status per plot',
    d: 'Certified plot summaries and EUDR attributes make the compliance result traceable, while plot-level descriptions explain what still needs review.',
    tags: ['EUDR status', 'Attribute table', 'PDF report'],
    alt: 'GeoFarmer EUDR status window'
  },
  10: {
    t: 'Keep a transparent audit trail',
    d: 'Edits, confirmations, rejections, WHISP submissions and confidence scores remain visible as an understandable history of decisions.',
    tags: ['Provenance', 'Decision log', 'Auditability'],
    alt: 'GeoFarmer activity window'
  },
  11: {
    t: 'Translate environmental evidence into a clear verdict',
    d: 'Forest loss, tree-cover, NDVI and compliance indicators are summarized in a farmer-friendly risk screen with a report export option.',
    tags: ['Forest loss', 'Tree cover', 'NDVI'],
    alt: 'GeoFarmer WHISP analysis window'
  },
  12: {
    t: 'Export actionable compliance documentation',
    d: 'The prototype generates both a multi-plot EUDR summary and a detailed parcel-level compliance report for communication and record keeping.',
    tags: ['Summary report', 'Parcel report', 'Export'],
    alt: 'GeoFarmer EUDR report examples'
  }
};

const galleryButtons = document.querySelectorAll('[data-slide]');
const galleryImage = document.getElementById('gallery-image');
if (galleryImage) {
  galleryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const slideNumber = Number(button.dataset.slide);
      const slide = slides[slideNumber];
      galleryImage.src = `pics/dashboard/slide-${slideNumber}.jpg`;
      galleryImage.alt = slide.alt;
      document.getElementById('gallery-title').textContent = slide.t;
      document.getElementById('gallery-description').textContent = slide.d;
      document.getElementById('gallery-tags').innerHTML = slide.tags.map(tag => `<span>${tag}</span>`).join('');
      galleryButtons.forEach(item => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });
    });
  });
}

const impact = {
  'Digital inclusion': 'Make complex geospatial evidence more accessible to smallholder farmers with limited technical capacity.',
  'RegTech': 'Translate regulatory requirements into transparent, repeatable and auditable digital workflows.',
  'Geospatial democratization': 'Bring advanced Earth Observation and GeoAI capabilities closer to users who are normally excluded from them.',
  'Scalability': 'Provide a modular blueprint that can be adapted to other commodities, regions and compliance contexts.'
};
const impactButtons = document.querySelectorAll('[data-impact]');
if (impactButtons.length) {
  impactButtons[0].classList.add('active');
  impactButtons.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.impact;
      document.getElementById('impact-title').textContent = key;
      document.getElementById('impact-copy').textContent = impact[key];
      impactButtons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
    });
  });
}
