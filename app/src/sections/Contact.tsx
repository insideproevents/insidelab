import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    eventType: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !header || !form || !info) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        form,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        info,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Mensaje enviado', {
      description: 'Nos pondremos en contacto contigo pronto.',
    });
    setFormData({
      name: '',
      email: '',
      eventDate: '',
      eventType: '',
      message: '',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-navy-800 py-20 z-[90]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
            Construyamos tu próximo evento.
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Cuéntanos qué estás planeando. Te responderemos con disponibilidad y siguientes pasos.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Tu nombre"
                    className="bg-navy-900/50 border-white/10 text-white placeholder:text-white/40 focus:border-lime-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="tu@email.com"
                    className="bg-navy-900/50 border-white/10 text-white placeholder:text-white/40 focus:border-lime-400"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-white/80">
                    Fecha del evento
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData({ ...formData, eventDate: e.target.value })
                    }
                    className="bg-navy-900/50 border-white/10 text-white placeholder:text-white/40 focus:border-lime-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType" className="text-white/80">
                    Tipo de evento
                  </Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, eventType: value })
                    }
                  >
                    <SelectTrigger className="bg-navy-900/50 border-white/10 text-white focus:ring-lime-400">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-800 border-white/10">
                      <SelectItem value="corporate">Corporativo</SelectItem>
                      <SelectItem value="wedding">Boda</SelectItem>
                      <SelectItem value="party">Fiesta privada</SelectItem>
                      <SelectItem value="concert">Concierto</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Cuéntanos sobre tu evento..."
                  rows={5}
                  className="bg-navy-900/50 border-white/10 text-white placeholder:text-white/40 focus:border-lime-400 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-lime-400 text-navy-900 hover:bg-lime-300 font-semibold py-6"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar mensaje
              </Button>
            </form>
          </div>

          {/* Info */}
          <div ref={infoRef} className="lg:pl-8">
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl text-white mb-6">
                  Información de contacto
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@insidelab.studio"
                    className="flex items-center gap-4 text-white/70 hover:text-lime-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>hello@insidelab.studio</span>
                  </a>
                  <a
                    href="tel:+15550142200"
                    className="flex items-center gap-4 text-white/70 hover:text-lime-400 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+1 (555) 014-2200</span>
                  </a>
                  <div className="flex items-center gap-4 text-white/70">
                    <Clock className="w-5 h-5" />
                    <span>Lun–Sáb: 10:00–20:00</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <MapPin className="w-5 h-5" />
                    <span>Los Angeles, CA — disponibles para viajar</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="font-display text-lg text-white mb-4">
                  Respuesta rápida
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Respondemos todas las consultas dentro de las 24 horas. Para eventos 
                  urgentes, contáctanos directamente por WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
