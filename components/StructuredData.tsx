export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Agentic Data Stack",
    url: "https://agenticdatastack.org",
    logo: "https://agenticdatastack.org/images/logo.png",
    description:
      "A community exploring how modern data stacks evolve to serve agents, and how agents reshape data analytics and data engineering.",
    sameAs: [
      "https://www.linkedin.com/company/agentic-data-stack/",
      "https://lu.ma/AgenticDataStack",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Community Support",
      url: "https://agenticdatastack.org",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Agentic Data Stack",
    url: "https://agenticdatastack.org",
    description:
      "A community exploring how modern data stacks evolve to serve agents.",
    publisher: {
      "@type": "Organization",
      name: "Agentic Data Stack",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
