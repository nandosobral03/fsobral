export const site = {
  name: "Fernando Sobral",
  domain: "fernandosobral.dev",
  defaultTitle: "Fernando Sobral",
  description: "Software engineer and builder of things on the internet.",
  author: "Fernando Sobral",
  sameAs: [
    "https://github.com/nandosobral03",
    "https://www.linkedin.com/in/fernando-sobral-2b100621b/",
  ],
};

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://fsobral.com";
}

export function getLocalBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function canonicalUrl(path = "/", base = getBaseUrl()) {
  return new URL(path, base).toString();
}

export function personJsonLd(base = getBaseUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: base,
    sameAs: site.sameAs,
  };
}
