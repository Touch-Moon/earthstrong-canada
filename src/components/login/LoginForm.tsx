"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only: no actual authentication
    alert("Dealer portal login coming soon. Please contact us for access.");
  };

  return (
    <div className="es-login">
      <div className="es-login__wrap">
        <div className="es-login__card">
          {/* Logo */}
          <div className="es-login__logo">
            <Image
              src="/images/logo/earthstrong-logo.png"
              alt="Earthstrong Canada"
              width={160}
              height={40}
            />
          </div>

          <h1 className="es-login__title">Dealer Portal</h1>
          <p className="es-login__subtitle">
            Log in to access your dealer dashboard
          </p>

          <form onSubmit={handleSubmit} className="es-login__form">
            <fieldset>
              <legend className="sr-only">Dealer Login Credentials</legend>

              {/* Email */}
              <div className="es-login__field">
                <label htmlFor="login-email" className="es-login__label">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="es-login__input"
                  placeholder="dealer@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="es-login__field">
                <label htmlFor="login-password" className="es-login__label">
                  Password
                </label>
                <div className="es-login__pw-wrap">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="es-login__input"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="es-login__pw-toggle"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember + Lost password */}
              <div className="es-login__options">
                <label className="es-login__remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="es-login__checkbox"
                  />
                  <span className="es-login__remember-label">Remember me</span>
                </label>
                <Link href="/contact" className="es-login__forgot">
                  Lost Password?
                </Link>
              </div>

              {/* Submit */}
              <button type="submit" className="es-login__submit">
                Log In
              </button>
            </fieldset>
          </form>

          <p className="es-login__footer">
            Don&apos;t have access?{" "}
            <Link href="/contact" className="es-login__footer-link">
              Contact us for dealer access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
