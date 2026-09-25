export interface CommercialIndustryData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroBadge: string;
  heroSubheadline?: string;
  heroDescription: string;
  targetLocations: string[];
  keyHighlights: {
    title: string;
    description: string;
    icon: string;
  }[];
  contentSections: {
    heading: string;
    paragraphs: string[];
  }[];
  commonQuestions: {
    question: string;
    answer: string;
  }[];
  caseStudyPlaceholder: {
    type: string;
    typicalSize: string;
    outcome: string;
  };
  imageBrief: {
    heroShotAlt: string;
    detailShotAlt: string;
  };
}

export const COMMERCIAL_INDUSTRIES_DATA: CommercialIndustryData[] = [
  {
    slug: 'warehouses-logistics-manufacturing',
    title: 'Warehouses, Logistics & Manufacturing',
    metaTitle: 'Solar for Warehouses, Factories and Manufacturers | Billabong Solar',
    metaDescription: 'Big roofs, daytime operations, rising power bills. Solar sized to your load, with most systems paying for themselves in around 3 to 4 years.',
    h1: 'Solar for Warehouses, Factories and Manufacturers',
    heroBadge: 'Industrial & Manufacturing Solar Victoria',
    heroSubheadline: 'Big roofs, daytime operations, rising power bills. Custom engineered solar sized to your daytime load, with typical payback in 3 to 4 years.',
    heroDescription: 'If you run a warehouse, factory, or workshop, your power bill is driven by business hours activity: machinery, compressors, industrial lighting, forklift charging, HVAC, and office operations. Your extensive roof space is one of the most profitable unused assets your business owns.',
    targetLocations: ['Scoresby', 'Knoxfield', 'Bayswater', 'Dandenong South', 'Derrimut', 'Laverton North', 'Mulgrave'],
    keyHighlights: [
      {
        title: 'Daytime Load Matching',
        description: 'Systems calibrated directly to match heavy machinery and forklift charging hours, ensuring self-consumption reaches 80% to 95%.',
        icon: '🏭'
      },
      {
        title: 'Demand Charge Shaving',
        description: 'Flatten monthly kilowatt spike charges that inflate industrial utility bills through intelligent solar and battery peaking control.',
        icon: '📉'
      },
      {
        title: 'Typical 3 to 4 Year Payback',
        description: 'Sizing to actual load instead of roof size ensures nearly every kWh replaces full-rate commercial grid power.',
        icon: '⏱️'
      },
      {
        title: 'Zero Operational Downtime',
        description: 'Installs scheduled around production shifts, with main switchboard tie-ins performed after hours or during planned maintenance.',
        icon: '🛡️'
      }
    ],
    contentSections: [
      {
        heading: 'Turning Rooftops into High-Yield Energy Assets',
        paragraphs: [
          'Solar turns expansive industrial roofs into dedicated power plants that run precisely when your machinery operates. Because Billabong Solar sizes systems specifically to your verified interval data, almost all generated electricity is consumed on-site rather than exported for negligible credits.',
          'For most Victorian warehouses, logistics hubs, and manufacturing facilities we partner with, this load-matching engineering delivers a typical payback in approximately 3 to 4 years. After capital payback is achieved, the system continues generating free daytime electricity for 20+ years, locking in predictable operating margins.',
          'We also analyze your monthly network demand charges. Many industrial enterprises pay a significant portion of their invoice based solely on their highest half-hour capacity spike of the month. Sizing an engineered array—often complemented with targeted battery storage—effectively flattens these cost spikes.'
        ]
      },
      {
        heading: 'End-to-End Engineering & Network Approvals',
        paragraphs: [
          'We handle every facet of the project in-house: comprehensive interval load analysis, roof structural engineering audits, distributor grid connection approvals (with AusNet, United Energy, Powercor, or Jemena), certified crane and height access, and continuous cloud monitoring.',
          'Our licensed commercial master electricians work in full PPE compliance, respecting high-traffic loading docks and factory safety protocols so your warehouse operations never experience disruption.'
        ]
      }
    ],
    commonQuestions: [
      {
        question: 'Will solar installation disrupt our daily warehouse operations?',
        answer: 'No. The vast majority of work occurs strictly on the roof and in designated electrical plant areas without affecting ground-floor operations. Switchboard tie-ins and grid changeovers are scheduled after-hours or on weekends at a time that suits your production schedule.'
      },
      {
        question: 'Is our metal roof strong enough for a commercial array?',
        answer: 'Our structural engineers inspect your purlins, rafters, roof sheeting, and fixings prior to sign-off, selecting non-penetrating clamping or certified structural bracketry tailored to your building engineering.'
      },
      {
        question: 'What if we lease our industrial facility?',
        answer: 'Commercial solar remains highly feasible on mid-to-long leases. We provide formal landlord briefing documentation illustrating how rooftop solar enhances asset value, and can assist in structuring green lease agreements.'
      }
    ],
    caseStudyPlaceholder: {
      type: 'Heavy Logistics & Distribution Hub',
      typicalSize: '100 kW to 250 kW Rooftop Array',
      outcome: 'Reduced daytime grid demand by 68% with typical payback achieved in 3.4 years.'
    },
    imageBrief: {
      heroShotAlt: 'Drone view of commercial solar array on large industrial warehouse roof in Melbourne south-east',
      detailShotAlt: 'Neat, labelled commercial solar inverter wall and switchboard installation by Billabong Solar'
    }
  },
  {
    slug: 'cold-storage-food-processing',
    title: 'Cold Storage & Food Processing',
    metaTitle: 'Solar and Batteries for Cold Storage and Food Businesses | Billabong Solar',
    metaDescription: 'Refrigeration runs hardest on hot sunny days, exactly when solar produces most. Systems sized to your cooling load, with typical payback of 3 to 4 years.',
    h1: 'Solar and Batteries for Cold Storage and Food Processing',
    heroBadge: 'Food Industry & Cold Storage Solar',
    heroSubheadline: 'Refrigeration runs hardest on hot sunny days—exactly when solar produces most. Engineered systems with typical 3 to 4 year payback.',
    heroDescription: 'For cold storage facilities, butchers, abattoirs, food processors, and supermarket distribution hubs, refrigeration is the single largest cost on the balance sheet. It never turns off, and compressors work hardest on scorching summer afternoons—coinciding perfectly with peak rooftop solar generation.',
    targetLocations: ['Dandenong South', 'Derrimut', 'Laverton North', 'Scoresby', 'Knoxfield', 'Regional Victoria'],
    keyHighlights: [
      {
        title: 'Perfect Solar-Load Correlation',
        description: 'Chillers and compressors pull peak power on hot sunny days, absorbing solar energy directly as it is produced.',
        icon: '❄️'
      },
      {
        title: 'Blackout Inventory Protection',
        description: 'Targeted battery storage keeps critical refrigeration pumps and condenser circuits running through short grid dropouts.',
        icon: '🔋'
      },
      {
        title: 'HACCP & Hygiene Compliance',
        description: 'Engineered cable containment and sanitary installation practices that strictly adhere to food-grade facility regulations.',
        icon: '🧼'
      },
      {
        title: 'Typical 3 to 4 Year Payback',
        description: 'Extremely high daytime self-consumption rates maximize financial return on every installed kilowatt.',
        icon: '📈'
      }
    ],
    contentSections: [
      {
        heading: 'Why Cold Storage is the Ideal Solar Partner',
        paragraphs: [
          'Few industries possess an energy consumption curve that fits solar as seamlessly as cold storage and food manufacturing. Refrigeration compressors and condenser banks run continuously, and their electrical draw surges during the hottest, sunniest hours of the day.',
          'By sizing your system precisely around baseline cooling and processing loads, every kilowatt-hour generated is utilized directly on-site to offset expensive peak grid tariffs. For the majority of food businesses we work with, this high daytime self-consumption yields a typical capital payback in around 3 to 4 years.',
          'Furthermore, a brief power outage can jeopardize hundreds of thousands of dollars in perishable temperature-sensitive inventory. Integrating commercial battery storage provides indispensable insurance—bridging short grid outages and shaving the intense current spikes caused by simultaneous compressor cycling.'
        ]
      },
      {
        heading: 'Food Safety, Hygiene & Clean Installation Standards',
        paragraphs: [
          'We understand the rigorous compliance requirements governing food processing environments. Our teams coordinate closely with your quality assurance and production managers to establish clean staging areas, avoid food-contact zones, and conduct roof installations without introducing contamination risks.'
        ]
      }
    ],
    commonQuestions: [
      {
        question: 'Can solar keep our cool rooms running during a blackout?',
        answer: 'Solar panels alone automatically disconnect during a blackout for grid safety. However, with an engineered commercial battery storage system, critical refrigeration circuits remain powered seamlessly.'
      },
      {
        question: 'Our refrigeration runs 24 hours. Does solar still make sense?',
        answer: 'Yes. Daytime hours coincide with your highest thermal cooling loads. Solar eliminates your daytime electricity bills, and adding battery storage shifts surplus afternoon energy into evening refrigeration cycles.'
      },
      {
        question: 'Do commercial food businesses qualify for the federal battery rebate?',
        answer: 'Qualifying small-to-medium enterprises and system capacities are eligible for federal battery rebate schemes, which we assess and apply directly to your commercial proposal.'
      }
    ],
    caseStudyPlaceholder: {
      type: 'Regional Cold Storage & Packaging Facility',
      typicalSize: '150 kW Solar Array with 60 kWh Emergency Battery',
      outcome: 'Mitigated summer peak electricity surcharges and eliminated temperature excursions during localized grid trips.'
    },
    imageBrief: {
      heroShotAlt: 'Cold storage facility with solar array on roof and refrigeration condensers visible',
      detailShotAlt: 'Commercial battery storage system protecting refrigeration switchboards'
    }
  },
  {
    slug: 'farms-wineries-agribusiness',
    title: 'Farms, Wineries & Agribusiness',
    metaTitle: 'Solar for Farms, Wineries and Agribusiness in Victoria | Billabong Solar',
    metaDescription: 'Pumps, sheds, cool rooms and diesel costs. Grid-connected and off-grid solar for farms, sized to your load, with typical payback of 3 to 4 years.',
    h1: 'Solar for Farms, Wineries and Agribusiness in Victoria',
    heroBadge: 'Victorian Agricultural & Agribusiness Solar',
    heroSubheadline: 'Pumps, sheds, cool rooms, and rising fuel costs. Grid-connected and off-grid agricultural solar with typical payback in 3 to 4 years.',
    heroDescription: 'Agricultural energy demands are unique: electrical loads are scattered across shearing sheds, irrigation pumps, packing sheds, and cool rooms—often kilometres from the main grid meter. Many properties still rely on costly, noisy diesel generators that require continuous refueling and upkeep.',
    targetLocations: ['Ararat', 'Kyneton', 'Macedon Ranges', 'Bellarine Hinterland', 'Ballarat', 'Bendigo'],
    keyHighlights: [
      {
        title: 'Diesel Generator Replacement',
        description: 'Replace expensive diesel fuel deliveries and regular maintenance with self-sufficient solar and battery power.',
        icon: '🚜'
      },
      {
        title: 'Remote Pump & Bore Systems',
        description: 'Dedicated standalone solar pump stations eliminate long trenching runs and power irrigation whenever the sun shines.',
        icon: '💧'
      },
      {
        title: 'Rugged Rural Enclosures',
        description: 'IP65/IP66 dust-tight and vermin-proof switchboards built to withstand harsh Victorian country conditions.',
        icon: '🌾'
      },
      {
        title: 'Typical 3 to 4 Year Payback',
        description: 'Rapid financial return driven by replacing high-tariff regional electricity and rising diesel prices.',
        icon: '⚡'
      }
    ],
    contentSections: [
      {
        heading: 'Engineered for Victorian Agricultural Demands',
        paragraphs: [
          'Rural properties require more than suburban residential templates. Agricultural installations involve long sub-main cable runs, voltage-drop considerations, high inrush currents from three-phase electric motors, and remote outbuilding power.',
          'At Billabong Solar, we design solutions around your operations: whether that means a generous 50 kW array across a machinery shed roof, a ground-mounted system positioned in an unshaded paddock, or an independent solar-plus-battery setup for a distant bore pump.',
          'Because every system is calibrated to your real operational schedule, generated energy is utilized directly for pumping, refrigeration, and equipment. For most Victorian farms and wineries, this yields payback in around 3 to 4 years—often even faster when substituting diesel generator fuel.'
        ]
      },
      {
        heading: 'Supporting Regional Victoria from Cobblebank',
        paragraphs: [
          'From our Cobblebank regional hub, we actively service agribusinesses across Ararat, the Macedon Ranges, the Bellarine, Ballarat, and Bendigo districts. Our engineers conduct on-site property evaluations, assessing switchboards, line distances, and machinery loads in person.'
        ]
      }
    ],
    commonQuestions: [
      {
        question: 'Can you power an irrigation pump located far from the main meter box?',
        answer: 'Yes. Installing an autonomous off-grid solar-and-battery system at the pump site is typically far more cost-effective than trenching heavy electrical cables across kilometres of paddocks.'
      },
      {
        question: 'Will farm dust and harsh weather damage the equipment?',
        answer: 'We specifically select IP65/IP66 rated dust-proof inverters, heavy-duty vermin-resistant conduits, and cyclone-rated mounting hardware designed for Australian agricultural conditions.'
      },
      {
        question: 'Can we start with a modest array and expand later?',
        answer: 'Yes. We engineer our agricultural switchboards and inverter infrastructure with built-in expansion capacity, allowing you to add extra solar panels or battery banks as your operational needs grow.'
      }
    ],
    caseStudyPlaceholder: {
      type: 'Boutique Winery & Cellar Door',
      typicalSize: '45 kW Shed-Mounted Solar with 30 kWh Battery',
      outcome: 'Offset 72% of daytime refrigeration and bottling energy, delivering full payback in 3.2 years.'
    },
    imageBrief: {
      heroShotAlt: 'Ground-mounted and shed solar array on a regional Victorian farm property with paddocks',
      detailShotAlt: 'Solar panels installed on farm machinery shed and wool shed'
    }
  },
  {
    slug: 'retail-offices-clubs',
    title: 'Retail, Offices, Sports Clubs & Community',
    metaTitle: 'Solar for Shops, Offices, Sports Clubs and Community Buildings | Billabong Solar',
    metaDescription: 'Lower running costs for shops, offices, clubs and community buildings. Solar sized to your usage, with most systems paying for themselves in around 3 to 4 years.',
    h1: 'Solar for Shops, Offices, Sports Clubs and Community Buildings',
    heroBadge: 'Commercial Retail & Community Solar',
    heroSubheadline: 'Lower operating overheads for shops, offices, bowling clubs, and sports pavilions. Sized to your schedule with typical 3 to 4 year payback.',
    heroDescription: 'Shops, professional offices, and medical centres trade during daytime business hours—running air conditioning, illumination, IT infrastructure, and appliances all day long. That daytime load pattern is where solar shines brightest, delivering dependable overhead reductions with typical payback in 3 to 4 years.',
    targetLocations: ['Melbourne East', 'Mornington Peninsula', 'Scoresby', 'Knoxfield', 'Geelong', 'Ballarat'],
    keyHighlights: [
      {
        title: 'Trading Hours Alignment',
        description: 'Business hours from 8:00 AM to 5:30 PM correlate directly with solar generation, displacing top-tier commercial retail rates.',
        icon: '🏪'
      },
      {
        title: 'Sports Club Battery Systems',
        description: 'Store afternoon sunshine to power evening floodlit training sessions, clubrooms, and canteen hospitality.',
        icon: '⚽'
      },
      {
        title: 'Clear Committee Proposals',
        description: 'Comprehensive, jargon-free business cases and ROI projections structured specifically for board and committee review.',
        icon: '📋'
      },
      {
        title: 'Grant & Rebate Support',
        description: 'Assistance identifying and securing local council community grants and federal battery rebate opportunities.',
        icon: '🏛️'
      }
    ],
    contentSections: [
      {
        heading: 'Tailored for Commercial Tenancies & Community Facilities',
        paragraphs: [
          'Commercial businesses and community sports clubs possess different operating rhythms. For retail premises, medical suites, and professional offices, electrical consumption peaks on weekdays during business hours. Solar captures this steady daytime demand, delivering consistent operating expense relief and reliable returns.',
          'Sports pavilions, bowling clubs, and community halls operate on alternate schedules: activity peaks during late afternoons, evenings, and weekends. For these organizations, pairing rooftop solar with battery storage enables stored daytime power to illuminate evening training sessions and power clubroom canteens without draining community funds.',
          'Every dollar saved on energy costs is a dollar reinvested directly into club facilities, junior sports programs, and member services.'
        ]
      },
      {
        heading: 'Straightforward Approvals for Landlords & Committees',
        paragraphs: [
          'We make the governance and approval process simple. For tenants, we prepare detailed landlord briefing documents explaining structural safety, installation specifications, and capital asset enhancement. For sports clubs and non-profit committees, our engineers provide clear, professional presentations that make decision-making transparent and unanimous.'
        ]
      }
    ],
    commonQuestions: [
      {
        question: 'We lease our retail shop or commercial office. Can we still get solar?',
        answer: 'Yes. On medium-to-long term leases, commercial solar remains highly beneficial. We prepare professional technical documentation for your landlord demonstrating how solar adds value to their property.'
      },
      {
        question: 'Our club committee requires formal proposals. Can you present to the board?',
        answer: 'Yes. We regularly supply detailed written feasibility reports and are pleased to attend committee meetings to address questions directly in plain English.'
      },
      {
        question: 'Is solar worthwhile if our community facility is only open part of the week?',
        answer: 'It depends on your weekly energy profile. We analyze your interval billing data honestly; if solar does not deliver a strong return for your usage pattern, we will tell you straight.'
      }
    ],
    caseStudyPlaceholder: {
      type: 'Suburban Community Sports Club Pavilion',
      typicalSize: '30 kW Solar Array with 28 kWh Battery Storage',
      outcome: 'Powered evening ground lighting and clubroom refrigeration, reducing annual grid power bills by over 60%.'
    },
    imageBrief: {
      heroShotAlt: 'Solar panels installed on suburban retail building and medical centre roof in Melbourne',
      detailShotAlt: 'Sports club pavilion with rooftop solar array overlooking sporting oval'
    }
  }
];

export function getCommercialIndustryBySlug(slug: string): CommercialIndustryData | undefined {
  return COMMERCIAL_INDUSTRIES_DATA.find((item) => item.slug === slug);
}

export function getAllCommercialIndustries(): CommercialIndustryData[] {
  return COMMERCIAL_INDUSTRIES_DATA;
}
