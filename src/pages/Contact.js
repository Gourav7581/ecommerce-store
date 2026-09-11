import React, { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };
  return <><Header/><main><section className="page-hero compact"><div className="container"><p className="eyebrow">We're here to help</p><h1>Let’s talk.</h1><p>Questions about a product or your order? Send us a message.</p></div></section><section className="contact-layout container"><div className="contact-details"><h2>Get in touch</h2><p>Our team usually replies within one business day.</p><div><FiMail/><span><strong>Email</strong>grprem75@gmail.com</span></div><div><FiPhone/><span><strong>Phone</strong>+91 9571070183</span></div><div><FiMapPin/><span><strong>Office</strong>Rajasthan, India</span></div></div><form className="contact-form" onSubmit={submit}><div className="form-row"><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input type="email" name="email" required placeholder="you@example.com"/></label></div><label>Subject<input name="subject" required placeholder="How can we help?"/></label><label>Message<textarea name="message" rows="6" required placeholder="Tell us a little more…"/></label><button className="button primary"><FiSend/> Send message</button>{sent && <p className="success-message">Thanks! Your message has been recorded for this demo.</p>}</form></section></main><Footer/></>;
}
