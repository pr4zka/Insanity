'use client'

import { motion } from 'motion/react';
import { Shield, Clock, Headphones, Target, CheckCircle2, Users, Zap, Award } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Proceso Claro y Transparente',
    description: 'Seguimos una metodología probada: análisis, diseño, desarrollo, pruebas y entrega. Siempre sabrás en qué etapa está tu proyecto.',
  },
  {
    icon: Headphones,
    title: 'Soporte Continuo',
    description: 'Asistencia técnica 24/7 después del lanzamiento. No te dejamos solo, estamos contigo en cada paso del camino.',
  },
  {
    icon: Zap,
    title: 'Entregas Rápidas',
    description: 'Metodología ágil que permite entregas incrementales. Verás resultados tangibles desde las primeras semanas.',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: 'Código limpio, escalable y bien documentado. Garantizamos 3 meses de correcciones sin costo adicional.',
  },
];

const whyChooseUs = [
  {
    icon: Award,
    title: 'Experiencia Comprobada',
    stat: '50+',
    description: 'Proyectos exitosos entregados',
  },
  {
    icon: Users,
    title: 'Clientes Satisfechos',
    stat: '98%',
    description: 'Tasa de satisfacción',
  },
  {
    icon: Clock,
    title: 'Puntualidad',
    stat: '95%',
    description: 'Entregas a tiempo',
  },
  {
    icon: CheckCircle2,
    title: 'Compromiso Total',
    stat: '100%',
    description: 'Dedicación a tu éxito',
  },
];

export function WhyUs() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            ¿Por qué elegir INSANITY?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Combinamos experiencia, tecnología de punta y un compromiso inquebrantable con la excelencia
            para transformar tu visión en realidad digital.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 h-full hover:border-gray-600 transition-all duration-300">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl p-12 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2"
                >
                  {item.stat}
                </motion.div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Nuestro Proceso de Trabajo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Consulta', desc: 'Reunión inicial para entender tus necesidades' },
              { step: '02', title: 'Planificación', desc: 'Diseño de estrategia y arquitectura' },
              { step: '03', title: 'Desarrollo', desc: 'Construcción con metodología ágil' },
              { step: '04', title: 'Pruebas', desc: 'Testing exhaustivo de calidad' },
              { step: '05', title: 'Lanzamiento', desc: 'Entrega y soporte continuo' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
                  <div className="text-4xl font-bold text-gray-700 mb-2">{item.step}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-700" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700 rounded-2xl p-12 max-w-4xl mx-auto">
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Nuestra Garantía</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Nos comprometemos a entregar soluciones de la más alta calidad. Si no estás 100% satisfecho
              con el resultado, trabajaremos hasta que lo estés. Tu éxito es nuestro éxito.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Código de calidad profesional</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Soporte post-lanzamiento</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Confidencialidad garantizada</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
