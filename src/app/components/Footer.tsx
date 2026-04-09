import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              INSANITY
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
            <a href="#servicios" className="hover:text-purple-400 transition-colors">
              Servicios
            </a>
            <a href="#contacto" className="hover:text-purple-400 transition-colors">
              Contacto
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Términos
            </a>
          </div>

          <div className="text-gray-400 text-sm">
            © 2026 INSANITY. Todos los derechos reservados.
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Transformando ideas en realidad digital 🚀</p>
        </div>
      </div>
    </footer>
  );
}