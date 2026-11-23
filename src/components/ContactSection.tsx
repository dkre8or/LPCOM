import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { EXTERNAL_LINKS } from '../config/siteData';

interface ContactSectionProps {
  onOpenJoin: (source?: string) => void;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactSection({ onOpenJoin }: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [deliveryMode, setDeliveryMode] = useState<'forwarded' | 'unconfigured_relay' | null>(null);
  const [serverError, setServerError] = useState<string>('');
  const [lastSubmitted, setLastSubmitted] = useState<FormValues | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const validateClient = (data: FormValues): FieldErrors => {
    const next: FieldErrors = {};
    if (data.name.trim().length < 2) {
      next.name = 'Please enter your first and last name.';
    }
    if (!EMAIL_PATTERN.test(data.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (data.subject.trim().length < 2) {
      next.subject = 'Please add a subject for your message.';
    }
    if (data.message.trim().length < 10) {
      next.message = 'Please enter a message of at least 10 characters.';
    }
    return next;
  };

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === 'error') {
      setStatus('idle');
      setServerError('');
    }
  };

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2200);
    } catch {
      // Fallback: mailto link remains directly clickable
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateClient(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setServerError('Please review the highlighted fields before sending.');
      return;
    }

    setStatus('submitting');
    setServerError('');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        delivery?: 'forwarded' | 'unconfigured_relay';
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !payload.ok) {
        if (payload.fieldErrors) {
          setErrors(payload.fieldErrors);
        }
        setStatus('error');
        setServerError(
          payload.error ??
            'Something went wrong while sending your message. Please email us directly.'
        );
        return;
      }

      setLastSubmitted({ ...values });
      setDeliveryMode(payload.delivery ?? 'unconfigured_relay');
      setStatus('success');
      setValues({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setServerError(
        'Unable to connect to the server right now. You can email us directly using the addresses on this page.'
      );
    }
  };

  const buildMailtoHref = (submitted: FormValues | null) => {
    const to = EXTERNAL_LINKS.emails[1];
    const cc = EXTERNAL_LINKS.emails[0];
    if (!submitted) {
      return `mailto:${to}?cc=${encodeURIComponent(cc)}`;
    }
    const body = `Name: ${submitted.name}\nEmail: ${submitted.email}\n\n${submitted.message}`;
    return `mailto:${to}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(
      submitted.subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#FEFAF6] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Left Column: Direct Details & Free Membership CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-[13px] font-medium tracking-[0.06em] text-[#9E6506] mb-3.5">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] font-semibold leading-[1.16] tracking-[-0.015em] text-[#5C3317]"
            >
              Get in touch.
            </h2>

            <p className="mt-5 max-w-[48ch] text-[15.5px] sm:text-[16px] font-light leading-[1.85] text-[#6B4C30]">
              We welcome enquiries from partners, organisations, and anyone who wants to collaborate
              on workshops, opportunities, or community initiatives. If you have a question about
              membership, we would love to hear from you too.
            </p>

            {/* Both Official Contact Emails */}
            <div className="mt-8 space-y-3 border-t border-b border-[#E8D8C6] py-6">
              <p className="text-[12px] font-medium tracking-[0.05em] text-[#7A5B3E]">
                Direct email addresses
              </p>
              {EXTERNAL_LINKS.emails.map((email) => (
                <div
                  key={email}
                  className="flex items-center justify-between gap-3 py-1"
                >
                  <a
                    href={`mailto:${email}`}
                    className="border-b border-[#D8C5B0] pb-0.5 text-[15px] sm:text-[15.5px] font-medium text-[#5C3317] transition-colors hover:border-[#5C3317] hover:text-[#8B5A2B] break-all"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(email)}
                    aria-label={`Copy ${email}`}
                    className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-[12px] text-[#7A5B3E] transition-colors hover:bg-[#F4E8DA] hover:text-[#5C3317]"
                  >
                    {copiedEmail === email ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#5C3317]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => onOpenJoin('Contact Section CTA')}
                className="group inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#5C3317] px-8 py-4 text-[14px] font-semibold text-[#FEFAF6] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#8B5A2B] whitespace-nowrap"
              >
                Join the community — it&apos;s free.
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Validated Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:pl-6"
          >
            <div className="rounded-[14px] border border-[#E8D8C6] bg-[#FEFAF6] p-7 sm:p-10">
              <h3 className="font-serif text-[22px] sm:text-[24px] font-semibold text-[#5C3317]">
                Send us a message.
              </h3>

              <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-6">
                {/* 1. Your Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[12.5px] font-medium text-[#6B4C30]"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="First and last name."
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`mt-1.5 w-full border-b bg-transparent py-3 text-[15px] text-[#2A1A0A] placeholder:text-[#9A7D60] transition-colors focus:outline-none ${
                      errors.name
                        ? 'border-[#A63A1E] focus:border-[#A63A1E]'
                        : 'border-[#D8C5B0] focus:border-[#5C3317]'
                    }`}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-[12.5px] text-[#A63A1E]">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. Email Address */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[12.5px] font-medium text-[#6B4C30]"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="you@example.com."
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`mt-1.5 w-full border-b bg-transparent py-3 text-[15px] text-[#2A1A0A] placeholder:text-[#9A7D60] transition-colors focus:outline-none ${
                      errors.email
                        ? 'border-[#A63A1E] focus:border-[#A63A1E]'
                        : 'border-[#D8C5B0] focus:border-[#5C3317]'
                    }`}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-[12.5px] text-[#A63A1E]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 3. Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[12.5px] font-medium text-[#6B4C30]"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={values.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    placeholder="Partnerships, membership, opportunities…"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className={`mt-1.5 w-full border-b bg-transparent py-3 text-[15px] text-[#2A1A0A] placeholder:text-[#9A7D60] transition-colors focus:outline-none ${
                      errors.subject
                        ? 'border-[#A63A1E] focus:border-[#A63A1E]'
                        : 'border-[#D8C5B0] focus:border-[#5C3317]'
                    }`}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="mt-1.5 text-[12.5px] text-[#A63A1E]">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* 4. Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[12.5px] font-medium text-[#6B4C30]"
                  >
                    Message.
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={values.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    placeholder="Tell us what's on your mind."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`mt-1.5 w-full resize-y border-b bg-transparent py-3 text-[15px] leading-relaxed text-[#2A1A0A] placeholder:text-[#9A7D60] transition-colors focus:outline-none ${
                      errors.message
                        ? 'border-[#A63A1E] focus:border-[#A63A1E]'
                        : 'border-[#D8C5B0] focus:border-[#5C3317]'
                    }`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-[12.5px] text-[#A63A1E]">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Row */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#5C3317] px-9 py-3.5 text-[14px] font-semibold text-[#FEFAF6] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#8B5A2B] disabled:cursor-not-allowed disabled:opacity-65 whitespace-nowrap"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      'Send Message.'
                    )}
                  </button>
                </div>

                {/* Error Alert */}
                {status === 'error' && serverError && (
                  <div
                    role="alert"
                    className="rounded-[10px] border border-[#A63A1E]/30 bg-[#A63A1E]/6 px-4 py-3.5 text-[13.5px] text-[#7F2913]"
                  >
                    {serverError}
                  </div>
                )}

                {/* Success Feedback + Honest Delivery Disclosure */}
                {status === 'success' && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-[10px] border border-[#CBB59D] bg-[#F4E8DA]/75 px-5 py-4"
                  >
                    <p className="flex items-center gap-2 text-[14px] font-semibold text-[#5C3317]">
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Message sent — we&apos;ll be in touch soon.
                    </p>

                    {deliveryMode === 'unconfigured_relay' && (
                      <div className="mt-3 border-t border-[#D8C5B0] pt-3 text-[12.5px] leading-relaxed text-[#6B4C30]">
                        <p>
                          Your enquiry has been validated and logged on this server. To forward
                          submissions automatically by email, configure{' '}
                          <code className="rounded bg-[#E8D8C6]/70 px-1.5 py-0.5 text-[11.5px] text-[#5C3317]">
                            CONTACT_WEBHOOK_URL
                          </code>{' '}
                          in the server environment.
                        </p>
                        <a
                          href={buildMailtoHref(lastSubmitted)}
                          className="mt-2 inline-flex items-center gap-1.5 font-medium text-[#5C3317] underline decoration-[#CBB59D] underline-offset-4 hover:decoration-[#5C3317]"
                        >
                          Send a copy directly via your email app
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
