import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { FloralDecor } from './DecorativeElements';

interface Testimonial {
  name: string;
  text_en: string;
  text_es: string;
  service: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Alexandra Fernandez",
    text_en: "Vio is simply the best. She has been a fundamental guide in my life and has become that loving and firm voice that appears in my mind when I need it most. Every time I feel down or get stuck in unhelpful thoughts, I hear her words: 'How does that help you?' or 'Why not try looking at it this way?' Her support has given me clarity, calm, and real tools to move forward. Honestly, working with her has been a gift.",
    text_es: "Vio es simplemente la mejor. Ha sido una guía fundamental en mi vida y se ha convertido en esa voz amorosa y firme que aparece en mi mente cuando más la necesito. Cada vez que me siento decaída, escucho sus palabras: '¿Cómo te ayuda eso?' Su apoyo me ha dado claridad, calma y herramientas reales para seguir adelante. Sinceramente, trabajar con ella ha sido un regalo.",
    service: "Motherhood Coaching",
    stars: 5,
  },
  {
    name: "Viry Hernandez",
    text_en: "I'm so fortunate to know Vio. From the moment I met her, she inspired warmth, trust, tenderness, and above all, a great sense of security. The birth of my baby was a complicated and unplanned process, but she was there for us every step of the way. If you're looking for loving and compassionate support, she's definitely the one for you.",
    text_es: "Tengo mucha suerte de conocer a Vio. Desde el momento en que la conocí, me inspiró calidez, confianza, ternura y, sobre todo, una gran sensación de seguridad. El nacimiento de mi bebé fue un proceso complicado e imprevisto, pero ella estuvo con nosotros en cada paso del camino. Si buscas apoyo amoroso y compasivo, definitivamente ella es la indicada.",
    service: "HypnoBirthing",
    stars: 5,
  },
  {
    name: "Maria Veronica Paiva",
    text_en: "During my second pregnancy, I was fortunate to have Viomar accompany me on the journey to a calmer and more fear-free birth. She shared all her knowledge of HypnoBirthing in a clear and loving way — preparing my husband, my baby, and me. With her patience and the breathing techniques she taught us, we faced labor with confidence and peace.",
    text_es: "Durante mi segundo embarazo, tuve la fortuna de que Viomar me acompañara hacia un parto más tranquilo y sin miedo. Compartió todo su conocimiento de HypnoBirthing de manera clara y amorosa, preparando a mi esposo, a mi bebé y a mí. Con su paciencia y las técnicas de respiración que nos enseñó, enfrentamos el parto con confianza y paz.",
    service: "HypnoBirthing",
    stars: 5,
  },
  {
    name: "Susana Diez",
    text_en: "Vio shared all her knowledge of hypnobirthing with us in a clear and loving way. She prepared my husband, my baby, and me for the birth to happen in the best possible way. With her patience, support, and the relaxation and breathing techniques she shared, I had a healthy, unmedicated birth, just as I had dreamed, and shorter than I ever imagined. I will always be grateful for her excellent support throughout the entire process! Vio has always been available to me, even after the birth.",
    text_es: "Vio compartió todo su conocimiento de hypnobirthing con nosotros de una manera clara y amorosa. Preparó a mi esposo, a mi bebé y a mí para que el parto se diera de la mejor manera posible. Con su paciencia, apoyo y las técnicas de relajación y respiración que nos enseñó, tuve un parto natural, sin medicamentos, tal como lo había soñado, ¡y más corto de lo que jamás imaginé! Siempre estaré agradecida por su excelente acompañamiento durante todo el proceso. ¡Vio siempre ha estado disponible para mí, incluso después del parto!",
    service: "HypnoBirthing",
    stars: 5,
  },
];

const StarRating: React.FC<{ stars: number }> = ({ stars }) => (
  <div className="flex gap-1 justify-center mb-4">
    {Array.from({ length: stars }).map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en';

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const testimonial = testimonials[current];
  const text = lang === 'es' ? testimonial.text_es : testimonial.text_en;

  return (
    <section id="testimonials" className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/watercolor-pattern-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('testimonials.title')}</h2>
          <p className="text-xl text-coral-300 font-medium mb-2">{t('testimonials.subtitle')}</p>
          <p className="text-sm text-gray-500 font-medium">⭐ {t('testimonials.google_badge')}</p>
          <div className="flex justify-center mt-6">
            <FloralDecor color="#FCA669" className="w-12 h-12 opacity-30" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card relative text-center px-8 py-10">
            <Quote className="w-10 h-10 text-coral-200 mx-auto mb-4 opacity-60" />
            <StarRating stars={testimonial.stars} />
            <p className="text-gray-600 text-lg leading-relaxed italic mb-8">"{text}"</p>
            <div className="border-t border-coral-100 pt-6">
              <p className="font-semibold text-gray-800 text-lg">{testimonial.name}</p>
              <p className="text-coral-300 text-sm mt-1">{testimonial.service}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-warm text-coral-300 hover:bg-coral-100 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-coral-300 scale-125' : 'bg-coral-200'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-warm text-coral-300 hover:bg-coral-100 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://g.page/r/violadoula/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-coral-300 hover:text-coral-400 font-medium text-sm underline underline-offset-4 transition-colors"
          >
            {t('testimonials.leave_review')} →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
