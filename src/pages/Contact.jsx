import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { IconMail, IconPhone } from '../components/Icons.jsx';
import Folder from '../components/reactbits/Folder.jsx';
import './Contact.css';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const CONTACTS = [
  {
    name: 'Srujan Gadgil',
    phone: '+91 97699 11588',
    phoneLink: 'tel:+919769911588',
    email: 'hello.tech@studiomh02.com',
  },
  {
    name: 'Jaiwardhan Panwar',
    phone: '+91 93724 41598',
    phoneLink: 'tel:+919372441598',
    email: 'hello.tech@studiomh02.com',
  },
];

export default function Contact() {
  const lenis = useLenis();

  useEffect(() => {
    document.title = 'Contact | MH02 Dashboard';
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [lenis]);

  return (
    <main className="contact-page">
      <div className="contact__wrap">
        <motion.div className="contact__header" {...fadeUp}>
          <h1 className="contact-page__title">Talk to <em>the team.</em></h1>
          <p className="contact-page__lead">
            Give us a call. We're happy to walk you through the platform or discuss how it can fit your studio's workflows.
          </p>
        </motion.div>

        <div className="contact__folder-wrap">
          <Folder
            color="#2f8a54"
            size={1}
            items={[
              <div className="contact-paper" key="srujan">
                <div className="cp-header">
                  <h4 className="cp-name">Srujan Gadgil</h4>
                </div>
                <div className="cp-divider"></div>
                <div className="cp-links">
                  <a href="tel:+919769911588"><IconPhone stroke={1.5} width={16} height={16} /> +91 97699 11588</a>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.tech@studiomh02.com&su=MH02%20Dashboard%20Enquiry"
                    target="_blank" rel="noopener noreferrer"
                  ><IconMail stroke={1.5} width={16} height={16} /> hello.tech@studiomh02.com</a>
                </div>
              </div>,
              <div className="contact-paper" key="jaiwardhan">
                <div className="cp-header">
                  <h4 className="cp-name">Jaiwardhan Panwar</h4>
                </div>
                <div className="cp-divider"></div>
                <div className="cp-links">
                  <a href="tel:+919372441598"><IconPhone stroke={1.5} width={16} height={16} /> +91 93724 41598</a>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.tech@studiomh02.com&su=MH02%20Dashboard%20Enquiry"
                    target="_blank" rel="noopener noreferrer"
                  ><IconMail stroke={1.5} width={16} height={16} /> hello.tech@studiomh02.com</a>
                </div>
              </div>
            ]}
          />
        </div>
      </div>
    </main>
  );
}
