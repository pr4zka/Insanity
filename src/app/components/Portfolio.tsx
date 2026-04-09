'use client'

import { motion } from 'motion/react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'TechVision Store',
    category: 'E-commerce',
    description: 'Tienda online moderna con carrito de compras, pasarela de pagos y panel de administración completo.',
    image: 'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc3NTcxMTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/techvision',
    date: 'Marzo 2026',
    tags: ['React', 'Node.js', 'Stripe'],
  },
  {
    title: 'Sabor Gourmet',
    category: 'Restaurante',
    description: 'Sitio web elegante con menú digital, reservas online y sistema de pedidos para delivery.',
    image: 'https://images.unsplash.com/photo-1682778418768-16081e4470a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzU2NzMzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/saborgourmet',
    date: 'Febrero 2026',
    tags: ['Next.js', 'CMS', 'API'],
  },
  {
    title: 'GlobalTech Solutions',
    category: 'Corporativo',
    description: 'Portal corporativo con blog, área de clientes y sistema de cotizaciones automatizado.',
    image: 'https://images.unsplash.com/photo-1603201667493-4c2696de0b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHdlYnNpdGV8ZW58MXx8fHwxNzc1NzMzNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/globaltech',
    date: 'Enero 2026',
    tags: ['WordPress', 'PHP', 'MySQL'],
  },
  {
    title: 'FitPower Gym',
    category: 'Fitness',
    description: 'Plataforma fitness con reserva de clases, planes de entrenamiento y seguimiento de progreso.',
    image: 'https://images.unsplash.com/photo-1591227174835-d3705c881c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NzU3MzM2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/fitpower',
    date: 'Diciembre 2025',
    tags: ['Vue.js', 'Firebase', 'PWA'],
  },
  {
    title: 'InnovateLab',
    category: 'Startup',
    description: 'Landing page interactiva con animaciones 3D, formularios de contacto y métricas en tiempo real.',
    image: 'https://images.unsplash.com/photo-1648134859175-78b41b4db186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGxhbmRpbmclMjBwYWdlfGVufDF8fHx8MTc3NTczMzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/innovatelab',
    date: 'Noviembre 2025',
    tags: ['React', 'Three.js', 'Tailwind'],
  },
  {
    title: 'Urban Realty',
    category: 'Inmobiliaria',
    description: 'Portal inmobiliario con búsqueda avanzada, tours virtuales y CRM integrado para agentes.',
    image: 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjB3ZWJzaXRlfGVufDF8fHx8MTc3NTYyNzgwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    url: 'https://example.com/urbanrealty',
    date: 'Octubre 2025',
    tags: ['Angular', 'MongoDB', 'Maps API'],
  },
];

export function Portfolio() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Descubre algunos de nuestros trabajos más recientes y exitosos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative block"
            >
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <ExternalLink className="w-12 h-12 text-white mx-auto mb-2" />
                      <span className="text-white font-semibold">Ver proyecto</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-700">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full border border-gray-700"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom border effect on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 via-white to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-6">
            ¿Tienes un proyecto en mente? Hagámoslo realidad juntos.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Comenzar mi proyecto
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
