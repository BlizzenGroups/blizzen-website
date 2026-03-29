export const hiringPartners = [
  {
    name: "Zoho Corporation",
    logo: "/company-logos/zoho.png",
    website: "https://www.zoho.com"
  },
  {
    name: "Freshworks",
    logo: "/company-logos/freshworks.png", 
    website: "https://www.freshworks.com"
  },
  {
    name: "Chargebee",
    logo: "/company-logos/chargebee.png",
    website: "https://www.chargebee.com"
  },
  {
    name: "Kissflow",
    logo: "/company-logos/kissflow.png",
    website: "https://kissflow.com"
  },
  {
    name: "Indium Software",
    logo: "/company-logos/indium.png",
    website: "https://www.indiumsoftware.com"
  },
  {
    name: "Aspire Systems",
    logo: "/company-logos/aspire.png",
    website: "https://www.aspiresys.com"
  },
  {
    name: "TVS Next",
    logo: "/company-logos/tvs-next.png",
    website: "https://www.tvsnext.io"
  },
  {
    name: "Kaar Technologies",
    logo: "/company-logos/kaar.png",
    website: "https://www.kaartech.com"
  },
  {
    name: "Ramco Systems",
    logo: "/company-logos/ramco.png",
    website: "https://www.ramco.com"
  },
  {
    name: "Intellect Design Arena",
    logo: "/company-logos/intellect.png",
    website: "https://www.intellectdesign.com"
  },
  {
    name: "Saksoft",
    logo: "/company-logos/saksoft.png",
    website: "https://www.saksoft.com"
  },
  {
    name: "Ideas2IT",
    logo: "/company-logos/ideas2it.png",
    website: "https://www.ideas2it.com"
  },
  {
    name: "DataPatterns",
    logo: "/company-logos/datapatterns.png",
    website: "https://www.datapatterns.com"
  },
  {
    name: "Contus",
    logo: "/company-logos/contus.png",
    website: "https://www.contus.com"
  },
  {
    name: "Bahwan Cybertek",
    logo: "/company-logos/bahwan.png",
    website: "https://www.bahwancybertek.com"
  },
  {
    name: "Prodapt Solutions",
    logo: "/company-logos/prodapt.png",
    website: "https://www.prodapt.com"
  },
  {
    name: "Agilisium Consulting",
    logo: "/company-logos/agilisium.png",
    website: "https://www.agilisium.com"
  },
  {
    name: "DCKAP",
    logo: "/company-logos/dckap.png",
    website: "https://www.dckap.com"
  },
  {
    name: "HTC Global Services",
    logo: "/company-logos/htc.png",
    website: "https://www.htcinc.com"
  },
  {
    name: "Infoview Technologies",
    logo: "/company-logos/infoview.png",
    website: "https://www.infoviewsystems.com"
  },
  {
    name: "Visteon (IT Chennai)",
    logo: "/company-logos/visteon.png",
    website: "https://www.visteon.com"
  },
  {
    name: "Payoda Technologies",
    logo: "/company-logos/payoda.png",
    website: "https://www.payoda.com"
  },
  {
    name: "GoFrugal Technologies",
    logo: "/company-logos/gofrugal.png",
    website: "https://www.gofrugal.com"
  },
  {
    name: "CavinKare",
    logo: "/company-logos/cavinkare.png",
    website: "https://www.cavinkare.com"
  },
  {
    name: "WayCool Foods",
    logo: "/company-logos/waycool.png",
    website: "https://www.waycool.in"
  }
];

// Split companies into chunks for different rows
export const getCompanyRows = () => {
  const chunkSize = Math.ceil(hiringPartners.length / 2);
  return [
    hiringPartners.slice(0, chunkSize),
    hiringPartners.slice(chunkSize)
  ];
};