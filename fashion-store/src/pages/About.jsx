import React from 'react';

export default function About() {
  const pillars = [
    {
      number: '01',
      title: 'Radical Slow-Fashion',
      description: 'We work in small-batch releases to drastically mitigate waste and preserve artistic integrity across every design loop.',
    },
    {
      number: '02',
      title: 'Architectural Cuts',
      description: 'Influenced by spatial minimalism, our silhouettes prioritize deliberate draping, clean utility lines, and form functionality.',
    },
    {
      number: '03',
      title: 'Textile Origin',
      description: 'We select certified biological cottons, recycled linens, and premium Japanese deadstock wool down to the last trim.',
    },
  ];

  return (
    <div className="about-page">
      {/* Editorial Intro Section */}
      <section className="fashion-intro">
        <div className="page-container grid-2-col">
          <div className="intro-text-block">
            <span className="section-subtitle">THE ATELIER</span>
            <h1 className="section-title">
              Designed with intentional structure and raw minimalism.
            </h1>
            <hr className="accent-line" />
            <p className="body-text">
              Founded in Sydney, Studio 32 reimagines daily curation. We bypass transient trends to craft thoughtful garments focused on silhouette, tactile geometry, and structural permanence.
            </p>
            <p className="body-text">
              Every piece is built responsibly, using globally sourced premium textiles engineered to endure. We craft curated capsules for those who view style as a quiet statement of identity.
            </p>
          </div>
          <div className="intro-image-block">
            <img 
              src="https://i.pinimg.com/736x/24/b9/6d/24b96d3c2d8f31bbd663ee0223bfeaa8.jpg" 
              alt="Minimalist Fashion Silhouette" 
            />
          </div>
        </div>
      </section>

      {/* Brand Pillars / Manifesto Section */}
      <section className="fashion-pillars">
        <div className="page-container">
          <div className="center-header">
            <span className="section-subtitle">OUR ETHOS</span>
            <h2 className="section-title">The Studio Pillars</h2>
            <hr className="accent-line center-line" />
          </div>

          <div className="grid-3-col">
            {pillars.map((pillar) => (
              <div className="pillar-card" key={pillar.number}>
                <div className="pillar-number">{pillar.number}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}