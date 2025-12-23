import React from 'react';
import SEO from '@/components/SEO';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import MissionVisionValues from '@/components/home/MissionVisionValues';
import ChallengeSolutionSection from '@/components/home/ChallengeSolutionSection';
import ProjectsSection from '@/components/home/ProjectsSections';
import GallerySection from '@/components/home/GallerySection';
import QuestionnairePreview from '@/components/home/QuestionnairePreview';
import DonateSection from '@/components/home/DonateSection';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <>
      <SEO
        title="Mzansi Prolife Development Institute NPC - Empowering Communities Through Safety, Skills, and Self-Reliance"
        description="Mzansi Prolife Development Institute NPC enables and improves the lives of ordinary citizens of South Africa to achieve extraordinary outcomes through community empowerment, skills development, and social change."
        keywords="Mzansi Prolife, Development Institute, NPC, South Africa, Community Development, Skills Development, Social Change, Non-Profit, Nelspruit"
      />
      <div className="min-h-screen">
        <HeroSection />
        <AboutPreview />
        <MissionVisionValues />
        <ChallengeSolutionSection />
        <ProjectsSection />
        <GallerySection />
        <QuestionnairePreview />
        <DonateSection />
        <ContactSection />
      </div>
    </>
  );
}