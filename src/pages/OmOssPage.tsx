import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function OmOssPage() {
  useEffect(() => {
    document.title = 'Om oss & Kontakt | PluggPaus';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tillbaka till alla spel
        </Link>
      </div>

      <div className="pp-panel p-8 sm:p-12 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Om PluggPaus</h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          <strong>PluggPaus</strong> är en kuraterad plattform som hjälper studenter att maximera sin
          produktivitet genom kontrollerade mikropauser. Vår mission är att erbjuda vetenskapligt
          förankrade studiepauser som förbättrar fokus, minne och välmående.
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Forskning visar att strategiska pauser på 5–10 minuter mellan studiepass förbättrar
          informationsretention och minskar mental trötthet. Alla spel på PluggPaus är noggrant
          utvalda för att aktivera olika kognitiva funktioner – från mönsterigenkänning till
          strategiskt tänkande – vilket ger din hjärna en aktiv återhämtning istället för passiv
          scrollning.
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
          Plattformen grundades 2024 av <strong>Eken</strong>, systemvetarstudent med passion för
          EdTech och kognitiv psykologi. Projektet kombinerar teknisk innovation med evidensbaserad
          pedagogik för att skapa den ultimata studiehjälpen.
        </p>

        <hr className="border-gray-200 dark:border-gray-700 mb-10" />

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kontakt</h2>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          För frågor, feedback eller samarbeten, hör gärna av dig:
        </p>

        <a
          href="mailto:pluggpaus@gmail.com"
          className="inline-flex items-center text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          pluggpaus@gmail.com
        </a>
      </div>
    </main>
  );
}

export default OmOssPage;
