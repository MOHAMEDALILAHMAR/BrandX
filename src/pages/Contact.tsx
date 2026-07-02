import { Container } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../hooks/useInView';
import classes from './Contact.module.css';

const FB_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const IG_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LI_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YT_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL: FormState = { firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' };

export function Contact() {
  const { t } = useTranslation();
  const [form, setForm]         = useState<FormState>(INITIAL);
  const [errors, setErrors]     = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]   = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const contentRef = useInView();

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.firstName.trim()) e.firstName = t('contactPage.required');
    if (!form.lastName.trim())  e.lastName  = t('contactPage.required');
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = t('contactPage.invalid_email');
    if (!form.phone.trim())   e.phone   = t('contactPage.required');
    if (!form.subject.trim()) e.subject = t('contactPage.required');
    if (!form.message.trim()) e.message = t('contactPage.required');
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSending(true);
    setApiError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l'envoi.");
      setSubmitted(true);
      setForm(INITIAL);
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('contactPage.fallback_error');
      setApiError(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={classes.page}>

      {/* Background blobs */}
      <div className={classes.blob1} />
      <div className={classes.blob2} />
      <div className={classes.blob3} />
      <div className={classes.blob4} />

      {/* ══════════════════ PAGE HERO ══════════════════ */}
      <div className={classes.pageHero}>
        <Container size="xl">
          <p className={classes.breadcrumb}>{t('contactPage.breadcrumb_home')} &rsaquo; <span>{t('contactPage.breadcrumb_current')}</span></p>
          <h1 className={classes.pageTitle}>{t('contactPage.page_title')}</h1>
        </Container>
      </div>

      {/* ══════════════════ MAIN GRID ══════════════════ */}
      <section className={classes.mainSection}>
        <Container size="xl">
          <div
            ref={contentRef.ref}
            className={`fadeUp ${contentRef.inView ? 'visible' : ''}`}
          >

            <div className={classes.formHeader}>
              <span className={classes.formTag}>{t('contactPage.form_tagline')}</span>
              <h2 className={classes.formTitle}>
                {t('contactPage.form_title_line1')}<br />{t('contactPage.form_title_line2')}
              </h2>
            </div>

            <div className={classes.layout}>

            {/* ── FORM ── */}
            <div className={classes.formSide}>

              {submitted && (
                <div className={classes.successMsg}>{t('contactPage.success')}</div>
              )}
              {apiError && (
                <div className={classes.errorMsg}>✗ {apiError}</div>
              )}

              <form onSubmit={handleSubmit} noValidate className={classes.form}>

                <div className={classes.fieldRow}>
                  <div className={classes.field}>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder={t('contactPage.first_name')}
                      className={`${classes.input} ${errors.firstName ? classes.inputError : ''}`}
                    />
                    {errors.firstName && <span className={classes.err}>{errors.firstName}</span>}
                  </div>
                  <div className={classes.field}>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder={t('contactPage.last_name')}
                      className={`${classes.input} ${errors.lastName ? classes.inputError : ''}`}
                    />
                    {errors.lastName && <span className={classes.err}>{errors.lastName}</span>}
                  </div>
                </div>

                <div className={classes.fieldRow}>
                  <div className={classes.field}>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('contactPage.email')}
                      className={`${classes.input} ${errors.email ? classes.inputError : ''}`}
                    />
                    {errors.email && <span className={classes.err}>{errors.email}</span>}
                  </div>
                  <div className={classes.field}>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t('contactPage.phone')}
                      className={`${classes.input} ${errors.phone ? classes.inputError : ''}`}
                    />
                    {errors.phone && <span className={classes.err}>{errors.phone}</span>}
                  </div>
                </div>

                <div className={classes.field}>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={t('contactPage.subject')}
                    className={`${classes.input} ${errors.subject ? classes.inputError : ''}`}
                  />
                  {errors.subject && <span className={classes.err}>{errors.subject}</span>}
                </div>

                <div className={classes.field}>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contactPage.message')}
                    className={`${classes.textarea} ${errors.message ? classes.inputError : ''}`}
                    rows={7}
                  />
                  {errors.message && <span className={classes.err}>{errors.message}</span>}
                </div>

                <button type="submit" className={classes.submitBtn} disabled={sending}>
                  {sending ? '...' : t('contactPage.send')}
                </button>
              </form>
            </div>

            {/* ── INFO SIDEBAR ── */}
            <div className={classes.infoSide}>
              <div className={classes.infoCard}>

                <div className={classes.infoBlock}>
                  <h3 className={classes.infoLabel}>{t('contactPage.info_title1')}</h3>
                  <p className={classes.infoText}>{t('contactPage.info_text1')}</p>
                </div>

                <div className={classes.infoBlock}>
                  <h3 className={classes.infoLabel}>{t('contactPage.info_title2')}</h3>
                  <p className={classes.infoText}>
                    {t('contactPage.info_text2_line1')}<br />{t('contactPage.info_text2_line2')}
                  </p>
                </div>

                <div className={classes.infoBlock}>
                  <h3 className={classes.infoLabel}>{t('contactPage.info_title3')}</h3>
                  <p className={classes.infoText}>{t('contactPage.info_text3')}</p>
                </div>

                <div className={classes.infoBlock}>
                  <h3 className={classes.infoLabel}>{t('contactPage.info_title4')}</h3>
                  <div className={classes.socialRow}>
                    <a href="https://www.facebook.com/profile.php?id=61589244834686&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className={classes.socialIcon} title="Facebook">{FB_ICON}</a>
                    <a href="https://www.instagram.com/brandx.digital?igsh=NnBtN2V4b2hsNDJ2" target="_blank" rel="noopener noreferrer" className={classes.socialIcon} title="Instagram">{IG_ICON}</a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={classes.socialIcon} title="LinkedIn">{LI_ICON}</a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className={classes.socialIcon} title="YouTube">{YT_ICON}</a>
                  </div>
                </div>

              </div>
            </div>

            </div>{/* /.layout */}
          </div>
        </Container>
      </section>
    </div>
  );
}
