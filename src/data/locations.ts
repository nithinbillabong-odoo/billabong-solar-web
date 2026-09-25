export interface SuburbData {
  slug: string;
  name: string;
  postcode: string;
  region: 'Melbourne East' | 'Mornington Peninsula' | 'Geelong & Bellarine' | 'Ballarat & Central' | 'Bendigo' | 'Macedon Ranges' | 'Ararat';
  tier: 1 | 2 | 3;
  servicingOffice: 'Scoresby' | 'Cobblebank';
  ownedOutrightPct: number;
  medianAge: number;
  solarYieldDailyAvg: number; // kWh per kW north-facing
  summerYieldDailyAvg: number;
  leadAngle: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  mainContentParagraphs: string[];
  localFocusHighlights: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SUBURBS_DATA: SuburbData[] = [
  // --- TIER 1: MELBOURNE EAST (Serviced from Scoresby) ---
  {
    slug: 'rowville',
    name: 'Rowville',
    postcode: '3178',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 36,
    medianAge: 41,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Busy family homes',
    metaTitle: 'Solar and Battery Systems Rowville 3178 | Billabong Solar',
    metaDescription: 'Engineered solar panels and battery storage for busy Rowville family homes. Local advice from our nearby Scoresby office. Request an honest roof assessment.',
    heroHeadline: 'Solar and Battery Systems Designed for Busy Rowville Homes',
    heroSubheadline: 'Your local solar engineers just minutes away in Scoresby. Powering your late-afternoon rush with clean, self-generated energy.',
    mainContentParagraphs: [
      'Rowville homes are active family hubs. From morning school runs to afternoon sports drop-offs, family dinners, evening washing cycles, and year-round heating or air conditioning, energy demand inevitably concentrates into late afternoons and evenings. That timing is precisely why pairing high-efficiency solar panels with battery storage makes profound sense for Rowville households: your rooftop panels generate maximum power during the sun-drenched hours while everyone is out, and the stored battery reserve seamlessly carries your home through the peak evening rush.',
      'Because our primary technical hub is located just minutes away in Scoresby on Caribbean Drive, site surveys, roof structural checks, and after-sales support are genuinely local. We do not dispatch subcontracted, fly-by-night crews from across the state. When you ask us for references, we will gladly connect you with verified installations and happy homeowners in your immediate neighbourhood.',
      'Under Australian Consumer Law and our NETCC Approved Seller charter, we believe in radical transparency. We never push generic, off-the-shelf system bundles or unrealistic payback promises. One of our Clean Energy Council accredited engineers personally assesses your roof azimuth, pitch, switchboard capacity, and seasonal consumption bills to formulate a tailored system that actually serves your household lifestyle.'
    ],
    localFocusHighlights: [
      {
        title: 'Minutes from Our Scoresby Office',
        description: 'Our head office and engineering team sit right on your doorstep, ensuring swift site consultations, prompt grid approvals with AusNet/United Energy, and lifetime local care.'
      },
      {
        title: 'Designed for the Evening Family Peak',
        description: 'We right-size your lithium battery capacity so stored daytime kilowatt-hours power induction cooktops, heating, EV charging, and appliances well into the night.'
      },
      {
        title: 'Verified Local References',
        description: 'Ask us to see real case studies and references from fellow Rowville residents who have engineered their homes for energy independence.'
      }
    ],
    faqs: [
      {
        question: 'How much solar energy does a Rowville home typically generate?',
        answer: 'Based on the EU PVGIS model for Melbourne’s east, each kilowatt (kW) of north-facing panels tilted at 30 degrees produces approximately 4.0 kWh per day across the year, rising above 5.0 kWh daily during peak summer months.'
      },
      {
        question: 'Do you use in-house electricians or subcontractors in Rowville?',
        answer: 'All installations are managed, engineered, and signed off directly by our own licensed electrical personnel from our nearby Scoresby facility.'
      },
      {
        question: 'Can a battery protect our Rowville home during a local blackout?',
        answer: 'Yes. When configured with an emergency blackout backup circuit, your battery will immediately isolate your home from the grid and keep essential loads—including refrigerators, lighting, Wi-Fi, and medical equipment—operational.'
      }
    ]
  },
  {
    slug: 'lysterfield',
    name: 'Lysterfield',
    postcode: '3156',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 38,
    medianAge: 41,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Larger homes and power reliability',
    metaTitle: 'Solar and Battery Systems Lysterfield 3156 | Billabong Solar',
    metaDescription: 'High-capacity solar systems and battery blackout backup for acreage and larger homes in Lysterfield. Local engineering support from nearby Scoresby.',
    heroHeadline: 'High-Capacity Solar & Outage Protection for Lysterfield Properties',
    heroSubheadline: 'Engineered for larger residences, swimming pools, workshops, and dependable blackout protection along the foothills.',
    mainContentParagraphs: [
      'Lysterfield properties represent some of the most generous living spaces in Melbourne’s outer east. With large floor plans, sprawling roof lines, swimming pools, workshops, and extensive ducted heating and cooling, energy usage is naturally higher than average suburban blocks. Fortunately, these generous dimensions provide ample roof space to deploy high-output solar arrays engineered around substantial, whole-home power requirements.',
      'Living on the bushland edge around Lysterfield Lake also brings unique regional realities: frequent severe weather events, falling timber, and grid vulnerability. When high winds hit the foothills, local power outages can leave households stranded without refrigeration, water pumping, or internet connectivity. We engineer robust solar-plus-battery installations equipped with dedicated backup circuits, ensuring your critical household functions continue operating seamlessly whenever the main grid trips.',
      'Our Scoresby facility is just down Wellington Road. We inspect your property in person, analyze your 3-phase power configuration if present, and engineer an installation designed specifically around your roof structure rather than forcing a pre-packaged template onto your home.'
    ],
    localFocusHighlights: [
      {
        title: 'High-Load Engineering',
        description: 'Purpose-built configurations for homes operating ducted heat pumps, EV chargers, pool filtration pumps, and three-phase workshops.'
      },
      {
        title: 'Foothills Storm & Outage Resilience',
        description: 'Instantaneous automated changeover to battery reserve keeps refrigeration, security, and lighting running during bushland power cuts.'
      },
      {
        title: 'Scoresby-Based Team',
        description: 'Direct local access to our senior engineering staff for ongoing system monitoring, maintenance, and expansion advice.'
      }
    ],
    faqs: [
      {
        question: 'Can solar handle 3-phase power common in Lysterfield acreage homes?',
        answer: 'Absolutely. We specialize in commercial and residential 3-phase hybrid inverters that balance solar power and battery backup smoothly across all three phases.'
      },
      {
        question: 'Are ground-mounted solar arrays an option for larger Lysterfield blocks?',
        answer: 'Yes, if your roof orientation or tree canopy restricts rooftop solar, we can engineer and install ground-mounted arrays to capture unobstructed sun exposure.'
      }
    ]
  },
  {
    slug: 'wheelers-hill',
    name: 'Wheelers Hill',
    postcode: '3150',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 48,
    medianAge: 48,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Retirees at home during the day',
    metaTitle: 'Solar and Battery Storage Wheelers Hill 3150 | Billabong Solar',
    metaDescription: 'Trusted solar installations for Wheelers Hill homeowners. Maximize daytime self-consumption with honest advice and premium engineering from nearby Scoresby.',
    heroHeadline: 'Quiet, Dependable Solar Engineered for Wheelers Hill',
    heroSubheadline: 'Turn daytime sunshine into immediate household value with plain-English engineering advice and zero aggressive sales tactics.',
    mainContentParagraphs: [
      'Nearly half the private dwellings in Wheelers Hill are owned outright, and a significant portion of residents are retired or semi-retired. This lifestyle demographic directly alters the economics of solar power: when residents are at home during the day, electricity produced by rooftop panels is consumed immediately on-site—running cooling, heating, cooking, and appliances without ever needing to buy power from the grid.',
      'Self-consuming daytime solar is by far the highest-yielding application of solar technology in Victoria today. Rather than exporting surplus energy back to retailers for nominal feed-in tariffs, your solar system actively shields your household from quarterly utility price hikes and escalating peak supply charges.',
      'Our Wheelers Hill customers routinely tell us they want a reliable system that works silently in the background, is explained clearly without technical jargon, and is supported by people who will still be here in 10 or 20 years. That is how Billabong Solar operates: no commission-driven door knockers, just experienced engineers who listen, inspect your property, and provide honest recommendations.'
    ],
    localFocusHighlights: [
      {
        title: 'High Daytime Self-Consumption',
        description: 'System designs calibrated specifically for owners spending substantial daylight hours at home.'
      },
      {
        title: 'Plain-English Consultations',
        description: 'We demystify battery sizing, feed-in rates, and government incentives with full transparency and zero high-pressure tactics.'
      },
      {
        title: 'Reputable Local Presence',
        description: 'Operating since 2012 with a spotless 5.0 Google review record, supported by our nearby Scoresby headquarters.'
      }
    ],
    faqs: [
      {
        question: 'Is Wheelers Hill well-suited for solar generation?',
        answer: 'Yes, elevated areas in Wheelers Hill receive excellent solar exposure, yielding around 4.0 kWh per day per kW of panels across the year (and 5+ kWh/day in summer).'
      },
      {
        question: 'Do I really need a battery if I am home during the day?',
        answer: 'Not necessarily. If your daytime usage matches your system output, a standalone solar array may suit you best. If you run heavy heating or cooling into the evening, we will show you whether adding a right-sized battery makes sense.'
      }
    ]
  },
  {
    slug: 'mulgrave',
    name: 'Mulgrave',
    postcode: '3170',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 38,
    medianAge: 40,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Homes plus local business',
    metaTitle: 'Solar Panels & Commercial Solar Mulgrave 3170 | Billabong Solar',
    metaDescription: 'Residential solar and commercial rooftop systems in Mulgrave. Sized to your actual load by licensed engineers. Based nearby in Scoresby.',
    heroHeadline: 'Residential and Commercial Solar Solutions for Mulgrave',
    heroSubheadline: 'Powering established suburban homes and thriving commercial precincts across Mulgrave with custom-engineered solar and battery systems.',
    mainContentParagraphs: [
      'Mulgrave occupies a unique cross-section in Melbourne’s south-east, combining established residential neighbourhoods with one of the region’s premier corporate, light industrial, and business corridors. At Billabong Solar, we work across both sides of that boundary: delivering right-sized solar and battery systems for family residences, alongside large-scale rooftop arrays for commercial workshops, distribution centers, and offices.',
      'For Mulgrave families, our focus is simple: minimizing reliance on escalating electricity rates through intelligent load-matching and battery storage. For Mulgrave business owners operating along Springvale Road and Wellington Road, daytime business hours mirror solar production perfectly. Sizing a system to your daytime commercial load replaces grid power at peak retail commercial rates, providing dependable operating cost reduction.',
      'Our team is based right next door in Scoresby. We handle every step in-house—from distribution network approvals with United Energy to switchboard modernization and final commissioning.'
    ],
    localFocusHighlights: [
      {
        title: 'Dual Residential & Commercial Mastery',
        description: 'Expertise ranging from 6.6 kW home battery systems up to 100 kW+ commercial rooftop arrays.'
      },
      {
        title: 'Network Approval Specialists',
        description: 'Extensive experience navigating United Energy grid connection requirements for smooth, delay-free installations.'
      },
      {
        title: 'Next-Door Engineering Support',
        description: 'Located right beside Mulgrave in Scoresby for responsive on-site technical evaluations and ongoing support.'
      }
    ],
    faqs: [
      {
        question: 'Can you install solar on commercial tilt-slab buildings in Mulgrave?',
        answer: 'Yes, our engineering team regularly designs and installs non-penetrating or engineered metal roof mounts for commercial and industrial facilities.'
      },
      {
        question: 'Do Mulgrave homes qualify for the Victorian solar battery rebate?',
        answer: 'Eligible households can access federal rebates (which support up to the first 14 kWh of capacity at the highest rate) and Solar Victoria incentives where applicable.'
      }
    ]
  },
  {
    slug: 'glen-waverley',
    name: 'Glen Waverley',
    postcode: '3150',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 41,
    medianAge: 40,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Moving away from gas',
    metaTitle: 'Solar & Battery Installation Glen Waverley 3150 | Billabong Solar',
    metaDescription: 'Transition your Glen Waverley home from rising gas bills to efficient all-electric solar power. Clean energy engineered by local Scoresby specialists.',
    heroHeadline: 'Transition Away from Gas with Engineered Solar in Glen Waverley',
    heroSubheadline: 'Eliminate climbing gas costs and future-proof your Glen Waverley residence with high-efficiency rooftop solar and battery storage.',
    mainContentParagraphs: [
      'Many established homes in Glen Waverley were historically built with comprehensive gas infrastructure: gas ducted heating, gas hot water cylinders, and gas cooking. Over recent years, Victorian domestic gas tariffs have escalated dramatically, prompting many forward-thinking households to plan a structured transition toward an all-electric home.',
      'A custom-designed solar and battery installation is the cornerstone of this transition. When your roof generates clean, zero-emission electricity, operating energy-efficient heat pump hot water units, induction cooktops, and modern reverse-cycle split systems becomes substantially more affordable than paying steep seasonal gas bills.',
      'At Billabong Solar, we help Glen Waverley homeowners plan this changeover methodically. Rather than overwhelming you with unnecessary hardware, we size your solar array to accommodate your home’s future electrical demand, creating a gradual roadmap that delivers immediate benefits from day one.'
    ],
    localFocusHighlights: [
      {
        title: 'All-Electric Home Strategic Design',
        description: 'Systems designed with surplus capacity to effortlessly absorb modern heat pumps, induction cooking, and EV chargers.'
      },
      {
        title: 'Scoresby Engineering Hub',
        description: 'Located just a quick drive down EastLink/Wellington Rd, offering on-site technical surveys and prompt customer care.'
      },
      {
        title: 'Architectural Aesthetics',
        description: 'Sleek, all-black premium solar panels that integrate elegantly with established Glen Waverley rooflines and architecture.'
      }
    ],
    faqs: [
      {
        question: 'How does solar help replace gas ducted heating?',
        answer: 'By pairing rooftop solar with an efficient reverse-cycle heat pump, daytime solar energy runs your heating directly, while a battery stores power to warm the house into chilly evenings.'
      },
      {
        question: 'Will Glen Waverley multi-storey homes require scaffolding?',
        answer: 'Our in-house team surveys two-storey and complex rooflines beforehand to ensure safe access and compliant working-at-heights equipment.'
      }
    ]
  },
  {
    slug: 'vermont-south',
    name: 'Vermont South',
    postcode: '3133',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 48,
    medianAge: 46,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Early-adopter systems ready for an upgrade',
    metaTitle: 'Solar Upgrades & Battery Retrofits Vermont South 3133 | Billabong Solar',
    metaDescription: 'Upgrade legacy solar and replace ended 60c feed-in tariffs in Vermont South. Expert battery retrofits and modern panel replacements from Scoresby.',
    heroHeadline: 'Upgrade Your Vermont South Solar for the Modern Battery Era',
    heroSubheadline: 'With the legacy 60c feed-in tariff finished, discover how modern panels and lithium storage unlock real value from your roof.',
    mainContentParagraphs: [
      'Vermont South was one of Victoria’s pioneering solar communities. Back in 2009 to 2011, hundreds of local households installed modest 1.5 kW to 3 kW systems to capitalize on the lucrative state 60c premium feed-in tariff. That historic scheme officially concluded in November 2024. Today, those decade-old inverters and small panel arrays are producing power that earns only a nominal feed-in credit from retailers.',
      'If your Vermont South home features an older system, you now have compelling upgrade opportunities: adding a high-capacity lithium battery to store what you produce, replacing legacy low-wattage panels with high-efficiency 440W+ modules, or engineering a complete, modern hybrid setup.',
      'Our engineers will inspect your existing setup, check the condition of your wiring, isolators, and mounting hardware, and give you an unvarnished assessment of what is worth keeping and what should be replaced.'
    ],
    localFocusHighlights: [
      {
        title: 'Post-60c Tariff Solutions',
        description: 'Repurpose existing rooftop real estate to store energy locally instead of exporting for minimal compensation.'
      },
      {
        title: 'Honest System Health Audits',
        description: 'Comprehensive inspection of older inverters, cabling, and safety switches before recommending any upgrades.'
      },
      {
        title: 'AC-Coupled Battery Retrofits',
        description: 'Integrate state-of-the-art battery storage alongside existing operational inverters without voiding warranties.'
      }
    ],
    faqs: [
      {
        question: 'My solar system was installed in 2010. Can I just add a battery?',
        answer: 'Yes. An AC-coupled battery can be installed alongside older solar systems, allowing you to charge the battery from your existing panels without altering your rooftop array.'
      },
      {
        question: 'Is it better to replace old 1.5kW panels or keep them?',
        answer: 'Modern panels produce over 3 times the wattage per square metre of older panels. We will calculate whether an overhaul or battery addition offers the cleanest path forward.'
      }
    ]
  },
  {
    slug: 'wantirna',
    name: 'Wantirna',
    postcode: '3152',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 39,
    medianAge: 41,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'First-time solar, honest advice',
    metaTitle: 'Solar and Battery Installation Wantirna 3152 | Billabong Solar',
    metaDescription: 'First-time solar buyer in Wantirna? Get straight, jargon-free advice from accredited engineers based just around the corner in Scoresby.',
    heroHeadline: 'Clear, Trustworthy Solar Advice for Wantirna Homeowners',
    heroSubheadline: 'No pushy sales reps, no misleading promises—just straightforward solar and battery engineering from your local Scoresby neighbors.',
    mainContentParagraphs: [
      'Many Wantirna households have considered going solar for years but held back. The reason is understandable: the market has been flooded with aggressive door-to-door salesmen, confusing telemarketers, and heavily discounted quote aggregators that make apples-to-apples comparisons virtually impossible. We believe caution in making a major home investment is entirely healthy.',
      'Billabong Solar operates with a completely different mindset. Headquartered right around the corner in Scoresby, we do not employ aggressive sales personnel. When you contact us, you consult with an engineer who explains the fundamentals in plain English: what kilowatt capacity your home actually needs, whether a battery is justifiable now or in the future, and what government incentives genuinely apply to your situation.',
      'Our team handles the paperwork, liaises directly with network distributors, and guarantees premium workmanship backed by our 5.0 customer satisfaction track record since 2012.'
    ],
    localFocusHighlights: [
      {
        title: 'Zero Sales Pressure',
        description: 'Transparent consultations focused solely on what makes technical and financial sense for your household.'
      },
      {
        title: 'Minutes from Wantirna',
        description: 'Our Scoresby showroom and technical depot mean assistance and site assessments are always just a five-minute drive away.'
      },
      {
        title: 'Complete Incentive Handling',
        description: 'We calculate and process all STC rebates and federal battery incentives on your behalf.'
      }
    ],
    faqs: [
      {
        question: 'What size solar system is recommended for a standard Wantirna 3-4 bedroom home?',
        answer: 'Most Wantirna homes benefit from a 6.6 kW to 10 kW system paired with an 8 kWh to 14 kWh battery, depending on daytime occupancy and ducted air-conditioning loads.'
      },
      {
        question: 'How long does a residential solar installation take?',
        answer: 'Most standard residential installations are fully completed, tested, and commissioned within a single working day.'
      }
    ]
  },
  {
    slug: 'wantirna-south',
    name: 'Wantirna South',
    postcode: '3152',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 37,
    medianAge: 42,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Smaller households, right-sized batteries',
    metaTitle: 'Solar and Battery Storage Wantirna South 3152 | Billabong Solar',
    metaDescription: 'Right-sized solar and battery storage in Wantirna South. Maximize the federal battery rebate with honest sizing tailored to your usage. Scoresby based.',
    heroHeadline: 'Right-Sized Solar & Batteries for Wantirna South Homes',
    heroSubheadline: 'Avoid oversized systems and unnecessary expense with balanced, precision-engineered solar tailored to your household consumption.',
    mainContentParagraphs: [
      'Not every household requires a massive 15 kW commercial-scale array. Many homes in Wantirna South are occupied by couples, downsizers, or smaller families in villas, townhouses, and established brick homes. What these residences need is an accurately sized system engineered around their specific utility consumption—not the biggest, most expensive package on an installer’s price list.',
      'Sizing accuracy matters more than ever because the current federal battery rebate delivers its highest financial support on the first 14 kWh of storage capacity. For many Wantirna South homes, a modest, well-matched 5 kW to 8 kW solar array coupled with a compact 10 kWh battery provides the ultimate sweet spot: capturing daily surplus without paying for unused storage.',
      'We inspect your actual interval billing data to calculate exactly where diminishing returns occur, ensuring you invest only in hardware that actively lowers your power bills.'
    ],
    localFocusHighlights: [
      {
        title: 'Maximized Rebate Sizing',
        description: 'Engineered to capture maximum tier-one federal battery subsidy support without unnecessary capital outlay.'
      },
      {
        title: 'Compact & Townhouse Friendly',
        description: 'Specialist designs for townhouses and complex roofs where panel real estate and inverter placement require thoughtful planning.'
      },
      {
        title: 'Scoresby Support Base',
        description: 'Rapid technical visits and localized after-sales care directly from our Scoresby engineering headquarters.'
      }
    ],
    faqs: [
      {
        question: 'Can solar be installed on a single-storey villa in Wantirna South?',
        answer: 'Yes, provided you own the roof space or have body corporate approval, we can engineer high-efficiency compact systems for villas and units.'
      },
      {
        question: 'What is the federal battery rebate threshold?',
        answer: 'The federal rebate provides its maximum value per kilowatt-hour on the first 14 kWh of capacity, making right-sized domestic batteries exceptionally attractive.'
      }
    ]
  },
  {
    slug: 'ferntree-gully',
    name: 'Ferntree Gully',
    postcode: '3156',
    region: 'Melbourne East',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 34,
    medianAge: 40,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Designing around trees and shade',
    metaTitle: 'Solar and Battery Storage Ferntree Gully 3156 | Billabong Solar',
    metaDescription: 'Where Billabong Solar began in 2012. Overcome tree shade and complex foothill rooflines with microinverters and smart solar engineering.',
    heroHeadline: 'Mastering Shade & Foothill Solar in Ferntree Gully',
    heroSubheadline: 'Where Billabong Solar began in 2012. Engineered solutions designed specifically around Dandenong foothills trees and afternoon shadows.',
    mainContentParagraphs: [
      'Ferntree Gully is where Billabong Solar was founded back in 2012. It is also where our engineers first mastered one of the Dandenong foothills’ greatest technical challenges: tall gum trees, undulating topography, and dynamic afternoon shading. When a standard string-inverter system encounters shade on just one panel, output across the entire circuit can drop drastically.',
      'We tackle Ferntree Gully rooflines with specialized engineering. By utilizing microinverters or individual panel DC optimizers, every solar module operates independently. If a nearby eucalyptus tree casts a shadow over two panels in the late afternoon, the remaining panels continue producing power at 100% capacity.',
      'Having served neighbours across Ferntree Gully for well over a decade, we understand local roof pitches, tile compositions, and mountain weather patterns intimately. We offer free on-site shadow analyses to show you exactly how your system will perform across all four seasons.'
    ],
    localFocusHighlights: [
      {
        title: 'Our Original Hometown',
        description: 'Billabong Solar was born in Ferntree Gully in 2012. Our local track record and deep community ties are unmatched.'
      },
      {
        title: 'Shade Mitigation Specialists',
        description: 'Advanced Enphase microinverters and SolarEdge DC optimizers that eliminate the performance penalties caused by tall trees.'
      },
      {
        title: 'Foothill Structural Audits',
        description: 'Experienced installations across steep roof pitches, terracotta tiles, and high-wind foothill zones.'
      }
    ],
    faqs: [
      {
        question: 'Can I get solar in Ferntree Gully if my yard has large gum trees?',
        answer: 'Yes. By conducting a detailed solar path analysis and using independent module-level power electronics (microinverters or optimizers), we can capture significant solar energy even with partial shading.'
      },
      {
        question: 'How do microinverters differ from standard string inverters?',
        answer: 'A string inverter links panels together like Christmas lights—one shaded panel affects the whole string. Microinverters operate each panel independently, ensuring unshaded panels operate at full efficiency.'
      }
    ]
  },

  // --- TIER 1: MORNINGTON PENINSULA (Serviced from Scoresby) ---
  {
    slug: 'mornington',
    name: 'Mornington',
    postcode: '3931',
    region: 'Mornington Peninsula',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 41,
    medianAge: 50,
    solarYieldDailyAvg: 4.1,
    summerYieldDailyAvg: 5.2,
    leadAngle: 'Retirees wanting predictable bills',
    metaTitle: 'Solar and Battery Storage Mornington 3931 | Billabong Solar',
    metaDescription: 'Lock in predictable energy bills in Mornington with engineered solar and battery systems. Trusted advice and coastal-grade hardware from Billabong Solar.',
    heroHeadline: 'Predictable Energy Costs for Mornington Homeowners',
    heroSubheadline: 'The Peninsula boasts some of Victoria’s best sunshine. Lock in stable, self-generated power with engineered solar and battery storage.',
    mainContentParagraphs: [
      'The Mornington Peninsula enjoys some of the most favorable solar radiation in Victoria, generating roughly 4.1 kWh daily per kilowatt of north-facing panels across the year (and well over 5.2 kWh daily in summer). For Mornington’s large population of settled homeowners and retirees, this abundant natural resource presents an ideal opportunity to achieve long-term budget predictability.',
      'As power retailers continue adjusting tariffs and supply fees, relying on grid electricity introduces unwelcome volatility into fixed household budgets. Pairing solar panels with a battery allows Mornington residents to generate and store their own clean power, effectively dampening future energy price shocks.',
      'We also work closely with Mornington’s vibrant local business community—including cafes, retail boutiques, medical practices, and professional offices along Main Street—designing commercial systems where high daytime trading hours align perfectly with peak solar output.'
    ],
    localFocusHighlights: [
      {
        title: 'Premier Coastal Sun Hours',
        description: 'Mornington’s open bay exposure yields over 4.1 kWh per kW per day, significantly higher than inner Melbourne averages.'
      },
      {
        title: 'Fixed Budget Certainty',
        description: 'Shield your household from volatile utility pricing with robust, warranted solar and battery storage.'
      },
      {
        title: 'Commercial & Retail Expertise',
        description: 'Tailored commercial rooftop installations designed around daytime air conditioning and equipment usage.'
      }
    ],
    faqs: [
      {
        question: 'Does sea air damage solar panels in Mornington?',
        answer: 'We exclusively specify coastal-certified anodized aluminium racking, 316 stainless-steel fasteners, and salt-mist corrosion-resistant panels designed specifically for marine environments.'
      },
      {
        question: 'How do seasonal winter bills compare on the Peninsula?',
        answer: 'While winter generation drops compared to summer, pairing solar with a battery and heat pump significantly lowers winter heating overheads.'
      }
    ]
  },
  {
    slug: 'mount-martha',
    name: 'Mount Martha',
    postcode: '3934',
    region: 'Mornington Peninsula',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 42,
    medianAge: 46,
    solarYieldDailyAvg: 4.1,
    summerYieldDailyAvg: 5.2,
    leadAngle: 'Larger homes, pools and full systems',
    metaTitle: 'Solar Panels & Battery Systems Mount Martha 3934 | Billabong Solar',
    metaDescription: 'Engineered solar systems for generous Mount Martha residences. Power your pool pumps, climate control, and EV charging with high-capacity solar.',
    heroHeadline: 'High-Capacity Solar for Mount Martha Homes & Pools',
    heroSubheadline: 'Engineered around generous floor plans, heated swimming pools, climate control, and complete energy self-sufficiency.',
    mainContentParagraphs: [
      'Mount Martha residences are renowned for their generous architectural proportions, expansive rooflines, and outdoor lifestyle features. Swimming pools, outdoor spas, multi-zone ducted heating and cooling, and modern electric vehicle chargers demand substantial electrical throughput. Piecing together a small, off-the-shelf system rarely suffices for properties of this scale.',
      'Billabong Solar engineers complete, integrated solar and battery systems designed holistically from day one. We analyze the continuous kilowatt draw of pool filtration pumps, heat exchangers, and household air conditioning to formulate a high-capacity array (often 10 kW to 15 kW+) paired with modular high-voltage batteries.',
      'Our team uses premium, high-efficiency panels that maximize yield per square metre while preserving the clean architectural lines of your Mount Martha home.'
    ],
    localFocusHighlights: [
      {
        title: 'Pool & Spa Automation Sync',
        description: 'Program daytime pool pump cycles to coincide seamlessly with peak solar generation hours.'
      },
      {
        title: 'Integrated Whole-Home Design',
        description: 'Sized to handle heavy concurrent domestic loads including induction cooktops, ducted HVAC, and EV chargers.'
      },
      {
        title: 'Aesthetic Coastal Finishes',
        description: 'Low-profile all-black panels and hidden conduit runs that respect your property’s architectural finish.'
      }
    ],
    faqs: [
      {
        question: 'Can solar run my Mount Martha pool heat pump?',
        answer: 'Yes. Running pool heating during the day allows you to leverage free solar generation, significantly reducing the operating costs of your pool.'
      },
      {
        question: 'What happens if my Mount Martha roof faces multiple directions?',
        answer: 'We utilize multi-tracker inverters or microinverters to split solar generation across east, north, and west roof faces, delivering smooth power from sunrise to sunset.'
      }
    ]
  },
  {
    slug: 'safety-beach',
    name: 'Safety Beach',
    postcode: '3936',
    region: 'Mornington Peninsula',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 41,
    medianAge: 53,
    solarYieldDailyAvg: 4.1,
    summerYieldDailyAvg: 5.2,
    leadAngle: 'Coastal conditions',
    metaTitle: 'Marine-Grade Coastal Solar Safety Beach 3936 | Billabong Solar',
    metaDescription: 'Engineered coastal solar systems for Safety Beach homes. Salt-mist resistant panels, 316 stainless fixings, and durable battery storage.',
    heroHeadline: 'Marine-Grade Coastal Solar for Safety Beach',
    heroSubheadline: 'Living by the bay is magnificent, but salt air tests hardware. We engineer marine-durable solar systems built to endure.',
    mainContentParagraphs: [
      'Residing near the shoreline in Safety Beach offers an idyllic lifestyle, but coastal salt spray, marine humidity, and strong sea breezes create an unforgiving environment for rooftop electrical installations. Standard budget mounting rails and generic fixings can quickly show signs of galvanic corrosion and premature degradation.',
      'At Billabong Solar, we engineer coastal solar specifically for Safety Beach. We specify marine-grade anodized aluminium mounting systems, 316 marine stainless-steel hardware, and Tier-1 solar panels certified to IEC 61701 Level 6 Salt Mist Corrosion resistance standards.',
      'With over 41% of Safety Beach homeowners owning their properties outright, our clients value systems built to last decades without maintenance headaches. We design installations that deliver trouble-free clean power so you can enjoy the coastal lifestyle without worrying about your rooftop equipment.'
    ],
    localFocusHighlights: [
      {
        title: 'Level 6 Salt-Mist Certified',
        description: 'Rigorously tested Tier-1 panels engineered to prevent corrosion and micro-cracking in marine atmospheres.'
      },
      {
        title: '316 Stainless Steel Fixings',
        description: 'Zero rust, zero galvanic degradation—ensuring structural integrity against coastal southerly winds.'
      },
      {
        title: 'Protected Inverter Placement',
        description: 'Inverters and batteries housed in weather-shielded, corrosion-resistant enclosures for longevity.'
      }
    ],
    faqs: [
      {
        question: 'How do you prevent salt corrosion on Safety Beach solar systems?',
        answer: 'We isolate dissimilar metals, use 316 stainless hardware, and select panels and inverters with the highest international marine corrosion ratings.'
      },
      {
        question: 'Does the Martha Cove canal precinct have specific design rules?',
        answer: 'We ensure all installations comply with local estate covenants and council planning guidelines, maintaining sleek, non-reflective profiles.'
      }
    ]
  },
  {
    slug: 'dromana',
    name: 'Dromana',
    postcode: '3936',
    region: 'Mornington Peninsula',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 44,
    medianAge: 50,
    solarYieldDailyAvg: 4.1,
    summerYieldDailyAvg: 5.2,
    leadAngle: 'Homes, hinterland and wineries',
    metaTitle: 'Solar for Homes, Hinterland & Wineries Dromana 3936 | Billabong Solar',
    metaDescription: 'Custom solar installations across Dromana—from coastal bay homes to Red Hill hinterland wineries and agribusinesses. Free local site survey.',
    heroHeadline: 'Solar for Dromana Coastal Homes & Hinterland Agribusiness',
    heroSubheadline: 'Spanning the bay and the hills. Engineered solar for residential homes, boutique vineyards, and hinterland agribusiness.',
    mainContentParagraphs: [
      'Dromana sits at the junction between Port Phillip Bay and the picturesque Mornington Peninsula hinterland. Our work here mirrors that geographical variety: we install sleek, salt-resistant residential arrays for established homes near the township, alongside robust high-capacity systems for wineries, cellar doors, orchards, and rural properties in the foothills behind Arthurs Seat.',
      'Commercial wineries and rural operations run specialized electrical loads: refrigeration compressors, barrel-room climate control, water pumps, and bottling equipment that run intensively during daytime hours. Sizing solar directly to these operating loads enables local producers to convert peak daytime sunshine into immediate operational savings.',
      'Whether you require a quiet residential battery system to offset winter reverse-cycle heating or an engineered three-phase array for a commercial shed, our engineers deliver tailored, dependable solutions.'
    ],
    localFocusHighlights: [
      {
        title: 'Vineyard & Cellar Door Solutions',
        description: 'Custom arrays tailored to daytime wine production, cooling tanks, and hospitality trade.'
      },
      {
        title: 'Hinterland Outbuilding Wiring',
        description: 'Specialist knowledge in long sub-main cable runs and multi-building distribution.'
      },
      {
        title: 'Coastal Residential Reliability',
        description: 'Protected domestic installations engineered against coastal weather and salt air.'
      }
    ],
    faqs: [
      {
        question: 'Can you install solar on farm sheds and workshops behind Dromana?',
        answer: 'Yes. We routinely engineer rooftop and ground-mounted arrays for machinery sheds, pump houses, and agricultural facilities.'
      },
      {
        question: 'What is the payback period for a Dromana commercial winery?',
        answer: 'Commercial systems sized accurately to daytime refrigeration loads typically see payback in approximately 3 to 4 years.'
      }
    ]
  },
  {
    slug: 'rosebud',
    name: 'Rosebud',
    postcode: '3939',
    region: 'Mornington Peninsula',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 41,
    medianAge: 49,
    solarYieldDailyAvg: 4.1,
    summerYieldDailyAvg: 5.2,
    leadAngle: 'Winter heating and fixed budgets',
    metaTitle: 'Solar and Battery Systems Rosebud 3939 | Billabong Solar',
    metaDescription: 'Take control of winter heating costs in Rosebud with engineered solar and battery systems. Honest advice, zero hype, and local support.',
    heroHeadline: 'Take the Sting Out of Winter Heating Bills in Rosebud',
    heroSubheadline: 'Engineered solar and battery storage designed to provide fixed-budget certainty and conquer seasonal heating spikes.',
    mainContentParagraphs: [
      'Rosebud is home to one of Melbourne’s most established coastal communities, where many households carefully manage finances on fixed retirement incomes. In this part of the Peninsula, cold coastal winters can make winter energy and heating bills the single largest household expense of the entire year.',
      'Pairing rooftop solar with modern high-efficiency electric heating and a battery takes the sting out of winter. During crisp sunny days, your solar panels generate power and charge the battery; as evening arrives, that stored energy powers your reverse-cycle heating and domestic appliances without incurring peak grid charges.',
      'We explain all government subsidies plainly—including how the federal battery rebate applies to your system. There are no gimmicks or inflated claims, just honest calculations showing you how a system will perform season by season.'
    ],
    localFocusHighlights: [
      {
        title: 'Winter Bill Relief',
        description: 'Optimized tilt angles and battery discharge profiles engineered to ease winter heating burdens.'
      },
      {
        title: 'Fixed Budget Confidence',
        description: 'Shield against unexpected quarterly utility bill shocks with reliable on-site energy storage.'
      },
      {
        title: 'Transparent Rebate Guidance',
        description: 'Clear explanations of federal incentives and Solar Victoria programs to maximize your financial support.'
      }
    ],
    faqs: [
      {
        question: 'Does solar still work on overcast winter days in Rosebud?',
        answer: 'Yes. Modern panels still generate power under diffuse cloud cover, producing enough energy to offset base household electrical loads.'
      },
      {
        question: 'Can a battery run my heating all night?',
        answer: 'A right-sized battery easily carries an efficient reverse-cycle heat pump through the evening peak hours when electricity tariffs are highest.'
      }
    ]
  },
  {
    slug: 'rye',
    name: 'Rye',
    postcode: '3941',
    region: 'Mornington Peninsula',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 46,
    medianAge: 51,
    solarYieldDailyAvg: 4.1,
    summerYieldDailyAvg: 5.2,
    leadAngle: 'Permanent residents and holiday homes',
    metaTitle: 'Solar Panels & Smart Monitoring Rye 3941 | Billabong Solar',
    metaDescription: 'Engineered solar and battery backup for Rye permanent residents and holiday homes. Outage protection and live remote smartphone monitoring.',
    heroHeadline: 'Solar Solutions for Rye Permanent Residents & Holiday Homes',
    heroSubheadline: 'Outage resilience for full-time residents and seamless smartphone monitoring for holiday homeowners across the southern Peninsula.',
    mainContentParagraphs: [
      'Rye combines a vibrant community of permanent residents with one of the state’s most popular coastal holiday destinations. Solar power delivers distinct, high-value benefits to both types of homeowners.',
      'For permanent residents, the southern Peninsula’s exposure to severe coastal weather means storm-related grid outages are a recurring reality. A solar system equipped with intelligent battery backup ensures your refrigerator, lighting, water pumps, and essential communications stay live during power cuts.',
      'For holiday home investors, every installation includes smart smartphone monitoring. You can check generation, battery storage, and property power consumption live from anywhere in the world, knowing your property is generating clean value even when unoccupied.'
    ],
    localFocusHighlights: [
      {
        title: 'Outage & Storm Resilience',
        description: 'Instant backup power switching protects food storage, pumps, and security systems during coastal blackouts.'
      },
      {
        title: 'Remote Smartphone Monitoring',
        description: 'Track generation, storage levels, and appliance usage remotely from your mobile device.'
      },
      {
        title: 'Durable Marine Components',
        description: 'Corrosion-resistant aluminium framing and stainless fixings built for ocean-side longevity.'
      }
    ],
    faqs: [
      {
        question: 'Can I monitor my Rye holiday home solar when I am in Melbourne?',
        answer: 'Yes. Every system connects to your home Wi-Fi and provides real-time generation and battery data directly on your smartphone.'
      },
      {
        question: 'What happens to surplus solar if nobody is staying at the holiday home?',
        answer: 'Surplus power first fully recharges your battery storage. Once full, excess power is automatically exported to the grid, generating credits on your power bill.'
      }
    ]
  },
  {
    slug: 'mccrae',
    name: 'McCrae',
    postcode: '3938',
    region: 'Mornington Peninsula',
    tier: 1,
    servicingOffice: 'Scoresby',
    ownedOutrightPct: 52,
    medianAge: 55,
    solarYieldDailyAvg: 4.1,
    summerYieldDailyAvg: 5.2,
    leadAngle: 'Hillside homes and tricky roofs',
    metaTitle: 'Hillside Solar Installations McCrae 3938 | Billabong Solar',
    metaDescription: 'Specialist solar engineering for steep, hillside McCrae properties. Safe installation on complex rooflines with outstanding Port Phillip Bay views.',
    heroHeadline: 'Mastering Hillside Roofs & Complex Solar in McCrae',
    heroSubheadline: 'Breathtaking bay views often come with steep pitches and complex roof architecture. We specialize in safe, engineered hillside installations.',
    mainContentParagraphs: [
      'McCrae’s hillside properties boast panoramic views across Port Phillip Bay, but those spectacular vantage points often accompany architecturally complex roofs: steep pitches, split levels, multi-faceted orientations, and tight site access along winding coastal roads.',
      'These installations demand high-level engineering and meticulous safety compliance. At Billabong Solar, our certified technicians plan every McCrae project with precision before setting foot on the roof. We utilize specialized edge protection, custom bracketry, and module-level power optimizers to maximize the solar output of each individual roof pitch.',
      'With 52% outright home ownership in McCrae, local property owners appreciate that we never cut corners on engineering integrity or safety. The result is an elegant, high-yield installation that respects your property’s architectural beauty and captures maximum sunshine.'
    ],
    localFocusHighlights: [
      {
        title: 'Complex Pitch Engineering',
        description: 'Custom mounting solutions designed for multi-tiered, steep-pitch, and split-level hillside homes.'
      },
      {
        title: 'Zero-Compromise Safety',
        description: 'Comprehensive working-at-heights protocols and custom edge-protection for every McCrae installation.'
      },
      {
        title: 'Multi-Orientation Optimization',
        description: 'DC optimizers that harmonize production across varied roof facets facing east, north, and west.'
      }
    ],
    faqs: [
      {
        question: 'Can solar be installed safely on steep McCrae hillside roofs?',
        answer: 'Yes. Our teams are fully certified for complex working-at-heights installations and erect compliant scaffolding and edge barriers where required.'
      },
      {
        question: 'Will panels spoil the bay view or reflection?',
        answer: 'Modern tier-1 panels utilize anti-reflective tempered glass designed to absorb light rather than reflect it, maintaining clean visual aesthetics.'
      }
    ]
  },

  // --- TIER 2: GEELONG AND THE BELLARINE ---
  {
    slug: 'ocean-grove',
    name: 'Ocean Grove',
    postcode: '3226',
    region: 'Geelong & Bellarine',
    tier: 2,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 41,
    medianAge: 43,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.1,
    leadAngle: 'Sea-change households',
    metaTitle: 'Solar Panels and Batteries Ocean Grove 3226 | Billabong Solar',
    metaDescription: 'Coastal-engineered solar and battery storage for Ocean Grove sea-change households. High reliability and protection from future price rises.',
    heroHeadline: 'Dependable Coastal Solar for Ocean Grove Sea-Changers',
    heroSubheadline: 'Embrace energy independence by the coast. Engineered solar and battery systems designed for lasting coastal durability.',
    mainContentParagraphs: [
      'Many Ocean Grove households made the sea change to enjoy a simpler, more self-reliant lifestyle. Taking control of your home’s energy production is a natural extension of that philosophy. A well-engineered solar and battery installation means generating your own clean power daily and worrying far less about retailer price increases.',
      'Ocean Grove’s coastal proximity calls for robust equipment: marine-rated aluminium rails, 316 stainless-steel fixings, and salt-mist resistant Tier-1 panels that withstand sea breezes and humidity without degradation.',
      'We design every system around your actual household routine—ensuring daytime appliances, evening family living, and weekend recreation are supported by clean, self-produced energy.'
    ],
    localFocusHighlights: [
      {
        title: 'Sea-Change Self-Reliance',
        description: 'Generate and store your own energy to minimize ongoing household living costs.'
      },
      {
        title: 'Marine-Durable Hardware',
        description: 'Corrosion-resistant fixings built to thrive in coastal environments.'
      },
      {
        title: 'Local References',
        description: 'Verified customer feedback across the Bellarine Peninsula.'
      }
    ],
    faqs: [
      {
        question: 'How much solar power does Ocean Grove receive?',
        answer: 'Ocean Grove receives around 4.0 kWh daily per kW of north-facing panels across the year, reaching over 5.1 kWh daily in peak summer.'
      }
    ]
  },
  {
    slug: 'point-lonsdale',
    name: 'Point Lonsdale',
    postcode: '3225',
    region: 'Geelong & Bellarine',
    tier: 2,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 57,
    medianAge: 61,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.1,
    leadAngle: 'Right-sized for couples and retirees',
    metaTitle: 'Solar and Battery Storage Point Lonsdale 3225 | Billabong Solar',
    metaDescription: 'Right-sized solar and battery systems for Point Lonsdale homeowners. Transparent advice, premium components, and zero aggressive sales.',
    heroHeadline: 'Right-Sized Solar for Point Lonsdale Homeowners',
    heroSubheadline: 'With 57% outright home ownership, Point Lonsdale owners choose engineering trust over gimmicks. Sized accurately to your lifestyle.',
    mainContentParagraphs: [
      'Point Lonsdale represents one of the most settled communities on the Bellarine, with 57% of homes owned outright. For many couples and retirees residing here, the right answer is not the largest commercial array available, but a modest, precision-matched system.',
      'We size systems around your actual bills and daytime occupancy, delivering reliable value without unnecessary capital expenditure. Our engineers explain every option plainly, so you can decide at your own pace without high-pressure sales.',
      'All equipment is selected for longevity and coastal resistance, supported by our comprehensive workmanship guarantees.'
    ],
    localFocusHighlights: [
      {
        title: 'Precision Sizing',
        description: 'Calibrated to your exact household bills and usage profile.'
      },
      {
        title: 'No-Pressure Consultations',
        description: 'Take your time with clear, written engineering proposals.'
      },
      {
        title: 'Coastal Protection',
        description: 'Hardware engineered to endure marine air near the Rip.'
      }
    ],
    faqs: [
      {
        question: 'Is a smaller system eligible for rebates in Point Lonsdale?',
        answer: 'Yes, all clean energy council approved solar and battery capacities qualify for federal STCs and battery subsidies.'
      }
    ]
  },
  {
    slug: 'leopold',
    name: 'Leopold',
    postcode: '3224',
    region: 'Geelong & Bellarine',
    tier: 2,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 37,
    medianAge: 41,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.1,
    leadAngle: 'Family homes and evening use',
    metaTitle: 'Solar and Battery Systems Leopold 3224 | Billabong Solar',
    metaDescription: 'Solar and battery storage engineered for Leopold family homes. Power your evening routine with energy stored during the day.',
    heroHeadline: 'Solar and Battery Systems for Leopold Family Living',
    heroSubheadline: 'Power your evening family rush—baths, cooking, laundry, and air conditioning—with sunshine captured throughout the day.',
    mainContentParagraphs: [
      'Leopold is family territory, and family homes naturally use most of their energy when the sun is lowest: during the morning breakfast rush, after-school hours, and evening dinner routines. Solar paired with a battery captures power while everyone is away, carrying the home through the costly evening peak.',
      'We design around how your household actually lives, ensuring your system pays its way every day of the week.',
      'Our team manages the entire process from distributor grid approval to final commissioning, backed by our 5.0 customer satisfaction rating.'
    ],
    localFocusHighlights: [
      {
        title: 'Evening Battery Discharge',
        description: 'Power through dinner and nighttime appliances on stored solar power.'
      },
      {
        title: 'Family Scalability',
        description: 'Systems designed with room to add battery capacity as children grow.'
      },
      {
        title: 'Fast Grid Approvals',
        description: 'Seamless paperwork handling with Powercor for swift connection.'
      }
    ],
    faqs: [
      {
        question: 'Can I add more battery storage later to a Leopold system?',
        answer: 'Yes, our hybrid inverters are modular and support future battery expansion.'
      }
    ]
  },
  {
    slug: 'clifton-springs',
    name: 'Clifton Springs',
    postcode: '3222',
    region: 'Geelong & Bellarine',
    tier: 2,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 43,
    medianAge: 48,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.1,
    leadAngle: 'Moving away from gas',
    metaTitle: 'Solar Installations Clifton Springs 3222 | Billabong Solar',
    metaDescription: 'Switch from climbing gas costs to efficient all-electric solar in Clifton Springs. Custom rooftop solar and battery storage.',
    heroHeadline: 'Transition Away from Gas in Clifton Springs',
    heroSubheadline: 'Replace escalating gas heating bills with clean, self-generated electricity tailored for an all-electric future.',
    mainContentParagraphs: [
      'Many Clifton Springs homes were constructed with gas heating and hot water. As gas tariffs continue to climb across Victoria, moving to efficient reverse-cycle air conditioning and heat pump hot water offers huge savings—especially when powered by rooftop solar.',
      'We assist households in staging this transition sensibly, starting with a solar array sized for future electrical demands.',
      'Enjoy honest technical assessments, local references, and uncompromised installation quality.'
    ],
    localFocusHighlights: [
      {
        title: 'Gas-to-Electric Planning',
        description: 'Size your solar array to effortlessly absorb future heat pumps and electric cooking.'
      },
      {
        title: 'Corrosion-Resistant Mounting',
        description: 'Built to withstand bay winds and moisture across the northern Bellarine.'
      },
      {
        title: 'Free Property Assessment',
        description: 'Detailed analysis of your roof, switchboard, and current utility bills.'
      }
    ],
    faqs: [
      {
        question: 'How does solar hot water compare to heat pumps in Clifton Springs?',
        answer: 'Modern heat pumps running on rooftop solar electricity are far more efficient and flexible than traditional solar thermal roof tubes.'
      }
    ]
  },
  {
    slug: 'drysdale',
    name: 'Drysdale',
    postcode: '3222',
    region: 'Geelong & Bellarine',
    tier: 2,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 47,
    medianAge: 52,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.1,
    leadAngle: 'Rural-residential and hobby farms',
    metaTitle: 'Solar for Rural Properties & Farms Drysdale 3222 | Billabong Solar',
    metaDescription: 'Engineered solar systems for Drysdale hobby farms, acreage, and rural homes. Shed power, bore pumps, and battery backup.',
    heroHeadline: 'Solar for Drysdale Hobby Farms & Rural Acreage',
    heroSubheadline: 'Engineered for workshops, sheds, bore pumps, and rural acreage properties requiring dependable, clean power.',
    mainContentParagraphs: [
      'Drysdale sits on the threshold of farming country, where properties frequently feature large sheds, bore pumps, cool rooms, and home workshops alongside the main residence. These substantial daytime loads make rural properties exceptional candidates for solar.',
      'We understand rural electrical infrastructure: long cable runs, separate distribution boards, and the need for rock-solid power reliability. We also engineer off-grid and backup systems for remote outbuildings.',
      'Our team designs systems that put your roof space and daytime loads to work, cutting diesel and grid overheads.'
    ],
    localFocusHighlights: [
      {
        title: 'Shed & Workshop Power',
        description: 'Custom arrays on rural sheds designed for high daytime machinery and tool loads.'
      },
      {
        title: 'Long Cable Run Engineering',
        description: 'Proper cable sizing and voltage-drop calculations for distant outbuildings.'
      },
      {
        title: 'Off-Grid & Hybrid Options',
        description: 'Independent solar-plus-battery packages for remote pumps and barns.'
      }
    ],
    faqs: [
      {
        question: 'Can solar power my water bore pump in Drysdale?',
        answer: 'Yes, we design both grid-connected and standalone solar pump systems to eliminate generator fueling runs.'
      }
    ]
  },
  {
    slug: 'portarlington',
    name: 'Portarlington',
    postcode: '3223',
    region: 'Geelong & Bellarine',
    tier: 2,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 55,
    medianAge: 62,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.1,
    leadAngle: 'Reliability and backup',
    metaTitle: 'Solar and Battery Backup Portarlington 3223 | Billabong Solar',
    metaDescription: 'Power outage protection and solar battery storage in Portarlington. Keep essential power running when the Bellarine grid drops.',
    heroHeadline: 'Grid Reliability & Battery Backup for Portarlington',
    heroSubheadline: 'At the end of the Bellarine power line, outages hit harder. Protect your home with engineered battery storage and solar.',
    mainContentParagraphs: [
      'Portarlington is one of the most picturesque towns on the Bellarine, but situated at the end of the distribution line, weather events and grid instability can lead to sudden power outages. For the 55% of residents who own their homes outright, a battery is as much about peace of mind as it is about lowering power bills.',
      'We configure battery backup circuits so that when the grid drops out, your essentials—refrigeration, lights, medical devices, and internet—remain fully powered automatically.',
      'We explain precisely what your battery covers and how long it will run during an emergency, delivering clarity without false promises.'
    ],
    localFocusHighlights: [
      {
        title: 'End-of-Line Outage Defense',
        description: 'Automated blackout changeover keeps food cold and communications live.'
      },
      {
        title: 'High Outright Ownership Fit',
        description: 'Long-term investments backed by 25-year panel performance guarantees.'
      },
      {
        title: 'Honest Backup Specifications',
        description: 'Clear, transparent explanation of essential vs non-essential backup circuits.'
      }
    ],
    faqs: [
      {
        question: 'Will my solar panels keep producing during a power outage in Portarlington?',
        answer: 'Standard solar inverters shut down for safety during a blackout. However, with our battery backup systems, your panels continue generating power to run your home and recharge the battery.'
      }
    ]
  },

  // --- TIER 3: BALLARAT & CENTRAL VICTORIA (Supported from Cobblebank) ---
  {
    slug: 'lake-wendouree',
    name: 'Lake Wendouree',
    postcode: '3350',
    region: 'Ballarat & Central',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 51,
    medianAge: 53,
    solarYieldDailyAvg: 3.9,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Cold winters and gas heating',
    metaTitle: 'Solar Panels & Batteries Lake Wendouree 3350 | Billabong Solar',
    metaDescription: 'Conquer Ballarat cold winters with engineered solar and battery heating systems in Lake Wendouree. Heritage-sensitive installations from Cobblebank.',
    heroHeadline: 'Conquer Cold Ballarat Winters in Lake Wendouree',
    heroSubheadline: 'Despite crisp winters, Ballarat receives 3.9 kWh daily per kW. Cut high gas heating bills while respecting period home heritage.',
    mainContentParagraphs: [
      'Ballarat winters are long and cold, and winter heating represents the largest single utility expense for Lake Wendouree households. Many of the beautiful period and heritage residences around the lake still rely on expensive gas heating.',
      'Despite winter temperatures, Ballarat solar performance remains strong: generating around 3.9 kWh per kW daily across the full year, surging above 5.0 kWh daily in summer. Pairing solar with modern reverse-cycle electric heating and a battery provides one of the most effective ways to take control of winter energy costs.',
      'We also exercise meticulous care when designing systems for period homes—respecting heritage sightlines, slate or tile rooflines, and aesthetic integrity. Supported directly from our Cobblebank office less than an hour away, we provide prompt regional service.'
    ],
    localFocusHighlights: [
      {
        title: 'Heritage Roofline Care',
        description: 'Discreet panel placement that respects period architectural character and local guidelines.'
      },
      {
        title: 'Winter Cost Defense',
        description: 'Pair solar generation with electric climate control to slash winter gas dependencies.'
      },
      {
        title: 'Cobblebank Regional Hub',
        description: 'Direct regional support under an hour away via the Western Highway.'
      }
    ],
    faqs: [
      {
        question: 'Does solar generate enough power during cold Ballarat winters?',
        answer: 'Yes. Modern high-efficiency monocrystalline panels perform exceptionally well in cold, clear air. An average 6.6 kW system generates around 25 kWh per day across the year.'
      }
    ]
  },
  {
    slug: 'buninyong',
    name: 'Buninyong',
    postcode: '3357',
    region: 'Ballarat & Central',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 47,
    medianAge: 45,
    solarYieldDailyAvg: 3.9,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Semi-rural properties and off-grid',
    metaTitle: 'Solar and Off-Grid Systems Buninyong 3357 | Billabong Solar',
    metaDescription: 'Acreage, ground mounts, and off-grid solar in Buninyong. Replace diesel generators with dependable solar and battery storage.',
    heroHeadline: 'Semi-Rural & Off-Grid Solar Power in Buninyong',
    heroSubheadline: 'Engineered for acreage, sheds, water pumping, and independent off-grid living around Mount Buninyong.',
    mainContentParagraphs: [
      'Buninyong properties frequently enjoy expansive acreage, large sheds, workshops, and bore pumps. Designing solar for semi-rural properties requires specialized engineering—whether that involves high-capacity roof arrays, custom ground-mounted solar frames, or fully standalone off-grid power systems.',
      'Relying on diesel generators is noisy, expensive, and high-maintenance. A well-engineered solar and battery installation replaces fuel consumption with clean, self-generated electricity.',
      'We travel across the district from our Cobblebank office to inspect your land, orientation, and electrical loads in person.'
    ],
    localFocusHighlights: [
      {
        title: 'Ground-Mount Arrays',
        description: 'Engineered ground frames positioned for unobstructed, optimum solar tilt.'
      },
      {
        title: 'Diesel Generator Replacement',
        description: 'Cut generator running hours and fuel bills with quiet battery storage.'
      },
      {
        title: 'Acreage Load Distribution',
        description: 'Robust wiring solutions connecting sheds, pumps, and living quarters.'
      }
    ],
    faqs: [
      {
        question: 'Can you install off-grid solar in Buninyong?',
        answer: 'Yes, we engineer standalone off-grid solar and battery systems designed with automatic generator backup integration.'
      }
    ]
  },
  {
    slug: 'invermay-park',
    name: 'Invermay Park',
    postcode: '3350',
    region: 'Ballarat & Central',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 52,
    medianAge: 50,
    solarYieldDailyAvg: 3.9,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Established owners planning ahead',
    metaTitle: 'Solar Installation Invermay Park 3350 | Billabong Solar',
    metaDescription: 'Trusted solar and battery installations in Invermay Park. Future-proof your home with plain-English engineering from Billabong Solar.',
    heroHeadline: 'Future-Proof Your Home in Invermay Park',
    heroSubheadline: 'A quiet, settled pocket of Ballarat where over 52% own outright. Invest in durable energy independence with honest advice.',
    mainContentParagraphs: [
      'Invermay Park is a settled, established pocket of northern Ballarat where more than half of all homes are owned outright. Many residents here are planning ahead—setting their homes up now for lasting comfort and rock-bottom running costs well into retirement.',
      'We guide you through solar panels, battery chemistry, and heating electrification in plain English, designing an installation that matches your long-term plans rather than a sales quota.',
      'Supported directly from Cobblebank, our accredited engineers guarantee quality workmanship on every installation.'
    ],
    localFocusHighlights: [
      {
        title: 'Long-Term Property Value',
        description: 'Invest in Tier-1 hardware that delivers 25+ years of dependable performance.'
      },
      {
        title: 'Straightforward Explanations',
        description: 'Understand your system’s capabilities without sales jargon or hidden conditions.'
      },
      {
        title: 'Regional Accountability',
        description: 'Local servicing and support backed by our top-rated team.'
      }
    ],
    faqs: [
      {
        question: 'Is battery storage worthwhile in Invermay Park?',
        answer: 'Yes, storing daytime solar to heat your home through chilly Ballarat evenings provides substantial utility savings.'
      }
    ]
  },

  // --- TIER 3: BENDIGO ---
  {
    slug: 'strathdale',
    name: 'Strathdale',
    postcode: '3550',
    region: 'Bendigo',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 46,
    medianAge: 46,
    solarYieldDailyAvg: 4.2,
    summerYieldDailyAvg: 5.5,
    leadAngle: 'Hot summers and air conditioning',
    metaTitle: 'Solar and Battery Storage Strathdale Bendigo 3550 | Billabong Solar',
    metaDescription: 'Bendigo has the strongest sun in Victoria. Power your summer air conditioning with custom solar in Strathdale. Free site quotes.',
    heroHeadline: 'Harness Victoria’s Strongest Sun in Strathdale',
    heroSubheadline: 'Bendigo gets around 4.2 kWh daily per kW. Run your summer air conditioning on free rooftop sunshine.',
    mainContentParagraphs: [
      'Bendigo enjoys some of the most powerful solar radiation in Victoria, generating roughly 4.2 kWh per kW daily across the year and well over 5.5 kWh daily in summer. However, hot inland summers also mean heavy air conditioning loads, which run hardest precisely when solar panels are generating peak output.',
      'This natural alignment makes Strathdale one of the best suburbs in the state for solar power. By adding a battery, your air conditioning can continue cooling your home into the warm evening hours without drawing expensive peak-rate electricity.',
      'We design robust systems with heat-tolerant inverters and Tier-1 modules engineered to perform through prolonged inland heatwaves.'
    ],
    localFocusHighlights: [
      {
        title: 'Peak Solar Yields (4.2 kWh/kW)',
        description: 'Bendigo’s northern climate delivers exceptional annual solar harvest.'
      },
      {
        title: 'Summer Air Conditioning Offset',
        description: 'Cool your home for free during scorching afternoons when power demand peaks.'
      },
      {
        title: 'High-Temperature Performance',
        description: 'Tier-1 panels featuring low temperature coefficients for optimal hot-weather output.'
      }
    ],
    faqs: [
      {
        question: 'Do solar panels lose efficiency on hot 40°C Bendigo days?',
        answer: 'All solar panels experience slight efficiency drops as surface heat rises. We choose premium panels with superior temperature coefficients to maximize output even on 40°C days.'
      }
    ]
  },
  {
    slug: 'spring-gully',
    name: 'Spring Gully',
    postcode: '3550',
    region: 'Bendigo',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 42,
    medianAge: 45,
    solarYieldDailyAvg: 4.2,
    summerYieldDailyAvg: 5.5,
    leadAngle: 'Bush blocks and backup power',
    metaTitle: 'Solar & Battery Backup Spring Gully Bendigo 3550 | Billabong Solar',
    metaDescription: 'Engineered solar for Spring Gully bush blocks. Battery backup for storm and fire season outages, plus ground mounts for shaded properties.',
    heroHeadline: 'Bush Blocks & Outage Backup in Spring Gully',
    heroSubheadline: 'Protect your home during summer storm and fire season outages with dependable solar battery backup.',
    mainContentParagraphs: [
      'Spring Gully’s bushland setting is peaceful and scenic, but summer storms and bushfire weather frequently threaten grid stability. A solar installation configured with automated battery backup ensures essential loads—including refrigerators, lights, and communication devices—continue operating when the grid goes down.',
      'Furthermore, larger bush blocks offer flexible options for panel placement, including engineered ground mounts in sunny clearings when tall native trees shade the roof.',
      'We provide honest on-site evaluations to find the optimal balance of panel placement and battery backup for your property.'
    ],
    localFocusHighlights: [
      {
        title: 'Storm & Bushfire Backup',
        description: 'Keep critical emergency circuits running during summer blackouts.'
      },
      {
        title: 'Ground-Mount Engineering',
        description: 'Capture maximum sun clear of native canopy shadows.'
      },
      {
        title: 'Bushland Fire Safety',
        description: 'Meticulous DC cable isolation and high-grade conduit protection.'
      }
    ],
    faqs: [
      {
        question: 'Can ground-mounted panels be installed in Spring Gully?',
        answer: 'Yes, ground-mounted arrays are ideal for acreage blocks where tree shade limits rooftop generation.'
      }
    ]
  },

  // --- TIER 3: ARARAT ---
  {
    slug: 'ararat',
    name: 'Ararat',
    postcode: '3377',
    region: 'Ararat',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 40,
    medianAge: 45,
    solarYieldDailyAvg: 3.9,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Farms, fuel costs and rural business',
    metaTitle: 'Solar for Farms and Rural Business Ararat 3377 | Billabong Solar',
    metaDescription: 'Engineered solar and battery solutions for Ararat farms, agribusinesses, and commercial workshops. Cut diesel and high electricity bills.',
    heroHeadline: 'Solar for Ararat Farms, Agribusiness & Rural Trade',
    heroSubheadline: 'Ararat is farming country. Cut steep fuel bills, replace diesel generators, and power sheds, workshops, and cool rooms.',
    mainContentParagraphs: [
      'Ararat is proud farming country, and our engineers understand agriculture. Irrigation pumps, machinery sheds, cool rooms, shearing sheds, and rural workshops all demand significant power—predominantly during daylight operating hours. Too many rural properties still rely on costly, high-maintenance diesel generators.',
      'We engineer solar systems sized to real agricultural loads: deploying high-capacity shed arrays, ground mounts, and standalone solar pump setups that replace expensive generator runs with clean, self-generated electricity. For commercial operations, a well-engineered system typically achieves full payback in 3 to 4 years.',
      'We have worked with regional businesses and farmers throughout the Ararat district, backed by prompt service from our Cobblebank base.'
    ],
    localFocusHighlights: [
      {
        title: 'Agricultural Engineering',
        description: 'Built for farm conditions: dust-sealed enclosures, heavy-duty switchgear, and robust mounting.'
      },
      {
        title: 'Diesel Replacement',
        description: 'Eliminate expensive fuel transport and generator maintenance with off-grid or hybrid solar.'
      },
      {
        title: 'Typical 3-4 Year Payback',
        description: 'High daytime machinery and refrigeration loads match solar generation curves perfectly.'
      }
    ],
    faqs: [
      {
        question: 'Can you power remote water pumps in Ararat?',
        answer: 'Yes. Dedicated off-grid solar-and-battery systems at the pump site are often substantially cheaper than trenching kilometres of grid cabling.'
      },
      {
        question: 'Will farm dust damage the solar equipment?',
        answer: 'We install IP65/IP66 dust-rated inverters and enclosures designed specifically for agricultural conditions.'
      }
    ]
  },

  // --- TIER 3: MACEDON RANGES (Supported from Cobblebank) ---
  {
    slug: 'woodend',
    name: 'Woodend',
    postcode: '3442',
    region: 'Macedon Ranges',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 41,
    medianAge: 45,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Storm outages and backup',
    metaTitle: 'Solar and Battery Backup Woodend 3442 | Billabong Solar',
    metaDescription: 'Storm outage backup and solar systems for Woodend and Macedon Ranges homes. Keep lights, water pumps, and refrigeration running.',
    heroHeadline: 'Storm Outage Resilience & Solar for Woodend Homes',
    heroSubheadline: 'Macedon Ranges storms can knock out grid power for days. Protect your home with automatic solar battery backup.',
    mainContentParagraphs: [
      'Residents across Woodend and the Macedon Ranges know all too well what prolonged outages feel like. High winds, dense timber, and long rural distribution lines make the area vulnerable to multi-day blackouts during severe weather events.',
      'A solar-plus-battery installation configured for whole-home emergency backup keeps your refrigerator cold, lights on, water pressure pump running, and internet connected automatically the moment the grid trips out.',
      'Despite the cooler mountain climate, Woodend receives around 4.0 kWh daily per kW across the year. Supported directly from Cobblebank, we engineer installations that deliver true peace of mind.'
    ],
    localFocusHighlights: [
      {
        title: 'Multi-Day Outage Security',
        description: 'Automatic backup circuits keep water pumps, refrigeration, and heating controls operational.'
      },
      {
        title: 'Mountain Climate Design',
        description: 'Heavy snow-load and wind-rated racking designed for Macedon Ranges conditions.'
      },
      {
        title: 'Cobblebank Support',
        description: 'Fast regional access via the Calder and Western freeway networks.'
      }
    ],
    faqs: [
      {
        question: 'Can solar run my rainwater pressure pump during a blackout?',
        answer: 'Yes, we wire pressure pumps into the dedicated emergency backup sub-board so your household water supply never fails.'
      }
    ]
  },
  {
    slug: 'kyneton',
    name: 'Kyneton',
    postcode: '3444',
    region: 'Macedon Ranges',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 41,
    medianAge: 47,
    leadAngle: 'Farms and small business',
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    metaTitle: 'Solar for Homes, Farms & Businesses Kyneton 3444 | Billabong Solar',
    metaDescription: 'Solar systems for Kyneton town businesses on Piper St and surrounding equine and farm properties. Engineered by Billabong Solar.',
    heroHeadline: 'Solar for Kyneton Businesses, Farms & Equine Properties',
    heroSubheadline: 'Supporting Piper Street town businesses and surrounding acreage properties with custom-engineered solar and storage.',
    mainContentParagraphs: [
      'Kyneton uniquely blends a vibrant historic commercial centre with expansive horse studs and farm acreage. At Billabong Solar, we deliver solutions across both fronts: helping town businesses along Piper Street and High Street lower daytime utility overheads, while equipping surrounding rural properties with dependable shed and workshop power.',
      'For local businesses, daytime trading hours perfectly coincide with solar production, translating directly into reliable operational cost reductions with typical payback in 3 to 4 years.',
      'For rural properties, we engineer robust multi-building power systems that supply stables, machinery sheds, and domestic dwellings reliably.'
    ],
    localFocusHighlights: [
      {
        title: 'Town Business Cost Reduction',
        description: 'Designed to cut commercial daytime electricity bills for shops, cafes, and offices.'
      },
      {
        title: 'Equine & Farm Acreage Systems',
        description: 'Custom setups for horse properties, stables, bore pumps, and workshops.'
      },
      {
        title: 'Cobblebank Engineering Team',
        description: 'Dedicated regional installation crews providing ongoing technical support.'
      }
    ],
    faqs: [
      {
        question: 'Can solar be installed on commercial properties in Kyneton’s heritage precinct?',
        answer: 'Yes, we design non-intrusive installations that respect heritage guidelines and streetscape appearances.'
      }
    ]
  },
  {
    slug: 'riddells-creek',
    name: 'Riddells Creek',
    postcode: '3431',
    region: 'Macedon Ranges',
    tier: 3,
    servicingOffice: 'Cobblebank',
    ownedOutrightPct: 38,
    medianAge: 42,
    solarYieldDailyAvg: 4.0,
    summerYieldDailyAvg: 5.0,
    leadAngle: 'Commuters, fuel costs and EVs',
    metaTitle: 'Solar & EV Ready Systems Riddells Creek 3431 | Billabong Solar',
    metaDescription: 'Cut commuting fuel costs with EV-ready solar and battery systems in Riddells Creek. Free roof assessments from our Cobblebank team.',
    heroHeadline: 'Solar & EV Charging Ready for Riddells Creek Commuters',
    heroSubheadline: 'Turn long commutes into free travel. Power your household and charge your electric vehicle with rooftop solar.',
    mainContentParagraphs: [
      'Many Riddells Creek families travel long distances each week commuting into Melbourne, Sunbury, or regional hubs—making vehicle fuel one of their greatest recurring expenses. As more residents transition to electric vehicles, solar power transforms transportation economics by making EV charging virtually free.',
      'We design solar and battery systems with smart EV integration from day one: dynamically channeling surplus rooftop generation straight into your vehicle’s battery whenever it is plugged in.',
      'With reliable engineering and local support from Cobblebank, we help Riddells Creek homeowners achieve complete energy and fuel independence.'
    ],
    localFocusHighlights: [
      {
        title: 'Smart EV Charger Integration',
        description: 'Solar-aware EV chargers that automatically match vehicle charging speed to excess rooftop solar.'
      },
      {
        title: 'Commuter Household Economics',
        description: 'Transform high fuel expenses into zero-emission, self-generated transport energy.'
      },
      {
        title: 'Future-Proof Hybrid Inverters',
        description: 'Inverters engineered to expand with additional battery storage as family energy needs evolve.'
      }
    ],
    faqs: [
      {
        question: 'Can rooftop solar fully charge an EV in Riddells Creek?',
        answer: 'Yes. A standard 8 kW to 10 kW system generates ample surplus during sunny hours to provide 150km to 250km of daily EV driving range.'
      }
    ]
  }
];

export function getSuburbBySlug(slug: string): SuburbData | undefined {
  return SUBURBS_DATA.find((s) => s.slug === slug);
}

export function getAllSuburbs(): SuburbData[] {
  return SUBURBS_DATA;
}
