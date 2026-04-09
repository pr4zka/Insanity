'use client'

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function Contact() {
  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-black to-black" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Contáctanos y descubre cómo podemos transformar tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Hablemos de tu proyecto</h3>
              <p className="text-gray-400 text-lg mb-8">
                Nuestro equipo está listo para ayudarte a hacer realidad tus ideas.
                No importa qué tan ambicioso sea tu proyecto, estamos preparados para el desafío.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 group"
              >
                <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400">contacto@insanity.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 group"
              >
                <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Teléfono</h4>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 group"
              >
                <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Ubicación</h4>
                  <p className="text-gray-400">En todo el mundo</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative Element */}
            <div className="relative mt-12 p-6 bg-gradient-to-br from-gray-900/30 to-gray-800/30 border border-gray-700/30 rounded-xl">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-600/10 to-gray-800/10 rounded-xl blur-xl" />
              <p className="relative text-gray-300 italic">
                "La locura es hacer lo mismo una y otra vez esperando obtener resultados diferentes. 
                Nosotros traemos la INSANITY que tu negocio necesita para innovar."
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
              <div>
                <label htmlFor="name" className="block text-white mb-2 font-medium">
                  Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="bg-black/50 border-gray-700 text-white focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2 font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-black/50 border-gray-700 text-white focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-white mb-2 font-medium">
                  Servicio de interés
                </label>
                <select
                  id="service"
                  className="w-full bg-black/50 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="chatbot">Chatbots</option>
                  <option value="crm">CRM</option>
                  <option value="web">Páginas Web</option>
                  <option value="custom">Soluciones a Medida</option>
                  <option value="marketing">Marketing Digital</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2 font-medium">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                  className="bg-black/50 border-gray-700 text-white focus:border-purple-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg font-semibold"
              >
                Enviar mensaje
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}